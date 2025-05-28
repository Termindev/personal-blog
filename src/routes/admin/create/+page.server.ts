import type { Actions } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { fail } from "assert";
import { nanoid } from "nanoid";

type ArticleFileMap = {
  [lang: string]: {
    file: File;
    model: any;
  };
};

function extractMetadata(content: string) {
  const titleMatch = content.match(/^title:\s*(.+)$/m);
  const descriptionMatch = content.match(/^description:\s*(.+)$/m);
  return {
    title: titleMatch?.[1].trim() ?? null,
    desc: descriptionMatch?.[1].trim() ?? null,
  };
}

export const actions: Actions = {
  createArticle: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    const sharedID = nanoid(12);
    let done = false;

    const files: ArticleFileMap = {
      ar: {
        file: formData.arcontent as File,
        model: prisma.ArArticle,
      },
      en: {
        file: formData.encontent as File,
        model: prisma.EnArticle,
      },
      ru: {
        file: formData.rucontent as File,
        model: prisma.RuArticle,
      },
    };

    for (const [lang, { file, model }] of Object.entries(files)) {
      if (!file || !(file instanceof File)) continue;

      const content = await file.text();
      if (!content.length) continue;

      const { title, desc } = extractMetadata(content);

      try {
        await model.create({
          data: {
            id: sharedID,
            title,
            content,
            desc,
          },
        });
        done = true;
      } catch (err) {
        console.error(`Error creating ${lang} article:`, err);
      }
    }

    if (!done) {
      return fail("Couldn't post anything");
    }

    return { status: 201 };
  },
};

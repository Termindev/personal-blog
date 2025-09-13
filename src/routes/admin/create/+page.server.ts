import type { Actions } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";

function extractMetadata(content: string) {
  const titleMatch = content.match(/^title:\s*(.+)$/im);
  const descriptionMatch = content.match(/^description:\s*(.+)$/im);

  const tagsSectionMatch = content.match(/^tags:\s*$/im);

  let tags: string[] = [];
  if (tagsSectionMatch) {
    const startIndex = tagsSectionMatch.index! + tagsSectionMatch[0].length;
    const lines = content.slice(startIndex).split("\n");

    for (const line of lines) {
      const tagMatch = line.match(/^\s*-\s*(.+)$/);
      if (tagMatch) {
        tags.push(tagMatch[1].trim().toLowerCase());
      } else if (line.trim() === "" || line.startsWith(" ")) {
        continue; // skip blank/indented lines
      } else {
        break; // stop when tags block ends
      }
    }
  }

  return {
    title: titleMatch?.[1].trim() ?? null,
    desc: descriptionMatch?.[1].trim() ?? null,
    tags,
  };
}



function extractContent(content: string) {
  const parts = content.split(/^---$/m);
  return parts.length > 2 ? parts[2].trim() : "";
}

async function readFileText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  return new TextDecoder("utf-8").decode(arrayBuffer);
}

export const actions: Actions = {
  createArticle: async ({ request }) => {
    const formData = await request.formData();

    const langs = ["ar", "en", "ru"];
    const articleData: Record<
      string,
      {
        title: string | null;
        desc: string | null;
        content: string | null;
        tags: string[];
      }
    > = {};

    for (const lang of langs) {
      const file = formData.get(`content_${lang}`) as File | null;

      if (file && file.size > 0) {
        const text = await readFileText(file);
        const { title, desc, tags } = extractMetadata(text);
        const content = extractContent(text);

        articleData[lang] = {
          title,
          desc,
          content: content || null,
          tags,
        };
      } else {
        articleData[lang] = {
          title: null,
          desc: null,
          content: null,
          tags: [],
        };
      }
    }

    const hasCompleteLang = Object.values(articleData).some(
      (entry) => entry.title && entry.desc && entry.content
    );

    if (!hasCompleteLang) {
      throw error(
        400,
        "At least one language must have a full article (title, description, content)"
      );
    }

    function buildTagConnectOrCreate(tags: string[], modelName: string) {
      return tags.map((tag) => ({
        where: { name: tag },
        create: { name: tag },
      }));
    }

    await prisma.article.create({
      data: {
        title_ar: articleData.ar.title ?? "",
        desc_ar: articleData.ar.desc ?? "",
        content_ar: articleData.ar.content ?? "",
        tags_ar: {
          connectOrCreate: buildTagConnectOrCreate(
            articleData.ar.tags,
            "tag_ar"
          ),
        },

        title_en: articleData.en.title ?? "",
        desc_en: articleData.en.desc ?? "",
        content_en: articleData.en.content ?? "",
        tags_en: {
          connectOrCreate: buildTagConnectOrCreate(
            articleData.en.tags,
            "tag_en"
          ),
        },

        title_ru: articleData.ru.title ?? "",
        desc_ru: articleData.ru.desc ?? "",
        content_ru: articleData.ru.content ?? "",
        tags_ru: {
          connectOrCreate: buildTagConnectOrCreate(
            articleData.ru.tags,
            "tag_ru"
          ),
        },

        visible: formData.get("visible") == "on",
        reviewable: formData.get("reviewable") == "on",
      },
    });

    return { success: true };
  },
};

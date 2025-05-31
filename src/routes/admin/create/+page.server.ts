import type { Actions } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import { nanoid } from "nanoid";

function extractMetadata(content: string) {
  const titleMatch = content.match(/^title:\s*(.+)$/m);
  const descriptionMatch = content.match(/^description:\s*(.+)$/m);
  const tagsMatch = content.match(/^tags:\s*(.+)$/m); // Extract tags line

  return {
    title: titleMatch?.[1].trim() ?? null,
    desc: descriptionMatch?.[1].trim() ?? null,
    tags: tagsMatch
      ? tagsMatch[1]
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t.length > 0)
      : [],
  };
}

function extractContent(content: string) {
  const parts = content.split(/^---$/m);
  return parts.length > 1 ? parts[1].trim() : "";
}

async function readFileText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  return new TextDecoder("utf-8").decode(arrayBuffer);
}

export const actions: Actions = {
  createArticle: async ({ request }) => {
    const formData = await request.formData();

    const sharedID = nanoid(12);

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
      const file = formData.get(`${lang}content`) as File | null;

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

    // Check if at least one language is fully filled
    const hasCompleteLang = Object.values(articleData).some(
      (entry) => entry.title && entry.desc && entry.content
    );

    if (!hasCompleteLang) {
      throw error(
        400,
        "At least one language must have a full article (title, description, content)"
      );
    }

    // Helper function to create connectOrCreate tags for a language
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
      },
    });

    return { success: true };
  },
};

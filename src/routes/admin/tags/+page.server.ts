// src/routes/tags/+page.server.ts
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

async function getTagsByLang() {
  const [tagsEn, tagsAr, tagsRu] = await Promise.all([
    prisma.tag_en.findMany({ include: { articles: { select: { id: true } } } }),
    prisma.tag_ar.findMany({ include: { articles: { select: { id: true } } } }),
    prisma.tag_ru.findMany({ include: { articles: { select: { id: true } } } }),
  ]);

  return {
    en: tagsEn.map((tag: { id: any; name: any; articles: string | any[] }) => ({
      id: tag.id,
      name: tag.name,
      count: tag.articles.length,
    })),
    ar: tagsAr.map((tag: { id: any; name: any; articles: string | any[] }) => ({
      id: tag.id,
      name: tag.name,
      count: tag.articles.length,
    })),
    ru: tagsRu.map((tag: { id: any; name: any; articles: string | any[] }) => ({
      id: tag.id,
      name: tag.name,
      count: tag.articles.length,
    })),
  };
}

export const load: PageServerLoad = async () => {
  return {
    tagsPromise: getTagsByLang(),
  };
};

export const actions: Actions = {
  deleteTag: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const lang = formData.get("lang");

    if (typeof id !== "string" || typeof lang !== "string") {
      return fail(400, { error: "Invalid ID or language" });
    }

    const modelMap = {
      en: prisma.tag_en,
      ar: prisma.tag_ar,
      ru: prisma.tag_ru,
    };

    const model = modelMap[lang];
    if (!model) return fail(400, { error: "Unsupported language" });

    try {
      await model.delete({ where: { id } });
    } catch (error) {
      console.error("Failed to delete tag:", error);
      return fail(500, { error: "Could not delete tag" });
    }
  },
};

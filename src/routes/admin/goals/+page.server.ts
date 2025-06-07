import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";

async function getGoals() {
  const articlesRaw = await prisma.goals.findMany({
    select: {
      id: true,
      title_en: true,
      desc_en: true,
      title_ar: true,
      desc_ar: true,
      title_ru: true,
      desc_ru: true,
    },
  });

  const articles = articlesRaw.map((article: any) => {
    const supportedLanguages = ["en", "ar", "ru"].filter(
      (lang) => article[`title_${lang}` as keyof typeof article]
    );

    return {
      id: article.id,
      titles: {
        en: article.title_en || null,
        ar: article.title_ar || null,
        ru: article.title_ru || null,
      },
      descs: {
        en: article.desc_en || null,
        ar: article.desc_ar || null,
        ru: article.desc_ru || null,
      },
      supportedLanguages,
    };
  });
  return articles;
}

export const load: PageServerLoad = async () => {
  return {
    goals: getGoals(),
  };
};

export const actions: Actions = {
  deleteArticle: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");

    if (typeof id !== "string") {
      return fail(400, { error: "Invalid article ID" });
    }

    try {
      await prisma.article.delete({
        where: { id },
      });

      // Optional: redirect to the manage page after deletion
    } catch (error) {
      console.error("Failed to delete article:", error);
      return fail(500, { error: "Could not delete article" });
    }
  },
};

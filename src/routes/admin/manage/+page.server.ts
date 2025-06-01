import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";

async function getArticles(): Promise<
  {
    id: string;
    titles: {
      en: string;
      ar: string;
      ru: string;
    };
    descs: {
      en: string;
      ar: string;
      ru: string;
    };
    tags: {
      en: string;
      ar: string;
      ru: string;
    };
    supportedLanguages: string[];
    visible: boolean;
  }[]
> {
  const articlesRaw = await prisma.article.findMany({
    select: {
      id: true,
      title_en: true,
      desc_en: true,
      title_ar: true,
      desc_ar: true,
      title_ru: true,
      desc_ru: true,
      tags_en: { select: { name: true } },
      tags_ar: { select: { name: true } },
      tags_ru: { select: { name: true } },
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
      tags: {
        en: article.tags_en.map((tag: any) => tag.name),
        ar: article.tags_ar.map((tag: any) => tag.name),
        ru: article.tags_ru.map((tag: any) => tag.name),
      },
      visible: true,
      supportedLanguages,
    };
  });
  return articles;
}

export const load: PageServerLoad = async () => {
  return {
    articles: getArticles(),
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

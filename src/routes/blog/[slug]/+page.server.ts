import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { parse } from "cookie";

const LANGUAGES = ["ar", "en", "ru"] as const;

async function getArticle(id: string, lang: string) {
  const article = await prisma.article.findUnique({
    where: { id, reviewable: true },
    select: {
      title_ar: true,
      desc_ar: true,
      content_ar: true,
      tags_ar: { select: { id: true, name: true } },
      title_en: true,
      desc_en: true,
      content_en: true,
      tags_en: { select: { id: true, name: true } },
      title_ru: true,
      desc_ru: true,
      content_ru: true,
      tags_ru: { select: { id: true, name: true } },
    },
  });

  if (!article) {
    return {
      notFound: true,
      article: { title: "", desc: "", content: "", tags: [] },
      availableLanguages: [],
    };
  }

  const availableLanguages = LANGUAGES.filter((l) =>
    article[`title_${l}`]?.trim()
  );

  const pickLang = (l: string) =>
    article[`title_${l}`]?.trim() &&
    article[`desc_${l}`]?.trim() &&
    article[`content_${l}`]?.trim()
      ? l
      : null;

  const usedLang = pickLang(lang) || pickLang("en") || availableLanguages[0];

  if (!usedLang) {
    return {
      notFound: true,
      article: { title: "", desc: "", content: "", tags: [] },
      availableLanguages,
    };
  }

  return {
    notFound: false,
    article: {
      title: article[`title_${usedLang}`],
      desc: article[`desc_${usedLang}`],
      content: article[`content_${usedLang}`],
      tags: article[`tags_${usedLang}`],
      id,
    },
    availableLanguages,
  };
}

export const load = (async ({ params, request }) => {
  const id = params.slug;
  const lang = parse(request.headers.get("cookie") || "").lang || "en";
  return getArticle(id, lang);
}) satisfies PageServerLoad;

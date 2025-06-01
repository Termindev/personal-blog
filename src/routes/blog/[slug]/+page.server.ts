import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { parse } from "cookie";

export const load = (async ({ params, request }) => {
  const id = params.slug;
  const cookies = parse(request.headers.get("cookie") || "");
  const lang = cookies.lang || "en";
  let article;
  try {
    article = await prisma.article.findUnique({
      where: { id },
      select: {
        title_ar: true,
        title_en: true,
        title_ru: true,
        [`desc_${lang}`]: true,
        [`content_${lang}`]: true,
      } as any,
    });
  } catch (err) {
    console.log(err);
  }

  if (!article) {
    return {
      notFound: true,
      article: {
        title: "",
        desc: "",
        content: "",
      },
      availableLanguages: [],
    };
  }

  const title = article[`title_${lang}` as keyof typeof article] || "";
  const desc = article[`desc_${lang}` as keyof typeof article] || "";
  const content = article[`content_${lang}` as keyof typeof article] || "";

  const availableLanguages = ["ar", "en", "ru"].filter(
    (l) => article[`title_${l}` as keyof typeof article]
  );

  return {
    notFound: false,
    article: {
      title,
      desc,
      content,
    },
    availableLanguages,
  };
}) satisfies PageServerLoad;

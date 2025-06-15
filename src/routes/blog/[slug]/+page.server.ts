import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { parse } from "cookie";

async function getArticle(id: string, lang: string) {
  let article;
  const titleKey = `title_${lang}`;
  const descKey = `desc_${lang}`;
  const contentKey = `content_${lang}`;
  const tagsKey = `tags_${lang}`;

  try {
    article = await prisma.article.findUnique({
      where: { id, reviewable: true },
      select: {
        [titleKey]: true,
        [descKey]: true,
        [contentKey]: true,
        [tagsKey]: {
          select: {
            id: true,
            name: true,
          },
        },
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
      tags: [],
    };
  }

  const title = article[titleKey as keyof typeof article] || "";
  const desc = article[descKey as keyof typeof article] || "";
  const content = article[contentKey as keyof typeof article] || "";
  const tags = article[tagsKey as keyof typeof article] || [];

  const availableLanguages = ["ar", "en", "ru"].filter(
    (l) => article[`title_${l}` as keyof typeof article]
  );

  return {
    notFound: false,
    article: {
      title,
      desc,
      content,
      tags,
    },
    availableLanguages,
  };
}

export const load = (async ({ params, request }) => {
  const id = params.slug;
  const cookies = parse(request.headers.get("cookie") || "");
  const lang = cookies.lang || "en";
  return getArticle(id, lang);
}) satisfies PageServerLoad;

import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { parse } from "cookie";

async function getArticles(request: Request) {
  const cookies = parse(request.headers.get("cookie") || "");
  const lang = cookies.lang || "en";

  if (!["ar", "en", "ru"].includes(lang)) {
    throw new Error("Unsupported language");
  }

  const titleField = `title_${lang}`;
  const descField = `desc_${lang}`;
  const tagsRelation = `tags_${lang}`;

  const articlesRaw = await prisma.article.findMany({
    select: {
      id: true,
      [titleField]: true,
      [descField]: true,
      [tagsRelation]: { select: { name: true } },
      publish_date: true,
    },
    orderBy: { publish_date: "desc" },
  });

  return articlesRaw
    .filter((article: any) => article[titleField])
    .map((article: any) => ({
      id: article.id,
      title: article[titleField],
      desc: article[descField],
      tags: article[tagsRelation].map((tag: any) => tag.name),
      publish_date: article.publish_date,
    }));
}

function getTags(request: Request): Promise<string[]> {
  const cookies = parse(request.headers.get("cookie") || "");
  const lang = cookies.lang || "en";

  const tagsTable = {
    en: prisma.tag_en,
    ar: prisma.tag_ar,
    ru: prisma.tag_ru,
  }[lang];

  return tagsTable
    .findMany({ select: { name: true } })
    .then((tags: any[]) => tags.map((t) => t.name));
}

export const load: PageServerLoad = async ({ request }) => {
  return {
    articlesPromise: getArticles(request),
    tagsPromise: getTags(request),
  };
};

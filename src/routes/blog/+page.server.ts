import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { parse } from "cookie";

function choose(field: string, fallback: string): string {
  return field && field.length > 0 ? field : fallback;
}

function chooseTags(primary: any[], fallback: any[]): string[] {
  return (primary?.length > 0 ? primary : fallback).map((tag: any) => tag.name);
}

async function getArticles(request: Request) {
  const cookies = parse(request.headers.get("cookie") || "");
  const lang = cookies.lang || "en";

  if (!["ar", "en", "ru"].includes(lang)) {
    throw new Error("Unsupported language");
  }

  const titleField = `title_${lang}`;
  const descField = `desc_${lang}`;
  const tagsField = `tags_${lang}`;

  // Only fetch English + selected language fields
  const articles = await prisma.article.findMany({
    where: { visible: true },
    select: {
      id: true,
      publish_date: true,

      title_en: true,
      desc_en: true,
      tags_en: { select: { name: true } },

      [titleField]: true,
      [descField]: true,
      [tagsField]: { select: { name: true } },
    },
    orderBy: { publish_date: "desc" },
  });

  return articles.map((article: any) => ({
    id: article.id,
    title: choose(article[titleField], article.title_en),
    desc: choose(article[descField], article.desc_en),
    tags: chooseTags(article[tagsField], article.tags_en),
    publish_date: article.publish_date,
  }));
}

async function getUsedTags(request: Request) {
  const articles = await getArticles(request);
  const tagSet = new Set<string>();
  for (const article of articles) {
    for (const tag of article.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

export const load: PageServerLoad = ({ request }) => {
  return {
    articlesPromise: getArticles(request),
    tagsPromise: getUsedTags(request),
  };
};

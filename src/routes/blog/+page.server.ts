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
    where: { visible: true },
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

async function getUsedTags(request: Request) {
  return getArticles(request).then((articles) => {
    const tagSet = new Set<string>();
    for (const article of articles) {
      for (const tag of article.tags) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet);
  });
}

export const load: PageServerLoad = ({ request }) => {
  return {
    articlesPromise: getArticles(request),
    tagsPromise: getUsedTags(request),
  };
};

import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { parse } from "cookie";

async function getArticles(request: Request): Promise<
  {
    id: string;
    title: string;
    desc: string;
    tags: string[];
    publish_date: Date;
  }[]
> {
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
      [tagsRelation]: {
        select: { name: true },
      },
      publish_date: true,
    },
    orderBy: { publish_date: "desc" },
  });

  // Filter out articles with no title in the selected language
  const articles = articlesRaw
    .filter((article: any) => article[titleField]) // removes null or empty titles
    .map((article: any) => ({
      id: article.id,
      title: article[titleField],
      desc: article[descField],
      tags: article[tagsRelation].map((tag: any) => tag.name),
      publish_date: article.publish_date,
    }));

  return articles;
}

export const load: PageServerLoad = async ({ request }) => {
  return {
    articlesPromise: getArticles(request),
  };
};

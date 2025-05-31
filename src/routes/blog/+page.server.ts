import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma"; // adjust if your prisma client is in a different location
import { parse } from "cookie";

export const load: PageServerLoad = async ({ request }) => {
  const cookies = parse(request.headers.get("cookie") || "");
  const lang = cookies.lang || "en";

  if (!["ar", "en", "ru"].includes(lang)) {
    throw new Error("Unsupported language");
  }

  // Dynamically build fields
  const titleField = `title_${lang}`;
  const descField = `desc_${lang}`;
  //   const contentField = `content_${lang}`;
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

  // Normalize field names
  const articles = articlesRaw.map((article: any) => ({
    id: article.id,
    title: article[titleField],
    desc: article[descField],
    tags: article[tagsRelation].map((tag: any) => tag.name),
    publish_date: article.publish_date,
  }));

  return {
    lang,
    articles,
  };
};

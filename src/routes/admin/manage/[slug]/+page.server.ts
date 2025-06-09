import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail } from "assert";

async function getArticle(id: string): Promise<any> {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        tags_ar: { select: { name: true } },
        tags_en: { select: { name: true } },
        tags_ru: { select: { name: true } },
      },
    });

    if (!article) return null;

    return {
      ...article,
      ar: article.title_ar.length > 0,
      en: article.title_en.length > 0,
      ru: article.title_ru.length > 0,
    };
  } catch (err) {
    console.error("Error fetching article:", err);
    return null;
  }
}

export const load = (async ({ params }) => {
  const id = params.slug;
  let article = await getArticle(id);
  return { article };
}) satisfies PageServerLoad;

export const actions: Actions = {
  editArticle: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();

    if (!id) return fail("Missing article ID");

    const supportedLangs = ["en", "ar", "ru"];
    const data: any = {};

    for (const lang of supportedLangs) {
      // Always set all fields, even if missing (set to "")
      data[`title_${lang}`] = formData.get(`title_${lang}`)?.toString() ?? "";
      data[`desc_${lang}`] = formData.get(`desc_${lang}`)?.toString() ?? "";
      data[`content_${lang}`] =
        formData.get(`content_${lang}`)?.toString() ?? "";

      const tags = formData
        .getAll(`tags_${lang}[]`)
        .map((t) => t.toString().toLowerCase().trim())
        .filter(Boolean);

      data[`tags_${lang}`] = {
        set: [], // clear previous tags
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      };
    }
    data["visible"] = formData.get("visible") == "on";
    data["reviewable"] = formData.get("reviewable") == "on";

    await prisma.article.update({
      where: { id },
      data,
    });

    return { success: true };
  },
};

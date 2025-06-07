import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";

export const load = (async ({}) => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  postGoal: async ({ request }) => {
    const formData = await request.formData();

    const supportedLangs = ["en", "ar", "ru"];
    const data: any = {};

    for (const lang of supportedLangs) {
      data[`title_${lang}`] = formData.get(`title_${lang}`)?.toString() ?? "";
      data[`desc_${lang}`] = formData.get(`desc_${lang}`)?.toString() ?? "";
    }

    await prisma.goals.create({
      data,
    });

    return { success: true };
  },
};

import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail } from "assert";

export const load = (async ({}) => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  postGoal: async ({ request }) => {
    const formData = await request.formData();

    const supportedLangs = ["en", "ar", "ru"];
    const data: any = {};
    let works = false;
    for (const lang of supportedLangs) {
      data[`title_${lang}`] = formData.get(`title_${lang}`)?.toString() ?? "";
      if (data[`title_${lang}`].length > 2) {
        works = true;
      }
      data[`desc_${lang}`] = formData.get(`desc_${lang}`)?.toString() ?? "";
    }
    // visibility
    data["visible"] = formData.get("visible") == "on";

    data["deadline"] = new Date(formData.get("deadline") + ":00");
    if (works) {
      await prisma.goals.create({
        data,
      });
    } else {
      return fail("You must specify title for at least one language");
    }

    return { success: true };
  },
};

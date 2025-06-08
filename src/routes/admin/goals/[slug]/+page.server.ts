import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail } from "assert";

async function getGoal(id: string): Promise<any> {
  try {
    const goal = await prisma.goals.findUnique({
      where: { id },
    });

    if (!goal) return fail("Goal with specified ID not found");

    return {
      ...goal,
      ar: goal.title_ar.length > 0,
      en: goal.title_en.length > 0,
      ru: goal.title_ru.length > 0,
    };
  } catch (err) {
    console.error("Error fetching goal:", err);
    return null;
  }
}

export const load = (async ({ params }) => {
  const id = params.slug;
  let goal = getGoal(id);
  return { goal };
}) satisfies PageServerLoad;

export const actions: Actions = {
  editGoal: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id")?.toString();

    if (!id) return fail("Missing goal ID");

    const supportedLangs = ["en", "ar", "ru"];
    const data: any = {};

    for (const lang of supportedLangs) {
      // Always set all fields, even if missing (set to "")
      data[`title_${lang}`] = formData.get(`title_${lang}`)?.toString() ?? "";
      data[`desc_${lang}`] = formData.get(`desc_${lang}`)?.toString() ?? "";
    }

    await prisma.goals.update({
      where: { id },
      data,
    });

    return { success: true };
  },
};

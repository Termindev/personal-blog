import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

async function getGoals() {
  const goalsRaw = await prisma.goals.findMany({});

  const goals = goalsRaw.map((goal: any) => {
    const supportedLanguages = ["en", "ar", "ru"].filter(
      (lang) => goal[`title_${lang}` as keyof typeof goal]
    );

    return {
      id: goal.id,
      achieved: goal.achieved,
      titles: {
        en: goal.title_en || null,
        ar: goal.title_ar || null,
        ru: goal.title_ru || null,
      },
      descs: {
        en: goal.desc_en || null,
        ar: goal.desc_ar || null,
        ru: goal.desc_ru || null,
      },
      visible: goal.visible,
      supportedLanguages,
    };
  });
  return goals;
}

export const load: PageServerLoad = async () => {
  return {
    goals: getGoals(),
  };
};

export const actions: Actions = {
  deleteGoal: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");

    if (typeof id !== "string") {
      return fail(400, { error: "Invalid goal ID" });
    }

    try {
      await prisma.goals.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Failed to delete goal:", error);
      return fail(500, { error: "Could not delete goal" });
    }
  },
  achieveGoal: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");

    if (typeof id !== "string") {
      return fail(400, { error: "Invalid goal ID" });
    }

    try {
      await prisma.goals.update({
        where: { id },
        data: {
          achieved: true,
          achieved_at: new Date(),
        },
      });
    } catch (error) {
      console.error("Failed to delete goal:", error);
      return fail(500, { error: "Could not delete goal" });
    }
  },
  unachieveGoal: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");

    if (typeof id !== "string") {
      return fail(400, { error: "Invalid goal ID" });
    }

    try {
      await prisma.goals.update({
        where: { id },
        data: {
          achieved: false,
          achieved_at: null,
        },
      });
    } catch (error) {
      console.error("Failed to delete goal:", error);
      return fail(500, { error: "Could not delete goal" });
    }
  },
};

import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { parse } from "cookie";

async function getGoals(lang: string) {
  let goals;
  try {
    goals = await prisma.goals.findMany({
      where: {
        visible: true,
      },
      select: {
        [`title_${lang}`]: true,
        [`desc_${lang}`]: true,
        achieved: true,
        achieved_at: true,
        deadline: true,
      } as any,
    });
  } catch (err) {
    console.log(err);
  }

  if (!goals) {
    return {
      goals: [],
    };
  }

  // Map language-specific fields to generic ones
  const mappedGoals = goals.map((goal: any) => ({
    title: goal[`title_${lang}`],
    desc: goal[`desc_${lang}`],
    achieved: goal.achieved,
    achieved_at: goal.achieved_at,
    deadline: goal.deadline,
  }));

  return {
    goals: mappedGoals,
  };
}

export const load = (async ({ request }) => {
  const cookies = parse(request.headers.get("cookie") || "");
  const lang = cookies.lang || "en";
  return getGoals(lang);
}) satisfies PageServerLoad;

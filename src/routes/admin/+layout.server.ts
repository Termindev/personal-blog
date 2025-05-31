import type { LayoutServerLoad } from "./$types";
import { EMAIL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ cookies, locals }) => {
  const session = await locals.auth();
  if (!session || session.user?.email != EMAIL) {
    cookies.delete("authjs.session-token", { path: "/" });
    throw redirect(302, "/login");
  }
}) satisfies LayoutServerLoad;

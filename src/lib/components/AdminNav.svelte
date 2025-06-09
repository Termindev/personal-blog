<script>
  import { Menu } from "lucide-svelte";
  import Settings from "./Settings.svelte";
  import { t } from "svelte-i18n";
</script>

<header
  class="sticky top-0 left-0 right-0 z-50 w-full bg-background/50 backdrop-blur-md border-b border-base-300 flex flex-col"
>
  <div class="navbar w-full shadow-sm px-4">
    <div class="w-full max-w-7xl mx-auto flex justify-between items-center">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <Menu />
          </div>
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <ul
            tabindex="0"
            class="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><a href="/admin/goals">Manage Goals</a></li>
            <li><a href="/admin/goals/create">Add a Goal</a></li>
            <li><a href="/admin/create">Post an article</a></li>
            <li><a href="/admin/manage">Manage Articles</a></li>
            <li><a href="/admin/tags">Manage Tags</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-middle">
        <a class="text-xl" href="/admin/">{$t("nav.name")}</a>
      </div>
      <div class="navbar-end">
        <Settings />
      </div>
    </div>
  </div>
</header>

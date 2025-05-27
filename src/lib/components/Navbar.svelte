<script>
  import Settings from "./Settings.svelte";
  import { t } from "svelte-i18n";
</script>

<header
  class="sticky top-0 left-0 right-0 z-50 w-full bg-background/50 backdrop-blur-md border-b border-base-300 flex flex-col"
>
  <div class="navbar w-full shadow-sm px-4">
    <div class="w-full max-w-7xl mx-auto flex justify-between items-center">
      <div class="navbar-start">
        <a class="text-xl" href="/">{$t("nav.name")}</a>
      </div>
      <div class="navbar-end">
        <ul class="menu menu-horizontal px-2">
          <li><a href="/blog">{$t("nav.blog")}</a></li>
        </ul>
        <Settings />
      </div>
    </div>
  </div>
</header>

<script>
  import Settings from "./Settings.svelte";
  import { t } from "svelte-i18n";
</script>

<div class="navbar shadow-sm px-4">
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
<hr class="opacity-12" />

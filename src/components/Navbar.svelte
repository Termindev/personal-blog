<script>
  import ThemeController from "./ThemeController.svelte";
</script>

<div class="navbar shadow-sm px-4">
  <div class="w-full max-w-7xl mx-auto flex justify-between items-center">
    <div class="navbar-start">
      <a class="text-xl" href="/">Termin</a>
    </div>
    <div class="navbar-end">
      <ul class="menu menu-horizontal px-2">
        <li><a href="/blog">Blog</a></li>
      </ul>
      <ThemeController />
    </div>
  </div>
</div>
<hr class="opacity-12" />

<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import { t } from "svelte-i18n";
</script>

<Navbar />
<div class="flex justify-center items-center h-[90vh]">
  <div>
    <h1 class="text-5xl font-bold my-2">{$t("404.title")}</h1>
    <h2 class="text-2xl my-2">{$t("404.msg")}</h2>
    <h2 class="text-2xl my-2">{$t("404.report")}</h2>
  </div>
</div>

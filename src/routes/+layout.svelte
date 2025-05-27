<script lang="ts">
  import { locale, waitLocale } from "svelte-i18n";
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import "../lib/i18n";
  import { onMount } from "svelte";
  import { t } from "svelte-i18n";
  let loaded = $state(false);
  onMount(async () => {
    if (localStorage.getItem("lang")) {
      await locale.set(localStorage.getItem("lang"));
    }
    loaded = true;
  });
  let { children } = $props();
</script>

<!-- TODO: use dir from lang store -->
<!-- await waitLocale isn't needed, I just kept it for safety lol -->
{#await waitLocale() then}
  {#if loaded}
    <div dir={$t("dir") as "ltr" | "rtl"}>
      <Navbar />
      {@render children()}
    </div>
  {/if}
{/await}

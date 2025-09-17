<script lang="ts">
  import { locale, waitLocale } from "svelte-i18n";
  import { MetaTags } from "svelte-meta-tags";
  import "../app.css";
  import "../lib/i18n";
  import { onMount } from "svelte";
  import { t } from "svelte-i18n";
  import { parse } from "cookie";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import { dev } from "$app/environment";

  injectAnalytics({ mode: dev ? "development" : "production" });

  let loaded = $state(false);

  onMount(async () => {
    const cookies = parse(document.cookie);
    const cookieLang = cookies.lang;

    if (cookieLang) {
      await locale.set(cookieLang);
    }
    loaded = true;
  });

  let { children } = $props();
</script>

<!-- await waitLocale isn't needed, I just kept it for safety lol -->
{#await waitLocale() then}
  {#if loaded}
    <div dir={$t("dir") as "ltr" | "rtl"}>
      {@render children()}
    </div>
  {/if}
{/await}

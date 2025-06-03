<script lang="ts">
  import { locale, waitLocale } from "svelte-i18n";
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import "../lib/i18n";
  import { onMount } from "svelte";
  import { t } from "svelte-i18n";
  import { parse } from "cookie";

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

<svelte:head>
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://termin.is-a.dev/" />

  <meta name="twitter:card" content="summary_large_image" />
  <!-- <meta property="og:image" content="https://yourwebsite.com/image.jpg" /> -->
  <!-- <meta property="og:image:alt" content="Description of the image" /> -->
  <!-- <meta name="twitter:image" content="https://termin.is-a.dev/" /> -->
  <!-- <meta name="twitter:image:alt" content="Description of the image" /> -->
</svelte:head>

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

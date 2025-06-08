<script lang="ts">
  import { locale, waitLocale } from "svelte-i18n";
  import "../app.css";
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
  <!-- <meta property="og:image" content="/favicon.png" />
  <meta property="og:image:alt" content="Icon" />
  <meta name="twitter:image" content="/favicon.png" />
  <meta name="twitter:image:alt" content="Icon" /> -->
  <meta content="#8593EC" data-react-helmet="true" name="theme-color" />

  <!-- TODO: Fix it so I can make the meta tags dynamic -->
  <meta name="author" content="Termin" />
  <meta property="og:title" content="Termin" />
  <meta name="twitter:title" content="Termin" />
  <meta property="og:site_name" content="Termin" />
  <title>Termin</title>
  <meta name="description" content="A developer, pentester and a student" />
  <meta
    property="og:description"
    content="A developer, pentester and a student"
  />
  <meta
    name="twitter:description"
    content="A developer, pentester and a student"
  />
</svelte:head>

<!-- TODO: use dir from lang store -->
<!-- await waitLocale isn't needed, I just kept it for safety lol -->
{#await waitLocale() then}
  {#if loaded}
    <div dir={$t("dir") as "ltr" | "rtl"}>
      {@render children()}
    </div>
  {/if}
{/await}

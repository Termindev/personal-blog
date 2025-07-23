<script lang="ts">
  import { locale, waitLocale } from "svelte-i18n";
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
  import { MetaTags } from "svelte-meta-tags";
</script>

<MetaTags
  title="Termin"
  titleTemplate="%s | Termin"
  description="A developer, pentester and a student"
  canonical="https://termin.is-a.dev/"
  openGraph={{
    type: "website",
    url: "https://termin.is-a.dev/",
    title: "Termin",
    description: "A developer, pentester and a student",
    siteName: "Termin",
    images: [
      {
        url: "/favicon.png",
        alt: "Icon",
      },
    ],
  }}
  twitter={{
    cardType: "summary_large_image",
    title: "Termin",
    description: "A developer, pentester and a student",
    image: "/favicon.png",
    imageAlt: "Icon",
  }}
  additionalMetaTags={[
    {
      name: "theme-color",
      content: "#8593EC",
    },
    {
      name: "author",
      content: "Termin",
    },
  ]}
/>

<!-- await waitLocale isn't needed, I just kept it for safety lol -->
{#await waitLocale() then}
  {#if loaded}
    <div dir={$t("dir") as "ltr" | "rtl"}>
      {@render children()}
    </div>
  {/if}
{/await}

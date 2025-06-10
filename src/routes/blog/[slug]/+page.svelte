<script lang="ts">
  import { t } from "svelte-i18n";
  import type { PageData } from "./$types";
  import Loading from "$lib/components/Loading.svelte";
  import ArticleBody from "$lib/components/ArticleBody.svelte";

  let { data }: { data: PageData } = $props();
  let article = data.article;
</script>

<svelte:head>
  <meta name="author" content={article.title} />
  <meta property="og:title" content={article.title} />
  <meta name="twitter:title" content={article.title} />
  <meta property="og:site_name" content={article.title} />
  <link rel="stylesheet" href="/github-markdown.css" />
  <title>{article.title ? article.title : "Termin | Blog"}</title>
  <meta name="description" content={article.desc} />
  <meta property="og:description" content={article.desc} />
  <meta name="twitter:description" content={article.desc} />
</svelte:head>
{#await article}
  <Loading />
{:then article}
  {#if data.notFound}
    <div class="flex items-center justify-center h-[90vh]">
      <div class="text-2xl">
        {$t("blog.not_found")}
      </div>
    </div>
  {:else if !data.notFound && article.title.length < 1}
    {$t("blog.incorrect_lang")} {data.availableLanguages}
  {:else}
    <ArticleBody {article} />
  {/if}
{/await}

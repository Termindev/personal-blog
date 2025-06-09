<script lang="ts">
  import { marked } from "marked";
  import { t } from "svelte-i18n";
  import type { PageData } from "./$types";
  import Loading from "$lib/components/Loading.svelte";

  let { data }: { data: PageData } = $props();
  let article = data.article;
  // console.log(article);
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
    <div class="markdown-body">
      {@html marked(article.content)}
    </div>
  {/if}
{/await}

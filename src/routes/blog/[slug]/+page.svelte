<script lang="ts">
  import { marked } from "marked";
  import type { PageData } from "./$types";
  import Loading from "$lib/components/Loading.svelte";

  let { data }: { data: PageData } = $props();
  let article = data.article;
  // console.log(article);
</script>

<svelte:head>
  <link rel="stylesheet" href="/github-markdown.css" />
  <title>{article.title}</title>
</svelte:head>
{#await article}
  <Loading />
{:then article}
  {#if data.notFound}
    This article is either deleted or doesn't exist.
  {:else if !data.notFound && article.title.length < 1}
    This article isn't available in the specified language, please switch to one
    of the following languages: {data.availableLanguages}
  {:else}
    <div class="markdown-body">
      {@html marked(article.content)}
    </div>

    <style>
      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
      }
      .markdown-body a {
        color: var(--color-info);
      }
      @media (max-width: 767px) {
        .markdown-body {
          padding: 15px;
        }
      }
    </style>
  {/if}
{/await}

<script lang="ts">
  import { t } from "svelte-i18n";
  import type { PageData } from "./$types";
  import Loading from "$lib/components/Loading.svelte";
  import ArticleBody from "$lib/components/ArticleBody.svelte";

  let { data }: { data: PageData } = $props();
  let article = data.article;
</script>

<svelte:head>
  <title>{article.title}</title>
  <meta name="description" content={article.desc} />
  <link rel="canonical" href={`https://termin.is-a.dev/blog/${article.id}`} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`https://termin.is-a.dev/blog/${article.id}`} />
  <meta property="og:title" content={article.title} />
  <meta property="og:description" content={article.desc} />
  <meta property="og:site_name" content="Termin" />
  <meta property="article:section" content="Blog" />
  <meta property="article:author" content="Termin" />
  {#each article.tags as tag}
    <meta property="article:tag" content={tag} />
  {/each}
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={article.title} />
  <meta property="twitter:description" content={article.desc} />
  <meta property="twitter:image:alt" content={article.title} />
</svelte:head>

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

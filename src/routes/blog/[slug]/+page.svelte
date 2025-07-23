<script lang="ts">
  import { t } from "svelte-i18n";
  import type { PageData } from "./$types";
  import Loading from "$lib/components/Loading.svelte";
  import ArticleBody from "$lib/components/ArticleBody.svelte";
  import { MetaTags } from "svelte-meta-tags";

  let { data }: { data: PageData } = $props();
  let article = data.article;
</script>

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
    <MetaTags
      title={article.title}
      titleTemplate="%s | Termin Blog"
      description={article.desc}
      canonical={`https://termin.is-a.dev/blog/${article.id}`}
      openGraph={{
        type: "article",
        url: `https://termin.is-a.dev/blog/${article.id}`,
        title: article.title,
        description: article.desc,
        siteName: "Termin Blog",
      }}
      twitter={{
        cardType: "summary_large_image",
        site: "@Termin",
        creator: "@Termin",
        title: article.title,
        description: article.desc,
        imageAlt: article.title,
      }}
      additionalMetaTags={[
        {
          name: "author",
          content: article.title,
        },
      ]}
    />
    <ArticleBody {article} />
  {/if}
{/await}

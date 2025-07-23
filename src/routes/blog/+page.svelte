<script lang="ts">
  import type { PageProps } from "./$types";
  import Loading from "$lib/components/Loading.svelte";
  import ArticleCard from "$lib/components/ArticleCard.svelte";
  import TagFilter from "$lib/components/TagFilter.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
  import { t } from "svelte-i18n";
  import { MetaTags } from "svelte-meta-tags";
  export let data: PageProps["data"];

  let articlesPromise = data.articlesPromise;
  let tagsPromise = data.tagsPromise;

  let selectedTags: string[] = [];

  function toggleTag(tag: string) {
    selectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
  }

  function clearTags() {
    selectedTags = [];
  }
</script>

<MetaTags
  title="Blog"
  titleTemplate="%s | Termin"
  description="My personal not-so-tech-related blog"
  canonical="https://termin.is-a.dev/blog"
  openGraph={{
    type: "website",
    url: "https://termin.is-a.dev/blog",
    title: "Blog | Termin",
    description: "My personal not-so-tech-related blog",
    siteName: "Termin | My blog",
  }}
  twitter={{
    cardType: "summary_large_image",
    title: "Blog | Termin",
    description: "My personal not-so-tech-related blog",
  }}
  additionalMetaTags={[
    {
      name: "author",
      content: "Termin | My blog",
    },
  ]}
/>

{#await Promise.all([articlesPromise, tagsPromise])}
  <Loading />
{:then [articles, tags]}
  <Container id="">
    <TagFilter {tags} {selectedTags} onToggle={toggleTag} onClear={clearTags} />

    {#if selectedTags.length > 0}
      {#if articles.filter( (article: { tags: string | string[] }) => selectedTags.every( (tag) => article.tags.includes(tag) ) ).length === 0}
        <p class="text-center text-gray-500">
          {$t("blog.no_articles")}
        </p>
      {:else}
        <div
          class="grid sm:grid-cols-2 xl:grid-cols-3 place-items-center gap-8"
        >
          {#each articles.filter( (article: { tags: string | string[] }) => selectedTags.every( (tag) => article.tags.includes(tag) ) ) as article}
            <ArticleCard {article} />
          {/each}
        </div>
      {/if}
    {:else}
      <div class="grid sm:grid-cols-2 xl:grid-cols-3 place-items-center gap-8">
        {#each articles as article}
          <ArticleCard {article} />
        {/each}
      </div>
    {/if}
  </Container>
{/await}

<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
  import SubTitle from "$lib/components/subComponents/SubTitle.svelte";
  import Title from "$lib/components/subComponents/Title.svelte";
  import type { PageData } from "./$types";
  import DisplayGoal from "$lib/components/DisplayGoal.svelte";
  import { t } from "svelte-i18n";
  import { MetaTags } from "svelte-meta-tags";
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Termin | Goals</title>
  <link rel="stylesheet" href="/github-markdown.css" />
</svelte:head>
<MetaTags
  title="Goals"
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
{#await data.goals}
  <Loading />
{:then goals}
  <Container id="">
    <Title>{$t("goals.title")}</Title>
    <SubTitle>{$t("goals.sub")}</SubTitle>
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each goals as goal}
        {#if !goal.achieved}
          <DisplayGoal {goal} />
        {/if}
      {/each}
    </div>
    <Container id="">
      <SubTitle>{$t("goals.achieved")}</SubTitle>
      <div class="grid grid-cols-3">
        {#each goals as goal}
          {#if goal.achieved}
            <DisplayGoal {goal} />
          {/if}
        {/each}
      </div>
    </Container>
  </Container>
{/await}

<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
  import SubTitle from "$lib/components/subComponents/SubTitle.svelte";
  import Title from "$lib/components/subComponents/Title.svelte";
  import type { PageData } from "./$types";
  import DisplayGoal from "$lib/components/DisplayGoal.svelte";
  import { t } from "svelte-i18n";
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Termin | My goals</title>
  <meta name="description" content="A developer, pentester and a student" />
  <link rel="canonical" href="https://termin.is-a.dev/goals" />
  <link rel="stylesheet" href="/github-markdown.css" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://termin.is-a.dev/goals" />
  <meta property="og:title" content="Termin | My goals" />
  <meta
    property="og:description"
    content="A developer, pentester and a student"
  />
  <meta property="og:site_name" content="Termin | My goals" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:title" content="Termin | My goals" />
  <meta
    property="twitter:description"
    content="A developer, pentester and a student"
  />

  <!-- Additional meta tags -->
  <meta name="theme-color" content="#8593EC" />
  <meta name="author" content="Termin" />
</svelte:head>
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

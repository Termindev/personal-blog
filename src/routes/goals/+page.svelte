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
  <title>Termin | Goals</title>
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

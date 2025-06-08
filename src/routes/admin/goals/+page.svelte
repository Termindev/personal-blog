<script lang="ts">
  import Goal from "$lib/components/Goal.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
  import Modal from "$lib/components/subComponents/Modal.svelte";
  import Title from "$lib/components/subComponents/Title.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  // svelte-ignore non_reactive_update
  let modals = $state({
    deleteModal: null,
    achieveModal: null,
    unachieveModal: null,
  });
  let goalID: string = $state("");
</script>

{#await data.goals}
  <Loading />
{:then goals}
  <Container id="">
    <Title>Goals</Title>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-start mt-4"
    >
      {#each goals as goal}
        {#if !goal.achieved}
          <Goal {goal} {modals} bind:goalID />
        {/if}
      {/each}
    </div>
    <a href="/admin/goals/create" class="btn btn-accent mx-auto mt-4"
      >Add a goal</a
    >
  </Container>
  <Container id="">
    <Title>Achieved goals</Title>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-start mt-4"
    >
      {#each goals as goal}
        {#if goal.achieved}
          <Goal {goal} {modals} bind:goalID />
        {/if}
      {/each}
    </div>
  </Container>
  <Modal
    style="error"
    action="deleteGoal"
    bind:modal={modals.deleteModal}
    title="Delete Goal"
    id={goalID}
    btn="Confirm Delete">Are you sure you want to delete this goal?</Modal
  >
  <Modal
    style="success"
    action="achieveGoal"
    bind:modal={modals.achieveModal}
    title="Achieved Goal"
    id={goalID}
    btn="Confirm Achieved"
    >Are you sure you want to mark this goal as achieved?</Modal
  >
  <Modal
    style="error"
    action="unachieveGoal"
    bind:modal={modals.unachieveModal}
    title="Unachieve Goal"
    id={goalID}
    btn="Confirm Unachieved"
    >Are you sure you want to mark this goal as not achieved?</Modal
  >
{/await}

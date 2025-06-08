<script lang="ts">
  import GoalEdit from "$lib/components/GoalEdit.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
  import Modal from "$lib/components/subComponents/Modal.svelte";
  import Title from "$lib/components/subComponents/Title.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  // svelte-ignore non_reactive_update
  let modal: HTMLDialogElement;
  // svelte-ignore non_reactive_update
  let form: HTMLFormElement;
</script>

<Container id="articleEdit">
  <Title>Add a new goal</Title>
  <form
    bind:this={form}
    action="?/postGoal"
    method="POST"
    enctype="multipart/form-data"
  >
    <GoalEdit lang="ar" lang_full="Arabic" />
    <GoalEdit lang="en" lang_full="English" />
    <GoalEdit lang="ru" lang_full="Russian" />
    <fieldset class="fieldset my-6">
      <legend class="fieldset-legend">Deadline</legend>
      <input
        type="datetime-local"
        class="input block mx-auto"
        name="deadline"
      />
    </fieldset>
    <button
      onclick={(e) => {
        e.preventDefault();
        modal.showModal();
      }}
      class="btn btn-md block mx-auto my-3">Add goal</button
    >
  </form>
  <Modal
    style="success"
    bind:modal
    title="Add new goal"
    fun={() => form?.submit()}
    btn="Add goal">Are you sure you want to add this goal?</Modal
  >
</Container>

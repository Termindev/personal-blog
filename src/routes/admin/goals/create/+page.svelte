<script lang="ts">
  import GoalEdit from "$lib/components/GoalEdit.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
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
    <button
      onclick={(e) => {
        e.preventDefault();
        modal.showModal();
      }}
      class="btn btn-md block mx-auto my-3">Add goal</button
    >
  </form>
  <dialog bind:this={modal} class="modal rounded-md">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Confirm edits</h3>
      <p class="py-4">Are you sure you want to add this goal?</p>
      <div role="alert" class="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>Everyone will see it...</span>
      </div>
      <button
        onclick={() => {
          form.submit();
        }}
        class="btn my-3">Confirm Edits!</button
      >
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</Container>

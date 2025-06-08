<script lang="ts">
  import BlogEdit from "$lib/components/BlogEdit.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
  import Modal from "$lib/components/subComponents/Modal.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let goal = $state(data.goal);
  // svelte-ignore non_reactive_update
  let modal: HTMLDialogElement;
  // svelte-ignore non_reactive_update
  let form: HTMLFormElement;
</script>

{#await goal}
  <Loading />
{:then goal}
  <Container id="goalEdit">
    <h1 class="md:text-2xl text-sm overflow-auto">
      ID: <pre><code>{goal.id}</code></pre>
    </h1>
    <form
      bind:this={form}
      action="?/editGoal"
      method="POST"
      enctype="multipart/form-data"
    >
      <input type="hidden" name="id" value={goal.id} />
      <BlogEdit lang_full="Arabic" blog={false} lang="ar" articleData={goal} />
      <BlogEdit lang_full="English" blog={false} lang="en" articleData={goal} />
      <BlogEdit lang_full="Russian" blog={false} lang="ru" articleData={goal} />
      <button
        onclick={(e) => {
          e.preventDefault();
          modal.showModal();
        }}
        class="btn btn-md block mx-auto my-3">Confirm Edits</button
      >
    </form>
    <Modal
      style="error"
      bind:modal
      title="Edit goal"
      fun={() => form?.submit()}
      btn="Confirm edits">Are you sure you want to confirm edits?</Modal
    >
  </Container>
{/await}

<script lang="ts">
  import BlogEdit from "$lib/components/BlogEdit.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
  import Modal from "$lib/components/subComponents/Modal.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let article = $state(data.article);
  // svelte-ignore non_reactive_update
  let modal: HTMLDialogElement;
  // svelte-ignore non_reactive_update
  let form: HTMLFormElement;
</script>

{#await article}
  <Loading />
{:then article}
  <Container id="articleEdit">
    <h1 class="md:text-2xl text-sm overflow-auto">
      ID: <pre><code>{article.id}</code></pre>
    </h1>
    <form
      bind:this={form}
      action="?/editArticle"
      method="POST"
      enctype="multipart/form-data"
    >
      <input type="hidden" name="id" value={article.id} />
      <BlogEdit lang_full="Arabic" lang="ar" articleData={article} />
      <BlogEdit lang_full="English" lang="en" articleData={article} />
      <BlogEdit lang_full="Russian" lang="ru" articleData={article} />
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
      title="Confirm edits"
      fun={() => form?.submit()}
      btn="Add goal">Are you sure you want to confirm edits?</Modal
    >
  </Container>
{/await}

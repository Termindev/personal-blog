<script lang="ts">
  import BlogEdit from "$lib/components/BlogEdit.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
  import Title from "$lib/components/subComponents/Title.svelte";
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
    <dialog bind:this={modal} class="modal rounded-md">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Confirm edits</h3>
        <p class="py-4">Are you sure you want to confirm edits?</p>
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
          <span>EDITS ARE IRREVERSIBLE!</span>
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
{/await}

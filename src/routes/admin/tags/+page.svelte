<!-- src/routes/tags/+page.svelte -->
<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let tagsPromise = data.tagsPromise;

  const languageLabels: Record<string, string> = {
    en: "English",
    ar: "Arabic",
    ru: "Russian",
  };

  let modal: HTMLDialogElement;
  let deleteID: string = "";
  let deleteLang: string = "";
</script>

<h1 class="text-2xl font-bold text-center my-6">Manage Tags</h1>

{#await tagsPromise}
  <Loading />
{:then tagsByLang}
  {#each Object.entries(tagsByLang) as [lang, tags]}
    <div class="mb-10">
      <h2 class="text-xl font-semibold mb-4 px-4">{languageLabels[lang]}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {#each tags as tag}
          <div class="card bg-base-200 shadow-sm">
            <div class="card-body">
              <pre
                class="bg-base-300 text-xs p-2 font-light rounded">{tag.id}</pre>
              <h3 class="card-title text-md truncate">{tag.name}</h3>
              <p class="text-sm text-gray-500">
                Used in {tag.count} article{tag.count !== 1 ? "s" : ""}
              </p>
              <div class="card-actions justify-end mt-2">
                <a
                  href={`/admin/tags/edit/${tag.id}?lang=${lang}`}
                  class="btn btn-sm btn-primary"
                >
                  Edit
                </a>
                <button
                  class="btn btn-sm btn-error"
                  onclick={() => {
                    deleteID = tag.id;
                    deleteLang = lang;
                    modal.showModal();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  <!-- Modal for confirming deletion -->
  <dialog bind:this={modal} class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="POST" action="?/deleteTag" class="text-center space-y-4">
        <input type="hidden" name="id" value={deleteID} />
        <input type="hidden" name="lang" value={deleteLang} />
        <h2 class="text-lg font-semibold">Delete Tag</h2>
        <p class="text-sm">Are you sure you want to delete this tag?</p>
        <pre class="bg-base-300 p-2 rounded">{deleteID}</pre>
        <div class="flex justify-center gap-2">
          <button type="submit" class="btn btn-sm btn-error"
            >Confirm Delete</button
          >
          <button
            type="button"
            class="btn btn-sm"
            onclick={() => modal.close()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>Close</button>
    </form>
  </dialog>
{/await}

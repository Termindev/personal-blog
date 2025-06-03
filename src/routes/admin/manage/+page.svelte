<script lang="ts">
  import { enhance } from "$app/forms";
  import Loading from "$lib/components/Loading.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  // svelte-ignore non_reactive_update
  let modal: HTMLDialogElement;
  let deleteID: string = $state("");
</script>

{#await data.articles}
  <Loading />
{:then articles}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {#each articles as article}
      {#if article.visible}
        <div class="card bg-base-100 shadow-md border border-base-200">
          <div class="card-body">
            <pre
              class="bg-base-300 text-xs p-2 font-light rounded">{article.id}</pre>

            <div class="space-y-2">
              <!-- Titles in all languages -->
              {#if article.titles.en}
                <div>
                  <span class="badge badge-primary badge-sm mr-2">EN</span>
                  <span class="font-semibold">{article.titles.en}</span>
                </div>
              {/if}

              {#if article.titles.ar}
                <div>
                  <span class="badge badge-success badge-sm mr-2">AR</span>
                  <span class="font-semibold">{article.titles.ar}</span>
                </div>
              {/if}

              {#if article.titles.ru}
                <div>
                  <span class="badge badge-accent badge-sm mr-2">RU</span>
                  <span class="font-semibold">{article.titles.ru}</span>
                </div>
              {/if}
            </div>

            <!-- Descriptions -->
            <div class="mt-4 text-sm space-y-1">
              {#if article.descs.en}
                <p><strong>EN Desc:</strong> {article.descs.en}</p>
              {/if}
              {#if article.descs.ar}
                <p><strong>AR Desc:</strong> {article.descs.ar}</p>
              {/if}
              {#if article.descs.ru}
                <p><strong>RU Desc:</strong> {article.descs.ru}</p>
              {/if}
            </div>

            <!-- Tags -->
            <div class="mt-4">
              {#each Object.entries(article.tags) as [lang, tagList]}
                {#if tagList.length > 0}
                  <div class="text-xs mt-2">
                    <strong>{lang.toUpperCase()} Tags:</strong>
                    <div class="flex flex-wrap gap-1 mt-1">
                      {#each tagList as tag}
                        <span class="badge badge-neutral badge-xs">{tag}</span>
                      {/each}
                    </div>
                  </div>
                {/if}
              {/each}
            </div>

            <!-- Languages + Actions -->
            <div class="card-actions mt-4 justify-between items-center">
              <div class="space-x-1">
                {#each article.supportedLanguages as lang}
                  <span class="badge badge-outline badge-sm"
                    >{lang.toUpperCase()}</span
                  >
                {/each}
              </div>
              <div>
                <a
                  href={`/admin/manage/${article.id}`}
                  class="btn btn-sm btn-accent">Edit</a
                >

                <button
                  class="btn btn-sm btn-error"
                  onclick={() => {
                    deleteID = article.id;
                    modal.showModal();
                  }}>Delete</button
                >
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/each}
    <dialog bind:this={modal} class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <form
          method="POST"
          action="?/deleteArticle"
          use:enhance
          class="text-center space-y-4"
        >
          <input type="hidden" name="id" value={deleteID} />

          <h2 class="text-lg font-semibold">Delete Article</h2>
          <p class="text-sm">Are you sure you want to delete this article?</p>
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
  </div>
{/await}

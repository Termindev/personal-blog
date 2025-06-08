<script lang="ts">
  import { enhance } from "$app/forms";
  import Loading from "$lib/components/Loading.svelte";
  import ArticleTitle from "$lib/components/subComponents/ArticleTitle.svelte";
  import Modal from "$lib/components/subComponents/Modal.svelte";
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
                <ArticleTitle title={article.titles.en} lang="EN" />
              {/if}

              {#if article.titles.ar}
                <div>
                  <ArticleTitle title={article.titles.ar} lang="AR" />
                </div>
              {/if}

              {#if article.titles.ru}
                <div>
                  <ArticleTitle title={article.titles.ru} lang="RU" />
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
    <Modal
      style="error"
      action="deleteArticle"
      bind:modal
      title="Delete Article"
      id={deleteID}
      btn="Confirm Delete">Are you sure you want to delete this article?</Modal
    >
  </div>
{/await}

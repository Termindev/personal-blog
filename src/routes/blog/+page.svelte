<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let articles = $state(data.articlesPromise);
</script>

<!-- TODO: Maybe add skeleton loading instead -->
{#await articles}
  <div class="flex items-center justify-center h-[90vh]">
    <span class="loading loading-spinner w-1/6"></span>
  </div>
{:then articles}
  {#each articles as article}
    <a
      href={`/blog/${article.id}`}
      class="card bg-base-200/40 backdrop-blur-md w-96 shadow-sm"
    >
      <div class="card-body">
        <h2 class="card-title">{article.title}</h2>
        <p>
          {article.desc}
        </p>
        <div class="card-actions justify-end">
          {#each article.tags as tag}
            <div class="badge badge-outline rounded-sm">{tag}</div>
          {/each}
        </div>
      </div>
    </a>
  {/each}
{/await}

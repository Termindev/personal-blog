<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import Loading from "$lib/components/Loading.svelte";

  let { data }: PageProps = $props();

  let articles = $state(data.articlesPromise);
</script>

<!-- TODO: Maybe add skeleton loading instead -->
{#await articles}
  <Loading />
{:then articles}
  <div class="grid sm:grid-cols-2 xl:grid-cols-3 place-items-center gap-2">
    {#each articles as article}
      <a
        href={`/blog/${article.id}`}
        class="card bg-base-200/40 backdrop-blur-md min-h-48 w-10/12 md:w-sm shadow-sm"
      >
        <div class="card-body">
          <h2 class="card-title text-md md:text-xl">{article.title}</h2>
          <p class="text-sm md:text-lg">
            {article.desc}
          </p>
          <div class="card-actions justify-end">
            {#each article.tags as tag}
              <div class="badge badge-outline rounded-sm text-xs md:text-sm">
                {tag}
              </div>
            {/each}
          </div>
        </div>
      </a>
    {/each}
  </div>
{/await}

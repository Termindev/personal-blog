<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let articles = $state(data.articles);

  onMount(() => {
    console.log("Articles:", articles);
  });
</script>

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

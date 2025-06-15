<script lang="ts">
  import { marked } from "marked";
  import { onMount } from "svelte";
  import Container from "./subComponents/Container.svelte";
  let { article } = $props();

  onMount(() => {
    const anchors = document.querySelectorAll(".markdown-body a");
    anchors.forEach((anchor) => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });
  });
</script>

<Container id="">
  <h1 class="border-b-0 text-xl sm:text-3xl font-bold">{article.title}</h1>
  <p class="text-sm sm:text-lg">{article.desc}</p>
  <div class="flex flex-wrap gap-2 items-center justify-center my-4">
    {#each article.tags as tag}
      <button
        class="badge badge-lg cursor-pointer transition-colors duration-200
              border border-neutral-content px-3 py-2 rounded-md text-sm font-medium
              "
      >
        #{tag.name}
      </button>
    {/each}
  </div>
</Container>
<div class="markdown-body info">
  {@html marked(article.content)}
</div>

<style>
  .info {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding-right: 45px;
    padding-left: 45px;
    padding-bottom: 45px;
  }
</style>

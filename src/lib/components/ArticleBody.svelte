<script lang="ts">
  import { marked } from "marked";
  import { onMount } from "svelte";
  let { article } = $props();

  onMount(() => {
    const anchors = document.querySelectorAll(".markdown-body a");
    anchors.forEach((anchor) => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });
  });
</script>

<div class="markdown-body">
  {@html marked(article.content)}
</div>

<style>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }
</style>

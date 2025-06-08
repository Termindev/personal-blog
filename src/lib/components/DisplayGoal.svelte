<script lang="ts">
  import { marked } from "marked";
  let { goal } = $props();

  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0"); // 01 - 31
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 01 - 12
    const year = date.getFullYear(); // e.g., 2025
    return `${day}.${month}.${year}`;
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="/github-markdown.css" />
</svelte:head>
<div
  class="card p-4 glow bg-base-100 md:w-full sm:w-2/3 w-full mx-auto {goal.achieved
    ? 'line-through'
    : ''}"
>
  <div class="card-body p-4">
    <h2 class="card-title text-2xl">{goal.title}</h2>
    <p class="text-start">
      {@html marked(goal.desc)}
    </p>
  </div>
  {#if goal.deadline}
    <div class="card-actions justify-end">
      Deadline: {formatDate(goal.deadline)}
    </div>
  {/if}
</div>

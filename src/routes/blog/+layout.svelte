<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>Termin | Blog</title>
</svelte:head>
{@render children()}

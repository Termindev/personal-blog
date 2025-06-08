<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";
  import AdminNav from "$lib/components/AdminNav.svelte";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<AdminNav />
{@render children()}

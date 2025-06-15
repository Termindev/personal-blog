<script lang="ts">
  import { t } from "svelte-i18n";
  let { tags, selectedTags, onClear, onToggle } = $props();
</script>

<div class="flex flex-wrap gap-2 items-center justify-center mb-4">
  {#each tags as tag}
    <button
      class="badge badge-lg cursor-pointer transition-colors duration-200
              border border-neutral-content px-3 py-2 rounded-md text-sm font-medium
              hover:bg-neutral-content hover:text-base-100
              {selectedTags.includes(tag) ? 'badge-primary text-base-100' : ''}"
      onclick={() => onToggle(tag)}
    >
      #{tag}
    </button>
  {/each}

  {#if selectedTags.length > 0}
    <button class="btn btn-sm btn-outline ml-2" onclick={onClear}
      >{$t("blog.clear")}</button
    >
  {/if}
</div>

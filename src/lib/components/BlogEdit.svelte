<script lang="ts">
  import Toggle from "./subComponents/Toggle.svelte";

  let { articleData, lang, lang_full, blog = true } = $props();
  let article = $state(articleData);

  let newTag = $state("");

  function addTag() {
    if (newTag.length < 1) return;
    const tag = { name: newTag.trim().toLowerCase() };
    if (tag && !article[`tags_${lang}`].includes(tag)) {
      article[`tags_${lang}`] = [...article[`tags_${lang}`], tag];
      newTag = "";
    }
  }

  function removeTag(tagToRemove: string) {
    article[`tags_${lang}`] = article[`tags_${lang}`].filter(
      (tag: any) => tag !== tagToRemove
    );
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  }
</script>

<h1 class="text-lg font-bold">{lang_full}:</h1>
<Toggle bind:value={article[lang]} />

{#if article[lang]}
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{lang_full} Title</legend>
    <input
      type="text"
      class="input mx-auto"
      placeholder="Type here"
      name={`title_${lang}`}
      bind:value={article[`title_${lang}`]}
    />
  </fieldset>

  <fieldset class="fieldset">
    <legend class="fieldset-legend">{lang_full} Description</legend>
    <textarea
      class="textarea h-2/6 mx-auto sm:w-2/3"
      name={`desc_${lang}`}
      bind:value={article[`desc_${lang}`]}
    ></textarea>
  </fieldset>
  {#if blog}
    <fieldset class="fieldset">
      <legend class="fieldset-legend">{lang_full} Content</legend>
      <textarea
        class="textarea min-h-64 mx-auto sm:w-2/3"
        name={`content_${lang}`}
        bind:value={article[`content_${lang}`]}
      ></textarea>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">{lang_full} Tags</legend>

      <!-- Tag input -->
      <div class="flex items-center gap-2 mb-2 mx-auto">
        <input
          type="text"
          class="input input-sm input-bordered"
          placeholder="Add tag"
          bind:value={newTag}
          onkeydown={handleKey}
        />
        <button type="button" class="btn btn-sm btn-primary" onclick={addTag}>
          Add
        </button>
      </div>

      <!-- Display tags -->
      <div class="flex flex-wrap gap-2 mx-auto justify-center">
        {#each article[`tags_${lang}`] as tag}
          <div class="badge badge-neutral gap-1">
            {tag.name}
            <button
              type="button"
              class="ml-1 text-xs"
              onclick={() => removeTag(tag)}
              aria-label="Remove tag"
            >
              ✕
            </button>
          </div>
          <input type="hidden" name={`tags_${lang}[]`} value={tag.name} />
        {/each}
      </div>
    </fieldset>
  {/if}
{/if}

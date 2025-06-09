<script lang="ts">
  import Toggle from "./subComponents/Toggle.svelte";

  let { lang, lang_full } = $props();

  let show = $state(false);
</script>

<h1 class="text-lg font-bold">{lang_full}:</h1>
<Toggle bind:value={show} />

{#if show}
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{lang_full} Title</legend>
    <input
      type="text"
      class="input mx-auto"
      placeholder="Type here"
      name={`title_${lang}`}
    />
  </fieldset>

  <fieldset class="fieldset">
    <legend class="fieldset-legend">{lang_full} Description</legend>
    <textarea class="textarea h-2/6 mx-auto sm:w-2/3" name={`desc_${lang}`}
    ></textarea>
  </fieldset>
{/if}

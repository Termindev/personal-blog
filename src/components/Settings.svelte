<script lang="ts">
  import { locale, json, t } from "svelte-i18n";
  let langs: { name: string; id: string; flag: string }[] = $derived(
    $json("settings.langs")
  ) as {
    name: string;
    id: string;
    flag: string;
  }[];
</script>

<div class="dropdown dropdown-end">
  <div tabindex="0" role="button" class="btn m-1">{$t("settings.title")}</div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <ul
    tabindex="0"
    class="dropdown-content menu bg-base-200/70 rounded-lg z-1 w-52 p-2 shadow-sm"
  >
    <h1 class="text-lg mx-auto">{$t("settings.languages")}</h1>
    {#each langs as lang}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <li>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_missing_attribute -->
        <a
          onclick={(e) => {
            locale.set(lang.id);
            localStorage.setItem("lang", lang.id);
          }}
        >
          {lang.name}
          {#if lang.id == $locale}
            {lang.flag}
          {/if}
        </a>
      </li>
    {/each}
    <h1 class="text-lg mx-auto">{$t("settings.themes")}</h1>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label={$t("settings.dark")}
        value="Default"
      />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label={$t("settings.light")}
        value="mylight"
      />
    </li>
  </ul>
</div>

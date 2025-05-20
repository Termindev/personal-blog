<script lang="ts">
  import { locale, json, t } from "svelte-i18n";
  let langs: { name: string; id: string; flag: string }[] = $json(
    "settings.langs"
  ) as {
    name: string;
    id: string;
    flag: string;
  }[];
</script>

<div class="dropdown dropdown-end">
  <div tabindex="0" role="button" class="btn m-1">Settings</div>
  <ul
    tabindex="0"
    class="dropdown-content menu bg-base-200/70 rounded-lg z-1 w-52 p-2 shadow-sm"
  >
    <h1 class="text-lg mx-auto">{$t("settings.languages")}</h1>
    {#each langs as lang}
      <li>
        <a
          onclick={(e) => {
            locale.set(lang.id);
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
        class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        aria-label="Dark"
        value="Default"
      />
    </li>
    <li>
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
        aria-label="Light"
        value="mylight"
      />
    </li>
  </ul>
</div>

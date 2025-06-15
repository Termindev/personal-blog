<script lang="ts">
  import { onMount } from "svelte";
  import { locale, json, t } from "svelte-i18n";
  import { theme } from "$lib/store";
  import { serialize } from "cookie";
  import { Cog, Languages, SunMoon } from "lucide-svelte";

  let langs: { name: string; id: string; flag: string }[] = $derived(
    $json("settings.langs")
  ) as {
    name: string;
    id: string;
    flag: string;
  }[];

  let light: HTMLInputElement;
  let dark: HTMLInputElement;

  function getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  function setCookie(name: string, value: string, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${serialize(name, value, {
      path: "/",
      maxAge: days * 86400,
    })}; expires=${expires}`;
  }

  onMount(() => {
    const savedTheme = getCookie("theme") || "dark";
    theme.set(savedTheme);
    if (savedTheme === "dark") {
      dark.checked = true;
      light.checked = false;
    } else {
      dark.checked = false;
      light.checked = true;
    }

    const savedLang = getCookie("lang");
    if (savedLang) {
      locale.set(savedLang);
    }
  });

  let updateTheme = (newTheme: string) => {
    theme.set(newTheme);
    setCookie("theme", newTheme);
  };

  let updateLang = (newLang: string) => {
    locale.set(newLang);
    setCookie("lang", newLang);
  };
</script>

<div class="dropdown dropdown-end">
  <div tabindex="0" role="button" class="btn m-1"><Cog /></div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <ul
    tabindex="0"
    class="dropdown-content menu bg-base-200/90 rounded-lg z-1 w-52 p-2 shadow-sm"
  >
    <h1 class="text-lg px-3 py-2 flex items-center justify-between">
      <span>
        {$t("settings.languages")}
      </span>
      <Languages />
    </h1>
    {#each langs as lang}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <li>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_missing_attribute -->
        <a onclick={() => updateLang(lang.id)}>
          {lang.name}
          {#if lang.id == $locale}
            {lang.flag}
          {/if}
        </a>
      </li>
    {/each}
    <h1 class="text-lg px-3 py-2 flex items-center justify-between">
      <span>
        {$t("settings.themes")}
      </span>
      <SunMoon />
    </h1>
    <li class="flex">
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        aria-label={$t("settings.dark")}
        value="Default"
        onchange={() => updateTheme("dark")}
        bind:this={dark}
      />
    </li>
    <li class="flex">
      <input
        type="radio"
        name="theme-dropdown"
        class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
        onchange={() => updateTheme("winter")}
        aria-label={$t("settings.light")}
        value="winter"
        bind:this={light}
      />
    </li>
  </ul>
</div>

<script lang="ts">
  import { locale, waitLocale } from "svelte-i18n";
  import "../app.css";
  import Navbar from "../components/Navbar.svelte";
  import "../lib/i18n";
  import { onMount } from "svelte";
  onMount(() => {
    if (localStorage.getItem("lang")) {
      locale.set(localStorage.getItem("lang"));
    }
  });
  let { children } = $props();
</script>

<!-- TODO: use dir from lang store -->
{#await waitLocale() then}
  <div>
    <Navbar />
    {@render children()}
  </div>
{/await}

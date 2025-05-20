<script lang="ts">
  import "../app.css";
  import Navbar from "../components/Navbar.svelte";
  import "../lib/i18n";
  let { children } = $props();
</script>

<!-- TODO: use dir from lang store -->
<div>
  <Navbar />
  {@render children()}
</div>

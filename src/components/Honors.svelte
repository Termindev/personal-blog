<script lang="ts">
  import Achievement from "./Achievement.svelte";
  import { json } from "svelte-i18n";
  let honors: { name: string; honor: string; img: string }[] = $json(
    "achievements.honors"
  ) as { name: string; honor: string; img: string }[];
</script>

{#each honors as honor}
  <Achievement img={honor.img} name={honor.name} honor={honor.honor} />
{/each}

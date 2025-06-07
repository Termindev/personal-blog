<script lang="ts">
  import Goal from "$lib/components/Goal.svelte";
  import Container from "$lib/components/subComponents/Container.svelte";
  import SubTitle from "$lib/components/subComponents/SubTitle.svelte";
  import Title from "$lib/components/subComponents/Title.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<Container id="">
  <Title>My goals</Title>
  <SubTitle>A list of my main goals</SubTitle>
  <Goal></Goal>
</Container>

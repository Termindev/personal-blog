<script lang="ts">
  import Container from "$lib/components/subComponents/Container.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<Container id="input">
  <h1 class="text-3xl mb-4">Post an article</h1>
  <form action="?/createArticle" method="POST" enctype="multipart/form-data" class="text-center">
    <h2 class="text-xl">Arabic</h2>
    <input type="file" class="file-input block my-4 mx-auto" accept="md" name="arcontent" />
    <h2 class="text-xl">English</h2>
    <input type="file" class="file-input block my-4 mx-auto" accept="md" name="encontent" />
    <h2 class="text-xl">Russian</h2>
    <input type="file" class="file-input block my-4 mx-auto" accept="md" name="rucontent" />
    <button type="submit" class="btn btn-soft">Post!</button>
  </form>
</Container>

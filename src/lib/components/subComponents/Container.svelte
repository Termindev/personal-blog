<script lang="ts">
  let { children, id } = $props();
</script>

<section
  class="py-12 px-4 md:px-6 md:mx-8 text-base-content text-center"
  {id}
  dir="auto"
>
  {@render children()}
</section>

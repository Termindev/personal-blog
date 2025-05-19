<script lang="ts">
  let { children, id } = $props();
</script>

<section class="py-12 px-6 mx-8 text-base-content text-center" {id}>
  {@render children()}
</section>

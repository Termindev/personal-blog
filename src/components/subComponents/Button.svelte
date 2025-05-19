<script>
  let { link, children, img, alt } = $props();
</script>

<a
  href={link}
  class="inline-flex items-center gap-2 mr-4 border-base-300 px-3 py-2 border-2 rounded-xl hover:bg-primary/10 transition-colors"
>
  <img src={img} {alt} class="w-6" />
  <span>{@render children()}</span>
</a>

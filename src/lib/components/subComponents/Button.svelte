<script>
  let { link, text, children } = $props();
</script>

<a
  href={link}
  class="inline-flex items-center gap-2 my-1 sm:me-4 border-primary/20 px-3 py-2 border-2 rounded-xl hover:bg-primary/20 transition-all duration-200 ease-in"
  target="_blank"
>
  {@render children()}
  <span>{text}</span>
</a>

<script>
  let { link, text, children } = $props();
</script>

<a
  href={link}
  class="inline-flex items-center gap-2 my-1 sm:mr-4 border-base-300 px-3 py-2 border-2 rounded-xl hover:bg-primary/10 transition-colors"
  target="_blank"
>
  {@render children()}
  <span>{text}</span>
</a>

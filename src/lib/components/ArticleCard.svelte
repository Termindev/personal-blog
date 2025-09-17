<script lang="ts">
  let { article } = $props();
</script>

<a
  href={`/blog/${article.id}`}
  class="card bg-base-200/40 backdrop-blur-md min-h-48 h-60 rounded-lg glow w-full shadow-sm"
  data-sveltekit-reload
>
  <div class="card-body">
    <h2 class="card-title text-md md:text-xl">{article.title}</h2>
    <p class="text-sm font-light text-start md:text-lg">{article.desc}</p>
    <div class="card-actions justify-end flex-wrap gap-1">
      {#each article.tags as tag}
        <div class="badge badge-outline rounded-sm text-xs md:text-sm">
          #{tag}
        </div>
      {/each}
    </div>
  </div>
</a>

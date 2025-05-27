<script lang="ts">
  let { name, img, honor } = $props();
</script>

<div
  class="card w-56 h-74 max-w-full rounded-2xl bg-accent/10 border border-primary glow p-4 mx-4 inline-block flex-col justify-between"
>
  <figure class="px-2 pt-2 flex justify-center">
    <img src={img} alt="Award Badge" class="w-32 h-32 object-contain" />
  </figure>

  <div class="card-body items-center text-center p-2 flex flex-col justify-end">
    <h2
      class="font-semibold break-words whitespace-normal leading-tight text-primary text-center text-lg"
    >
      {name}
    </h2>
    <p
      class="text-sm mt-1 break-words whitespace-normal leading-snug text-center"
    >
      {honor}
    </p>
  </div>
</div>

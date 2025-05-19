<script>
  import Button from "./subComponents/Button.svelte";
  let { srcLink, children, siteLink, name } = $props();
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-lg text-start">
  <div class="flex flex-col">
    <div class="flex-1 my-4">
      <h2 class="text-4xl md:text-5xl font-bold md:font-extrabold">{name}</h2>
    </div>
    <div class="flex-1 my-4 text-xl md:text-2xl lg:mr-14">
      {@render children()}
    </div>
    <div class="flex-1 my-4">
      <Button link={srcLink} img="/svg/gh.svg" alt="github">View source</Button>
      <Button link={siteLink} img="/svg/link.svg" alt="link"
        >View project</Button
      >
    </div>
  </div>

  <div class="rounded-lg shadow-md">
    <img src="/images/waytoru.png" alt="project preview" class="rounded-lg" />
  </div>
</div>

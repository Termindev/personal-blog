<script>
  import Button from "./subComponents/Button.svelte";
  let { srcLink, children, siteLink, name } = $props();
  import { t } from "svelte-i18n";
  import { Link2 } from "lucide-svelte";
  import { SiGithub } from "@icons-pack/svelte-simple-icons";
</script>

<div
  class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:p-4 rounded-lg lg:text-start text-center"
>
  <div class="flex flex-col">
    <div class="flex-1 my-4">
      <h2 class="text-4xl md:text-5xl font-bold md:font-extrabold">{name}</h2>
    </div>
    <div class="flex-1 my-4 text-xl md:text-2xl lg:me-14">
      {@render children()}
    </div>
    <div class="flex-1 my-4">
      <Button link={srcLink} text={$t("projects.view_src")}>
        <SiGithub />
      </Button>
      <Button link={siteLink} text={$t("projects.view_project")}>
        <Link2 />
      </Button>
    </div>
  </div>

  <div class="rounded-lg shadow-md">
    <img src="/images/waytoru.png" alt="project preview" class="rounded-lg" />
  </div>
</div>

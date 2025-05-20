<script>
  import Container from "./subComponents/Container.svelte";
  import Honors from "./Honors.svelte";
  import Line from "./subComponents/Line.svelte";
  import SubTitle from "./subComponents/SubTitle.svelte";
  import Title from "./subComponents/Title.svelte";
  import { t } from "svelte-i18n";
</script>

<Container id="achievements">
  <div class="z-10 max-w-5xl mx-auto text-2xl md:text-3xl my-4 relative">
    <Title>{$t("achievements.title")}</Title>
    <SubTitle>
      {@html $t("achievements.sub")}
    </SubTitle>

    <div class="relative flex overflow-x-hidden">
      <div
        class="pointer-events-none absolute left-0 top-0 h-full w-4 sm:w-16 bg-gradient-to-r from-base-100 to-transparent z-20"
      ></div>

      <div
        class="pointer-events-none absolute right-0 top-0 h-full w-4 sm:w-16 bg-gradient-to-l from-base-100 to-transparent z-20"
      ></div>

      <div class="animate-marquee py-12 whitespace-nowrap">
        <Honors />
      </div>
      <div class="absolute top-0 animate-marquee2 py-12 whitespace-nowrap">
        <Honors />
      </div>
    </div>
  </div>
</Container>
<Line />

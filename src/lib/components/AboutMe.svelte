<script>
  import Container from "./subComponents/Container.svelte";
  import Line from "./subComponents/Line.svelte";
  import SubTitle from "./subComponents/SubTitle.svelte";
  import Title from "./subComponents/Title.svelte";
  import { t } from "svelte-i18n";
</script>

<Container id="about">
  <div class="z-10 max-w-5xl mx-auto sm:text-2xl text-lg md:text-3xl my-4">
    <Title>{$t("about.title")}</Title>
    <SubTitle>{@html $t("about.sub")}</SubTitle>

    <p>
      {@html $t("about.name")}
    </p>

    <p class="mb-4">
      {@html $t("about.jobs")}
    </p>

    <!-- <p class="text-base-content/90 text-xl md:text-2xl my-4">
      Well, other than that, I like
      <span class="text-accent"> reading</span>,
      <span class="text-accent"> studying</span>, and
      <span class="text-accent">
        turning whatever comes to my field of imaginations to reality with the
        help of code</span
      >.
    </p> -->
    <!-- 
    <p class="text-xl md:text-2xl my-4">
      I like <span class="text-info">thinking for long periods of time</span>,
      sometimes I’d think about a problem for weeks, I’d watch courses, read
      books — all just to get the satisfaction of solving a problem.
    </p> -->

    <p class="text-xl md:text-2xl my-4">
      {@html $t("about.langs")}
    </p>

    <p class="text-xl md:text-2xl my-4">
      {@html $t("about.more")}
    </p>
  </div>
</Container>
<Line />

<script lang="ts">
  import Project from "./Project.svelte";
  import Container from "./subComponents/Container.svelte";
  import Line from "./subComponents/Line.svelte";
  import More from "./subComponents/More.svelte";
  import SubTitle from "./subComponents/SubTitle.svelte";
  import Title from "./subComponents/Title.svelte";
  import { t, json } from "svelte-i18n";
  let projects: {
    desc: string;
    name: string;
    link: string;
    src: string;
  }[] = $derived($json("projects.projects")) as {
    desc: string;
    name: string;
    link: string;
    src: string;
  }[];
</script>

<Container id="projects">
  <Title>{$t("projects.title")}</Title>
  <SubTitle>
    {@html $t("projects.sub")}
  </SubTitle>
  <div>
    {#each projects as project}
      <Project
        name={project.name}
        srcLink={project.src}
        siteLink={project.link}
      >
        {project.desc}
      </Project>
    {/each}
  </div>
  <More />
</Container>
<Line />

<script>
  import Project from "./Project.svelte";
  import Container from "./subComponents/Container.svelte";
  import Line from "./subComponents/Line.svelte";
  import SubTitle from "./subComponents/SubTitle.svelte";
  import Title from "./subComponents/Title.svelte";
</script>

<Container id="projects">
  <Title>Projects</Title>
  <SubTitle
    >Some of the <span class="text-secondary">projects</span> I've worked on</SubTitle
  >
  <div>
    <Project
      name="Way To Russia"
      srcLink="https://github.com/Termindev/WTR"
      siteLink="https://waytoru.vercel.app/"
      >A website made as a guide to help people who want to apply to
      universities in Russia.</Project
    >
  </div>
</Container>
<Line />

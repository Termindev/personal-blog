<script>
  import AboutMe from "$lib/components/AboutMe.svelte";
  import Achievements from "$lib/components/Achievements.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Projects from "$lib/components/Projects.svelte";
</script>

<svelte:head>
  <meta name="author" content="Termin" />
  <meta property="og:title" content="Termin" />
  <meta name="twitter:title" content="Termin" />
  <meta property="og:site_name" content="Termin" />
  <title>Termin</title>
  <meta name="description" content="A developer, pentester and a student" />
  <meta
    property="og:description"
    content="A developer, pentester and a student"
  />
  <meta
    name="twitter:description"
    content="A developer, pentester and a student"
  />
</svelte:head>

<Hero />
<Achievements />
<AboutMe />
<Projects />
<Contact />
<Footer />

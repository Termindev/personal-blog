<script>
  import AboutMe from "$lib/components/AboutMe.svelte";
  import Achievements from "$lib/components/Achievements.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Projects from "$lib/components/Projects.svelte";
</script>

<svelte:head>
  <title>Termin | Home</title>
  <meta name="description" content="A developer, pentester and a student" />
  <link rel="canonical" href="https://termin.is-a.dev/" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://termin.is-a.dev/" />
  <meta property="og:title" content="Termin" />
  <meta
    property="og:description"
    content="A developer, pentester and a student"
  />
  <meta property="og:site_name" content="Termin" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:title" content="Termin" />
  <meta
    property="twitter:description"
    content="A developer, pentester and a student"
  />

  <!-- Additional meta tags -->
  <meta name="theme-color" content="#8593EC" />
  <meta name="author" content="Termin" />
</svelte:head>

<Navbar />
<Hero />
<Achievements />
<AboutMe />
<Projects />
<Contact />
<Footer />

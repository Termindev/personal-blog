<script>
  import AboutMe from "$lib/components/AboutMe.svelte";
  import Achievements from "$lib/components/Achievements.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import { MetaTags } from "svelte-meta-tags";
</script>

<MetaTags
  title="Home"
  description="A developer, pentester and a student"
  canonical="https://termin.is-a.dev/"
  openGraph={{
    type: "website",
    url: "https://termin.is-a.dev/",
    title: "Termin",
    description: "A developer, pentester and a student",
    siteName: "Termin",
    images: [
      {
        url: "/favicon.png",
        alt: "Icon",
      },
    ],
  }}
  twitter={{
    cardType: "summary_large_image",
    title: "Termin",
    description: "A developer, pentester and a student",
    image: "/favicon.png",
    imageAlt: "Icon",
  }}
  additionalMetaTags={[
    {
      name: "theme-color",
      content: "#8593EC",
    },
    {
      name: "author",
      content: "Termin",
    },
  ]}
/>

<Navbar />
<Hero />
<Achievements />
<AboutMe />
<Projects />
<Contact />
<Footer />

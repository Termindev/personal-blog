<script>
  import Container from "./subComponents/Container.svelte";
  import Line from "./subComponents/Line.svelte";
  import SubTitle from "./subComponents/SubTitle.svelte";
  import Title from "./subComponents/Title.svelte";
</script>

<Container id="about">
  <div class="z-10 max-w-5xl mx-auto sm:text-2xl text-lg md:text-3xl my-4">
    <Title>About me</Title>
    <SubTitle>
      A brief <span class="text-secondary">introduction</span> about me
    </SubTitle>

    <p>
      My name’s <span class="font-bold text-accent">Mohammed</span>.
    </p>

    <p class="mb-4">
      I’m a <span class="font-bold text-accent">student</span> in the morning, a
      <span class="font-bold text-accent">(competitive) programmer</span>
      in the afternoon, and a
      <span class="font-bold text-accent">hacker</span> at night.
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
      I’m also fluent in three languages! I speak
      <span class="text-info"> Arabic 🇸🇦</span>
      (which is my native language),
      <span class="text-info"> English 🇬🇧</span> (Which I learned in school),
      and
      <span class="text-info"> Russian 🇷🇺</span> (Which I learned myself, without
      a tutor).
    </p>

    <p class="text-xl md:text-2xl my-4">
      You could learn more about me in my
      <a href="/blog" class="link link-accent"> blog</a>, there I write whatever
      I think would be interesting to read, so I’m sure you’ll like it!
    </p>
  </div>
</Container>
<Line />

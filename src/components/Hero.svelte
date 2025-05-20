<script lang="ts">
  import { onMount } from "svelte";
  import Line from "./subComponents/Line.svelte";
  import { t, json } from "svelte-i18n";
  const nameStates: string[] = $derived($json("hero.names")) as string[];
  const roleStates: string[] = $derived($json("hero.jobs")) as string[];
  // TODO: Fix the fact that it loops on language change
  const letters: string = $derived($t("hero.enc_str"));
  const animStepTime: number = 50; // ms per animation step
  const totalSteps: number = 20; // number of steps in morph animation
  const displayDuration: number = 2000; // display decrypted text for 2 seconds

  let displayName: string = $derived(nameStates[0]);
  let displayRole: string = $derived(roleStates[0]);

  function randomLetter(): string {
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  async function morphText(
    current: string,
    target: string,
    setText: (val: string) => void
  ): Promise<void> {
    let currentArr: string[] = current.split("");
    const targetArr: string[] = target.split("");

    for (let step = 0; step <= totalSteps; step++) {
      const progress: number = step / totalSteps;
      const lengthTarget: number = Math.round(
        currentArr.length + (targetArr.length - currentArr.length) * progress
      );

      while (currentArr.length < lengthTarget) {
        currentArr.push(randomLetter());
      }
      while (currentArr.length > lengthTarget) {
        currentArr.pop();
      }

      for (let i = 0; i < currentArr.length; i++) {
        if (i < targetArr.length) {
          if (progress > 0.5) {
            if (currentArr[i] !== targetArr[i]) {
              if (Math.random() < progress) {
                currentArr[i] = targetArr[i];
              } else {
                currentArr[i] = randomLetter();
              }
            }
          } else {
            currentArr[i] = randomLetter();
          }
        } else {
          currentArr[i] = randomLetter();
        }
      }

      setText(currentArr.join(""));
      await new Promise((r) => setTimeout(r, animStepTime));
    }

    setText(target);
  }

  async function animationLoop(): Promise<void> {
    let index: number = 0;

    while (true) {
      const currentName: string = displayName;
      const currentRole: string = displayRole;

      const nextIndex: number = (index + 1) % nameStates.length;
      const nextName: string = nameStates[nextIndex];
      const nextRole: string = roleStates[nextIndex];

      await Promise.all([
        morphText(currentName, nextName, (v: string) => (displayName = v)),
        morphText(currentRole, nextRole, (v: string) => (displayRole = v)),
      ]);

      await new Promise((r) => setTimeout(r, displayDuration));

      index = nextIndex;
    }
  }

  onMount(async () => {
    animationLoop();
  });
</script>

<section
  class="hero min-h-screen overflow-hidden flex flex-col justify-center items-center text-center px-4"
>
  <div class="max-w-xl">
    <h1 class="text-5xl md:text-7xl font-bold mb-4">{$t("hero.greet")}</h1>
    <h2 class="text-4xl md:text-6xl font-bold mb-2">
      {$t("hero.im")}
      <span
        class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-extrabold whitespace-pre"
        >{displayName}</span
      >
    </h2>
    <h3 class="text-3xl md:text-5xl font-semibold mb-8">
      {$t("hero.a")}
      <span
        class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-extrabold whitespace-pre mb-2"
        >{displayRole}</span
      >
    </h3>

    <div class="flex justify-center gap-4">
      <a href="/blog" class="btn btn-primary px-6 py-3 font-semibold"
        >{$t("hero.my_blog")}</a
      >
      <a href="#about" class="btn btn-secondary px-6 py-3 font-semibold"
        >{$t("hero.who_am_i")}</a
      >
    </div>

    <div class="mt-16 flex flex-col items-center animate-bounce">
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <span class="text-sm mt-1">{$t("hero.scroll")}</span>
    </div>
  </div>
</section>
<Line />

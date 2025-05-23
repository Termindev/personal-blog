<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { theme } from "$lib/store";
  // Configuration - Updated for slower animation
  const GRID_SIZE = 40;
  const ANIMATION_DURATION = 10000; // Slowed down from 6000ms to 10000ms
  const MAX_OPACITY = 0.06; // Slightly reduced maximum opacity for subtle effect
  const ACTIVE_SQUARES_RATIO = 0.03; // Fewer active squares at once
  let radius = $derived($theme == "dark" ? "45vw" : "70vw");
  let squares: {
    id: number;
    x: number;
    y: number;
    opacity: number;
    delay: number;
    active: boolean;
  }[] = $state([]);
  let width = 0;
  let height = 0;
  let animationFrame: number;

  function calculateGrid() {
    width = window.innerWidth;
    height = window.innerHeight;

    const cols = Math.ceil(width / GRID_SIZE);
    const rows = Math.ceil(height / GRID_SIZE);
    const totalSquares = Math.ceil(cols * rows);

    squares = Array.from({ length: totalSquares }, (_, i) => ({
      id: i,
      x: (i % cols) * GRID_SIZE,
      y: Math.floor(i / cols) * GRID_SIZE,
      opacity: 0,
      delay: Math.random() * ANIMATION_DURATION * 3, // Wider delay range for more variation
      active: Math.random() < ACTIVE_SQUARES_RATIO,
    }));
  }

  function animate() {
    const now = performance.now();

    squares = squares.map((square) => {
      if (!square.active) return { ...square, opacity: 0 };

      const cycleTime = (now + square.delay) % ANIMATION_DURATION;
      const progress = cycleTime / ANIMATION_DURATION;

      // Even smoother fade with adjusted timing
      let opacity = 0;
      if (progress < 0.3) {
        opacity = Math.sin(((progress / 0.3) * Math.PI) / 2) * MAX_OPACITY;
      } else if (progress < 0.7) {
        opacity = MAX_OPACITY;
      } else {
        opacity =
          Math.cos((((progress - 0.7) / 0.3) * Math.PI) / 2) * MAX_OPACITY;
      }

      return { ...square, opacity };
    });

    animationFrame = requestAnimationFrame(animate);
  }

  onMount(() => {
    calculateGrid();
    animate();
    window.addEventListener("resize", calculateGrid);
  });

  onDestroy(() => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", calculateGrid);
  });
</script>

<svg
  aria-hidden="true"
  class={`pointer-events-none absolute inset-0 h-full w-full  combined-mask z-0 ${$theme == "dark" ? "fill-gray-400/30 stroke-gray-400/30" : "fill-black/35 stroke-black/35"}`}
  style="--radius: {radius};"
>
  <defs>
    <pattern
      id="grid-pattern"
      width={GRID_SIZE}
      height={GRID_SIZE}
      patternUnits="userSpaceOnUse"
      x="-1"
      y="-1"
    >
      <path
        d="M.5 {GRID_SIZE}V.5H{GRID_SIZE}"
        fill="none"
        stroke-dasharray="0"
      />
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#grid-pattern)" />

  <svg x="-1" y="-1" class="overflow-visible">
    {#each squares as square}
      <rect
        width={GRID_SIZE - 1}
        height={GRID_SIZE - 1}
        x={square.x}
        y={square.y}
        fill="currentColor"
        stroke-width="0"
        opacity={square.opacity}
        style="transition: opacity 500ms ease-out"
      ></rect>
    {/each}
  </svg>
</svg>

<style>
  .combined-mask {
    mask-image: radial-gradient(
        var(--radius, 30vw) circle at center,
        white,
        transparent
      ),
      radial-gradient(ellipse 100% 45vh at center, white 60%, transparent 100%);
    mask-composite: intersect;
    mask-mode: alpha;
  }
</style>

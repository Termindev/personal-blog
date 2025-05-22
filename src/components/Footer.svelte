<script lang="ts">
  import { Heart } from "lucide-svelte";
  import {
    SiSvelte,
    SiTailwindcss,
    SiDaisyui,
  } from "@icons-pack/svelte-simple-icons";
  import { t } from "svelte-i18n";
</script>

<footer
  class="footer footer-center p-6 mt-24 text-base-content text-sm border-t border-base-300/80"
>
  <div>
    <div class="inline-flex items-center gap-1">
      <span>{$t("footer.madeWith")}</span>
      <Heart size={16} class="text-red-500 fill-red-500" />
      <span>{$t("footer.by")}</span>
    </div>

    <div class="mt-2 flex flex-wrap justify-center gap-4">
      <a
        href="https://svelte.dev"
        target="_blank"
        class="hover:text-primary transition-colors inline-flex items-center gap-1"
      >
        <SiSvelte size={16} />
        <span>SvelteKit</span>
      </a>
      <a
        href="https://tailwindcss.com"
        target="_blank"
        class="hover:text-primary transition-colors inline-flex items-center gap-1"
      >
        <SiTailwindcss size={16} />
        <span>Tailwind</span>
      </a>
      <a
        href="https://daisyui.com"
        target="_blank"
        class="hover:text-primary transition-colors inline-flex items-center gap-1"
      >
        <SiDaisyui size={16} />
        <span>DaisyUI</span>
      </a>
    </div>
  </div>
</footer>

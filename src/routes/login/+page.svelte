<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
  import { SiGithub } from "@icons-pack/svelte-simple-icons";
</script>

<div class="text-center my-18">
  <button
    class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
    onclick={() => {
      signIn("github");
    }}
  >
    <SiGithub />
    Sign in
  </button>
</div>

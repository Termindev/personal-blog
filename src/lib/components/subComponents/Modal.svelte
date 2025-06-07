<script>
  import { enhance } from "$app/forms";

  let { title, id, btn, children } = $props();
  let modal = $state();
</script>

<dialog bind:this={modal} class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <form
      method="POST"
      action="?/deleteGoal"
      use:enhance
      class="text-center space-y-4"
    >
      <input type="hidden" name="id" value={id} />

      <h2 class="text-lg font-semibold">{title}</h2>
      <p class="text-sm">{@render children()}</p>
      <pre class="bg-base-300 p-2 rounded">{id}</pre>

      <div class="flex justify-center gap-2">
        <button type="submit" class="btn btn-sm btn-error">{btn}</button>
        <button type="button" class="btn btn-sm" onclick={() => modal.close()}>
          Cancel
        </button>
      </div>
    </form>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>Close</button>
  </form>
</dialog>

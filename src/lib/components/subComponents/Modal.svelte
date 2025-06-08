<script>
  import { enhance } from "$app/forms";

  let {
    modal = $bindable(),
    title,
    id = null,
    btn,
    children,
    action = null,
    style,
    fun = null,
  } = $props();
</script>

<dialog bind:this={modal} class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <form
      method="POST"
      action="?/{action}"
      use:enhance
      class="text-center space-y-4"
    >
      <input type="hidden" name="id" value={id} />

      <h2 class="text-lg font-semibold">{title}</h2>
      <p class="text-sm">{@render children()}</p>
      {#if id}
        <pre class="bg-base-300 p-2 rounded">{id}</pre>
      {/if}
      <div class="flex justify-center gap-2">
        <button
          type="submit"
          class="btn btn-sm btn-{style}"
          onclick={(e) => {
            if (!action && !id) {
              e.preventDefault();
              fun();
            }
          }}>{btn}</button
        >
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

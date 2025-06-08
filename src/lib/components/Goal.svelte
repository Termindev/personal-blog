<script>
  import ArticleTitle from "./subComponents/ArticleTitle.svelte";
  let { goal, goalID = $bindable(), modals } = $props();
</script>

<div class="card bg-base-100 glow border border-base-200">
  <div class="card-body">
    <pre class="bg-base-300 text-xs p-2 font-light rounded">{goal.id}</pre>

    <div class="space-y-2">
      <!-- Titles in all languages -->
      {#if goal.titles.en}
        <ArticleTitle title={goal.titles.en} lang="EN" />
      {/if}

      {#if goal.titles.ar}
        <div>
          <ArticleTitle title={goal.titles.ar} lang="AR" />
        </div>
      {/if}

      {#if goal.titles.ru}
        <div>
          <ArticleTitle title={goal.titles.ru} lang="RU" />
        </div>
      {/if}
    </div>

    <!-- Descriptions -->
    <div class="mt-4 text-sm space-y-1">
      {#if goal.descs.en}
        <p><strong>EN Desc:</strong> {goal.descs.en}</p>
      {/if}
      {#if goal.descs.ar}
        <p><strong>AR Desc:</strong> {goal.descs.ar}</p>
      {/if}
      {#if goal.descs.ru}
        <p><strong>RU Desc:</strong> {goal.descs.ru}</p>
      {/if}
    </div>

    <!-- Languages + Actions -->
    <div class="card-actions mt-4 justify-between items-center">
      <div class="space-x-1">
        {#each goal.supportedLanguages as lang}
          <span class="badge badge-outline badge-sm">{lang.toUpperCase()}</span>
        {/each}
      </div>
      <div>
        <button
          class="btn btn-sm btn-success"
          onclick={() => {
            goalID = goal.id;
            goal.achieved
              ? modals.unachieveModal.showModal()
              : modals.achieveModal.showModal();
          }}>Mark {goal.achieved ? "Unachieved" : "Achieved"}</button
        >
        <a href={`/admin/goals/${goal.id}`} class="btn btn-sm btn-accent"
          >Edit</a
        >

        <button
          class="btn btn-sm btn-error"
          onclick={() => {
            goalID = goal.id;
            modals.deleteModal.showModal();
          }}>Delete</button
        >
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  import Container from "$lib/components/subComponents/Container.svelte";

  const adminSections = [
    {
      title: "Create Article",
      description: "Start writing a new article",
      href: "/admin/create",
      icon: "✍️",
    },
    {
      title: "Manage Articles",
      description: "Edit or delete existing articles",
      href: "/admin/manage",
      icon: "🗂️",
    },
    {
      title: "Manage Tags",
      description: "Edit or remove tags used in articles",
      href: "/admin/tags",
      icon: "🏷️",
    },
  ];
</script>

<svelte:head>
  <title>Termin | Admin</title>
</svelte:head>
<!-- TODO: Design actual admin dashboard with analytics -->
<Container id="">
  <h1 class="text-3xl font-bold mb-6 px-4 pt-4">Admin Dashboard</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each adminSections as section}
      <a
        href={section.href}
        class="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-all duration-200"
      >
        <div class="card-body">
          <div class="text-4xl">{section.icon}</div>
          <h2 class="card-title">{section.title}</h2>
          <p>{section.description}</p>
        </div>
      </a>
    {/each}
  </div>
</Container>

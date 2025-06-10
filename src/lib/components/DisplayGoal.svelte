<script lang="ts">
  import { marked } from "marked";
  import { onMount } from "svelte";
  import { t, locale } from "svelte-i18n";
  let { goal } = $props();
  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function getDaysLeftText(deadline: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeDiff = deadline.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    switch ($locale) {
      case "en":
        return getEnglishText(daysDiff);
      case "ru":
        return getRussianText(daysDiff);
      case "ar":
        return getArabicText(daysDiff);
      default:
        return "";
    }
  }

  // English handler
  function getEnglishText(daysDiff: number): string {
    if (daysDiff > 1) {
      return `${daysDiff} days left`;
    } else if (daysDiff === 1) {
      return "1 day left";
    } else if (daysDiff === 0) {
      return "Due today";
    } else if (daysDiff === -1) {
      return "1 day overdue";
    } else {
      return `${Math.abs(daysDiff)} days overdue`;
    }
  }

  // Russian handler
  function getRussianText(daysDiff: number): string {
    const getRussianDayWord = (num: number): string => {
      const absNum = Math.abs(num);
      const lastDigit = absNum % 10;
      const lastTwoDigits = absNum % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return "дней";
      if (lastDigit === 1) return "день";
      if (lastDigit >= 2 && lastDigit <= 4) return "дня";
      return "дней";
    };

    if (daysDiff > 0) {
      return `${daysDiff} ${getRussianDayWord(daysDiff)} осталось`;
    } else if (daysDiff === 0) {
      return "Срок сегодня";
    } else if (daysDiff === -1) {
      return "Просрочено на 1 день";
    } else {
      return `Просрочено на ${Math.abs(daysDiff)} ${getRussianDayWord(daysDiff)}`;
    }
  }

  function getArabicText(daysDiff: number): string {
    if (daysDiff < 0) {
      return "فات أوانه";
    } else if (daysDiff === 0) {
      return "يُنْجَزُ اليوم";
    } else if (daysDiff === 1) {
      return "متبقي يوم";
    } else if (daysDiff === 2) {
      return "متبقي يومان";
    } else if (daysDiff >= 3 && daysDiff <= 10) {
      return `متبقي ${daysDiff} أيام`;
    } else {
      return `متبقي ${daysDiff} يومًا`;
    }
  }

  onMount(() => {
    const anchors = document.querySelectorAll("a");
    anchors.forEach((anchor) => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/github-markdown.css" />
</svelte:head>
<div
  class="card p-4 glow bg-base-100 md:w-full sm:w-2/3 w-full mx-auto {goal.achieved
    ? 'line-through'
    : ''}"
>
  <div class="card-body">
    <h2 class="card-title text-2xl">{goal.title}</h2>
    <p class="text-start markdown-body">
      {@html marked(goal.desc)}
    </p>
  </div>
  {#if goal.deadline}
    <div class="card-actions justify-between items-center px-6 pb-6">
      <span class="font-bold">
        {getDaysLeftText(goal.deadline)}
      </span>
      <span>{$t("goals.deadline")}: {formatDate(goal.deadline)}</span>
    </div>
  {/if}
</div>

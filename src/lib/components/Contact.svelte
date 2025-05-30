<script>
  import { ExternalLink, Mail } from "lucide-svelte";
  import Container from "./subComponents/Container.svelte";
  import SubTitle from "./subComponents/SubTitle.svelte";
  import Title from "./subComponents/Title.svelte";
  import { SiTelegram } from "@icons-pack/svelte-simple-icons";
  import { t } from "svelte-i18n";
</script>

<Container id="contact">
  <Title>{$t("contact.title")}</Title>
  <SubTitle>{@html $t("contact.sub")}</SubTitle>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-base-content">
    <div
      class="border text-center flex flex-col items-center justify-center w-5/6 lg:w-2/3 mx-auto glow rounded-xl p-5"
    >
      <Mail size={48} class="text-primary mb-3" />
      <h3 class="text-xl sm:text-3xl font-semibold text-primary mb-1">
        {$t("contact.email")}
      </h3>
      <a
        href="mailto:contact@termindev.ru"
        class="my-2 hover:text-info transition-colors duration-200 text-lg sm:text-xl"
      >
        contact@termindev.ru
      </a>
    </div>

    <div
      class="border text-center flex flex-col items-center justify-center w-5/6 lg:w-2/3 mx-auto glow rounded-xl p-5"
    >
      <span class="text-primary mb-3">
        <SiTelegram size={48} />
      </span>
      <h3 class="text-xl sm:text-3xl font-semibold text-primary mb-1">
        {$t("contact.telegram")}
      </h3>
      <a
        href="https://t.me/T3rmn"
        target="_blank"
        class="my-2 hover:text-info transition-colors duration-200 text-lg sm:text-xl"
      >
        @T3rmn
      </a>
    </div>
  </div>
</Container>

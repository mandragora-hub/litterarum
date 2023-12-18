<script setup lang="ts">
const location = useBrowserLocation();
const { t } = useI18n();

const fullUrl = computed(() => location.value.href || "");
const {
  copy,
  copied,
  isSupported: isSupportedClipboard,
} = useClipboard({ source: location.value.href });

const facebookShareLink = computed(() =>
  shareLinks.facebookShareLink(fullUrl.value)
);
const twitterShareLink = computed(() =>
  shareLinks.twitterShareLink(fullUrl.value)
);
const whatsAppShareLink = computed(() =>
  shareLinks.whatsAppShareLink(fullUrl.value)
);
const emailShareLink = computed(() =>
  shareLinks.emailShareLink("asd", fullUrl.value)
);
</script>
<template>
  <div class="flex flex-wrap gap-2">
    <UTooltip
      :text="
        t('components.social_media_buttons.share_on', { brand: 'facebook' })
      "
    >
      <UButton
        icon="i-mdi-facebook"
        color="blue"
        square
        :to="facebookShareLink"
        target="_blank"
      />
    </UTooltip>
    <UTooltip
      :text="
        t('components.social_media_buttons.share_on', { brand: 'twitter' })
      "
    >
      <UButton
        icon="i-mdi-twitter"
        color="sky"
        square
        :to="twitterShareLink"
        target="_blank"
      />
    </UTooltip>
    <UTooltip
      :text="
        t('components.social_media_buttons.share_on', { brand: 'whatsApp' })
      "
    >
      <UButton
        icon="i-mdi-whatsapp"
        color="emerald"
        square
        :to="whatsAppShareLink"
        target="_blank"
      />
    </UTooltip>
    <UTooltip :text="t('components.social_media_buttons.send_by_email')">
      <UButton
        icon="i-mdi-email-outline"
        color="gray"
        square
        :to="emailShareLink"
        target="_blank"
      />
    </UTooltip>
    <UTooltip
      v-if="isSupportedClipboard"
      :text="
        copied
          ? t('components.social_media_buttons.copied')
          : t('components.social_media_buttons.copy_to_clipboard')
      "
    >
      <UButton
        :icon="copied ? 'i-mdi-check' : 'i-mdi-link'"
        color="gray"
        square
        @click="() => copy()"
      />
    </UTooltip>
    <!-- <UButton icon="i-mdi-plus" color="black" square variant="ghost" /> -->
  </div>
</template>

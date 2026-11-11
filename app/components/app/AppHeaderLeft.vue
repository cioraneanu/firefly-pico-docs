<script setup lang="ts">
const appConfig = useAppConfig()
const site = useSiteConfig()
const baseURL = useRuntimeConfig().app.baseURL
</script>

<template>
  <NuxtLink
    to="/introduction"
    :aria-label="appConfig.header?.title || site.name"
    class="flex items-center gap-2"
  >
    <img
      :src="`${baseURL}images/logo.svg`"
      alt=""
      class="h-7 w-7 shrink-0"
    >
    <AppHeaderLogo class="h-6 w-auto shrink-0" />
  </NuxtLink>
</template>

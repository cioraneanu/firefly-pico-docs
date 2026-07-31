<script setup lang="ts">
const appConfig = useAppConfig()
const site = useSiteConfig()
</script>

<template>
  <NuxtLink
    to="/introduction"
    :aria-label="appConfig.header?.title || site.name"
  >
    <AppHeaderLogo class="h-6 w-auto shrink-0" />
  </NuxtLink>
</template>

// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    app: {
        baseURL: '/firefly-pico-docs/',
    },
    nitro: {
        prerender: {
            crawlLinks: true,
        },
    },
    // extends: '@nuxt-themes/docus',
    routeRules: {
        '/': {redirect: '/introduction'}
    },

    site: {
        name: 'Firefly-Pico',
    },
    // modules: ['nuxt-studio'],
})
// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
const baseURL = process.env.NUXT_APP_BASE_URL || '/';

export default defineNuxtConfig({
    app: {
        baseURL: baseURL,
    },
    image: {
        provider: 'none'
    },
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ['/', '/introduction'],
        },
    },
    // extends: '@nuxt-themes/docus',
    routeRules: {
        '/': {redirect: baseURL === '/' ? '/introduction' : baseURL + 'introduction'}
    },

    site: {
        name: 'Firefly-Pico',
    },
    // modules: ['nuxt-studio'],
})
// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
const baseURL = process.env.NUXT_APP_BASE_URL || '/';

export default defineNuxtConfig({
    app: {
        baseURL: baseURL,
        head: {
            link: [
                { rel: 'icon', type: 'image/png', href: `${baseURL}images/logo.png` }
            ]
        }
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
        // Keep this relative so it resolves under app.baseURL without embedding
        // the GitHub Pages path twice during client-side navigation.
        '/': {redirect: 'introduction'}
    },

    site: {
        name: 'Firefly-Pico',
    },
    // modules: ['nuxt-studio'],
})

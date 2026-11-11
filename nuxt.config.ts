// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
const baseURL = process.env.NUXT_APP_BASE_URL || '/';

export default defineNuxtConfig({
    app: {
        baseURL: baseURL,
        head: {
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}images/logo.svg` },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${baseURL}images/favicon-32x32.png` },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${baseURL}images/favicon-16x16.png` },
                { rel: 'apple-touch-icon', sizes: '180x180', href: `${baseURL}images/apple-touch-icon.png` }
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

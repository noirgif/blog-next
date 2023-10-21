/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: "Misty Mui | Noirgif's Blog",
  author: 'Noirgif',
  headerTitle: 'MistyMui',
  flavorTextFirst: 'Hope you learn something here',
  flavorTextSecond: 'Though StackOverflow has everything',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://misty.nir.moe',
  siteRepo: 'https://github.com/noirgif/blog-next',
  siteLogo: '/static/images/logo.png',
  //socialBanner: '/static/images/twitter-card.png',
  //mastodon: 'https://mastodon.social/@mastodonuser',
  //email: '',
  github: 'https://github.com/noirgif',
  twitter: 'https://twitter.com/noirgif',
  //facebook: 'https://facebook.com',
  //youtube: 'https://youtube.com',
  //linkedin: 'https://www.linkedin.com',
  //locale: 'en-US',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: 'da7e6f25-e04e-4b71-a561-45396008d97f', // e.g. 123e4567-e89b-12d3-a456-426614174000
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Please add your .env file and modify it according to your selection
    provider: '',
  },
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: 'noirgif/blog-next',
      repositoryId: 'R_kgDOKhMX7A',
      category: 'General',
      categoryId: 'DIC_kwDOKhMX7M4CaP5V',
      mapping: 'title', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '1',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'BSZX4B7QWI',
    //   // Public API key: it is safe to commit it
    //   apiKey: '66d817339c0573c1509c1dbf664f3ad5',
    //   indexName: 'mistymui-posts',
    // },
  },
}

module.exports = siteMetadata

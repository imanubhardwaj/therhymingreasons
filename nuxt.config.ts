export default {
  env: {
    baseUrl: 'https://blog.manubhardwaj.in'
  },
  head: {
    title: "The Rhyming Reasons",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Rhymes for a Reason" },
      { hid: "og:image", name: "og:image", content: "https://firebasestorage.googleapis.com/v0/b/therhymingreasons.appspot.com/o/website-images%2Flogo.png?alt=media&token=5db19a22-246f-4b11-9946-0c253703eb21" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css" }
    ]
  },
  loading: { color: "#3B8070" },
  css: ["~/assets/sass/main.scss", "@fortawesome/fontawesome-free/css/all.css"],
  build: {},
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@nuxtjs/vuetify",
  ],
  plugins: [
    '~/plugins/firebase.ts'
  ],
  vuetify: {
    icons: {
      iconfont: 'fa'
    }
  }
}

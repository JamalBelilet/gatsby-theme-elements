const queries = require("./src/utils/algolia")
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "Gatsby Theme Elements",
    description: "A fully featured gatsby theme designed for the Themes contest by Gatsby"
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/src/articles`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "icons",
        path: `${__dirname}/src/icons`
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}

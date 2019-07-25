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
    }
  ],
}

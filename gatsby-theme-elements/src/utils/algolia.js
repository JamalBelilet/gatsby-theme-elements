// const pageQuery = `{
//   pages: allMarkdownRemark(
//     filter: {
//       fileAbsolutePath: { regex: "/pages/" },
//     }
//   ) {
//     edges {
//       node {
//         objectID: id
//         frontmatter {
//           title
//         }
//         excerpt(pruneLength: 5000)
//       }
//     }
//   }
// }`

const articleQuery = `{
  articles: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/articles/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          date(formatString: "MMM D, YYYY")
          tags
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const flatten = arr => {
  return arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
}

const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  // {
  //   query: pageQuery,
  //   transformer: ({ data }) => flatten(data.pages.edges),
  //   indexName: `Pages`,
  //   settings,
  // },
  {
    query: articleQuery,
    transformer: ({ data }) => flatten(data.articles.edges),
    indexName: `Articles`,
    settings,
  },
]



module.exports = queries

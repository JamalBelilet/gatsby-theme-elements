import React from 'react'
import Layout from "../components/layout"
import { graphql, Link } from 'gatsby';

export const query = graphql`
  query ($articleId: String!) {
    markdownRemark(id: {eq:$articleId}) {
      html
      frontmatter {
        title
      }
    }
  }
`

const Article = ({
  data: {
    markdownRemark: { html, frontmatter: { title } }
  },
  pageContext: {
    prev,
    next
  }
}) => {
  return (
    <Layout>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <ul>
        {
          prev &&
            <li>
            <Link to={prev.slug}>prev: {prev.node.frontmatter.title}</Link>
            </li>
        }
        {
          next &&
          <li>
            <Link to={next.slug}>next: {next.node.frontmatter.title}</Link>
          </li>
        }
      </ul>
    </Layout>
  )
}

export default Article

import React from "react"
// import { Styled } from "theme-ui"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from 'gatsby'

const PageTemplate = ({ pageContext }) => {
  const {
    allMarkdownRemark: {
      edges: pages
    }
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: {order:DESC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            excerpt
            frontmatter {
              title
              date
              tags
            }
          }
        }
      }
    }
  `)
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    return `/${'/'}/${slug}`.replace(/\/\/+/g, '/');
  }
  return (
    <Layout>
      {/* <Styled.h1>{pageContext.heading}</Styled.h1> */}
      {/* <div dangerouslySetInnerHTML={{ __html: pageContext.content }} /> */}
      {/* <pre>{JSON.stringify(pages, 2, null)}</pre> */}
      <ul>{
        pages.map(
          ({
            node: {
              excerpt,
              frontmatter: {
                title,
                date,
                path,
                tags,
              }
            }
          }) => (
            <li>
                <Link to={slugify(title)}>{ title }</Link>
            </li>
          )
        )
      }</ul>
    </Layout>
  )
}

export default PageTemplate

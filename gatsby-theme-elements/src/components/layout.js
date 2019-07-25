import React from "react"
import { css, Global } from "@emotion/core"
import { Layout as StyledLayout, Header, Main, Container } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"

const Layout = ({ children }) => {
  const {
    site: {
      siteMetadata: {
        title,
        // description
      }
    }
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <StyledLayout>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <Header>
        <span>{title}</span>
      </Header>
      <Main>
        <Container>{children}</Container>
      </Main>
    </StyledLayout>
  )
}

export default Layout

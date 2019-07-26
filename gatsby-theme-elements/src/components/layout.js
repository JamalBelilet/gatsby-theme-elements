import React from "react"
import { css, Global } from "@emotion/core"
import { Layout as StyledLayout, Main, Container } from "theme-ui"
import Header from './header'

const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <Header/>
      <Main>
        <Container>{children}</Container>
      </Main>
    </StyledLayout>
  )
}

export default Layout

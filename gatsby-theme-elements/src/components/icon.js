import React from 'react'
import { graphql, useStaticQuery } from "gatsby"
// import { Icon as StyledIcon } from "theme-ui"
import { Styled } from 'theme-ui'

const Icon = ({name, size=21}) => {
  const {
    allFile: {
      edges: icons
    },
  } = useStaticQuery(graphql`
    query {
      allFile(filter:{sourceInstanceName:{eq:"icons"}}) {
        edges {
          node {
            name
            publicURL
          }
        }
      }
    }
  `)
  const { publicURL } = icons.filter(({ node }) => node.name === name)[0].node
  return (
    <Styled.img
      src={publicURL}
      style={{ width: size, height: size}}
    />
  )
}

export default Icon

import React from 'react'
import { Header as StyledHeader, Styled } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import Icon from './icon';


const Header = () => {
  const {
    imageOne: {
      publicURL: elements
    },
    site: {
      siteMetadata: {
        title,
        description
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
      imageOne: file(relativePath: {eq: "elements.png"}) {
        publicURL
      }
    }
  `)

  return (
    <StyledHeader>
      <div>
        <Icon name={'instagram'} />
        <img
          style={{
            height: '41px',
            marginLeft: '5px',
          }}
          src={elements}
        />
      </div>
      <input type="search" placeholder="Search"/>
      <nav>
        <Icon name={'safari'} />
        <Icon name={'like'} />
        <Icon name={'user'} />
      </nav>
    </StyledHeader>
  )
}

export default Header

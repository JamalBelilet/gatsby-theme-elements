import React from 'react'
import { Header as StyledHeader, Styled } from "theme-ui"
import { graphql, useStaticQuery, Link } from "gatsby"
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
        <Link to="/">
      <div>
          <Icon name={'instagram'} />
          <img
            style={{
              height: '31px',
              marginLeft: '3px',
            }}
            src={elements}
          />
      </div>
        </Link>
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

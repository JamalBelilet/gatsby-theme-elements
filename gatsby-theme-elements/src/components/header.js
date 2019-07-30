import React from 'react'
import { Header as StyledHeader } from "theme-ui"
import { Link } from "gatsby"
import Icon from './icon';
import Search from "./search"

const searchIndices = [
  // { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
  { name: `Articles`, title: `Articles`, hitComp: `ArticleHit` },
]

const Header = () => {

  return (
    <div>
      <StyledHeader>
        <Link to="/" style={{textDecoration: 'none'}}>
        <div>
            {/* <Icon name={'instagram'} /> */}
            <p style={{
              border: '1px solid #003ee6',
              boxShadow: '5px 6px 0px #0030b3',
              margin: '0',
              color: '#003ee6',
              fontWeight: '300',
              padding: '0 8px',
              fontSize: '16px',
            }}><span style={{ fontWeight: '900', fontSize: '18px',}}>E</span>lements</p>
        </div>
          </Link>
        <Search collapse indices={searchIndices} />
        <nav>
          <Link style={{height: '21px'}}><Icon name={'twitter'} /></Link>
          <Link style={{height: '21px'}}><Icon name={'github'} /></Link>
          <Link style={{height: '21px'}}><Icon name={'instagram'} /></Link>

          <Link style={{textDecoration: 'none', marginLeft: '8px'}}>
            {/* <Icon name={'instagram'} /> */}
            <p style={{
              border: '1px solid #003ee6',
              boxShadow: '5px 6px 0px #0030b3',
              margin: '0',
              color: '#003ee6',
              fontWeight: '300',
              padding: '0 8px',
              fontSize: '16px',
            }}>Bluish</p>
          </Link>
        </nav>
      </StyledHeader>
    </div>
  )
}

export default Header

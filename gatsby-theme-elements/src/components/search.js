import React, { useState, useEffect, createRef } from "react"
import { Link } from "gatsby"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
  Highlight,
  connectSearchBox
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import { Algolia } from "styled-icons/fa-brands";
import styled, { css } from "styled-components"
import { Container } from "theme-ui";


const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useClickOutside(ref, () => setFocus(false))
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      {
        query.length > 0 && focus &&
        <div style={{
          backgroundColor: 'white',
          display: 'block',
          position: 'absolute',
          right: 0,
          maxHeight: '80vh',
          overflow: 'scroll',
          zIndex: '2',
          top: 'calc(100% + 0.5em)',

          border: '1px solid #003ee6',
          boxShadow: '5px 6px 0px #0030b3',

        }}>
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              <Container style={{ padding: '8px', fontSize: '14px', minWidth: '214px'}}>
                <Results >
                  <Hits hitComponent={ArticleHit(() => setFocus(false))} />
                </Results>
              </Container>
            </Index>
          ))}
          <PoweredBy />
        </div>
      }
    </InstantSearch>
  )
}



const PoweredBy = () => (
  <div css="font-size: 0.6em; text-align: end; padding: 0 0 8px 0;">
    Powered by{` `}
    <a style={{padding: '0 4px'}} href="https://algolia.com">
      <Algolia size="1em" /> Algolia
    </a>
  </div>
)
export const Root = styled.div`
  position: relative;
`



const slugify = (str, basePath) => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
}

const ArticleHit = clickHandler => ({ hit }) => (
  <div style={{
    display: 'block',
    marginBottom: '16px'
  }}>
    <Link style={{
      textDecoration: 'none',
    }} to={`/` + slugify(hit.title, '/')} onClick={clickHandler}>
      <p style={{
        color: '#111',
        fontSize: '14px',
        padding: 0,
        margin: 0,
      }}>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </p>
    </Link>
    <p style={{
      color: '#333',
      fontSize: '10px',
      padding: 0,
      margin: 0,
    }}>
      <Highlight attribute="date" hit={hit} tagName="mark" />
    </p>
  </div>
)

const Input = connectSearchBox(({ refine, ...rest }) => (
  <input
    type="text"
    placeholder="Search"
    aria-label="Search"
    onChange={e => refine(e.target.value)}
    {...rest}
  />
))

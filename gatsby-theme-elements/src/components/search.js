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
          backgroundColor: 'green',
          display: 'block',
          position: 'absolute',
          right: 0,
          maxHeight: '80vh',
          overflow: 'scroll',
          zIndex: '2',
          top: 'calc(100% + 0.5em)',
        }}>
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              <div style={{
                backgroundColor: 'blue',
                display: 'block',
              }}>
                <Results >
                  <Hits hitComponent={ArticleHit[hitComp](() => setFocus(false))} />
                </Results>
              </div>
            </Index>
          ))}
          <PoweredBy />
        </div>
      }
    </InstantSearch>
  )
}



const PoweredBy = () => (
  <span css="font-size: 0.6em; text-align: end; padding: 0;">
    Powered by{` `}
    <a href="https://algolia.com">
      <Algolia size="1em" /> Algolia
    </a>
  </span>
)

const Root = ({children}) => (
  <div>{children}</div>
)


const slugify = (str, basePath) => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
}

const ArticleHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={`/` + slugify(hit.title, '/')} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Highlight attribute="date" hit={hit} tagName="mark" />
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

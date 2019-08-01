import React from "react"
// import { Styled } from "theme-ui"
import Layout from "../components/layout"
import { useStaticQuery, graphql, Link } from 'gatsby'
import StyledArticle from "../components/styled-article";

const PageTemplate = ({
  pageContext: {
    articles: pages,
    tags,
    tag: selectedTag,
  },
}) => {
  const {
    allFile: {
      edges: images
    },
    allStory: {
      edges: stories
    }
  } = useStaticQuery(graphql`
    query {
      allFile(filter:{sourceInstanceName:{eq:"images"}}) {
        edges {
          node {
            name
            publicURL
          }
        }
      },
      # allMarkdownRemark(
      #   sort: {order:DESC, fields: [frontmatter___date]}
      # ) {
      #   edges {
      #     node {
      #       rawMarkdownBody
      #       wordCount {
      #         words
      #       }
      #       excerpt
      #       frontmatter {
      #         title
      #         date
      #         tags
      #         image {
      #           publicURL
      #         }
      #       }
      #     }
      #   }
      # }
      allStory {
        edges {
          node {
            caption
            id
            image
          }
        }
      }
    }
  `)


  const getImageUrl = (name) => (images.filter(({ node }) => node.name === name)[0].node).publicURL

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <div
          style={{
            width: '65%',
            marginTop: '15px',
          }}
        >{
          pages.map(
            ({ node }) => (
              <StyledArticle {...node} tag={selectedTag}/>
            )
          )
        }</div>
        <div
          style={{
            width: 'calc(35% - 25px)',
            minHeight: '95vh',
            marginTop: '15px',
          }}
        >
          {/* <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <img style={{
              boxSizing: 'border-box',
              border: '1px solid #003ee6',
              padding: '2px',
              backgroundColor: '#fff',
              width: '58px',
              height: '58px',
              borderRadius: '58px',
              objectFit: 'cover',
            }} src={publicURL} alt=""/>
            <div style={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginLeft: '10px',
            }}>
              <p style={{
                margin: '0',
                color: '#262626',
                fontWeight: '600',
                fontSize: '14px',
              }}>JamalBelilet</p>
              <p style={{
                margin: '0',
                color: '#999',
                fontSize: '12px',
              }}>Djamaleddine Belilet</p>
            </div>
          </div> */}
          <div style={{
            borderRadius: '3px',
            // border: '1px solid #e6e6e6',

            border: '1px solid #003ee6',
            boxShadow: '5px 6px 0px #0030b3',

            backgroundColor: 'white',
            marginBottom: '54px',
            height: '40vh',
            margin: '0 0 15px 0',
            overflow: 'scroll',
          }}>
            <p style={{
              margin: 0,
              padding: '8px 16px',
              color: '#003569',
              textDecoration: 'none',
              fontSize: '14px',
              textTransform: 'uppercase',
              boxSizing: 'border-box',
              lineHeight: '24px',
            }}>#hot_stories</p>
            {
              stories.map(({ node: { id, caption, image } }, index) => (
                <Link key={id} style={{
                  textDecoration: 'none',
                  height: `calc(calc(100% - 46px) / ${stories.length })`,
                  width: '100%',
                  backgroundColor: index % 2 == 0 ? '#eee' : '#fff',
                  borderRadius: index === (stories.length - 1) ? '0 0 3px 3px' : '0px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: '0 16px',
                  boxSizing: 'border-box',
                  minHeight: '10vh',
                }}>
                  <img style={{
                    border: '1px solid #003ee6',
                    boxShadow: '5px 6px 0px #0030b3',
                  }} src={getImageUrl(image)} alt={image} />
                  <p style={{
                    margin: '0 0 0 16px',
                    color: '#003569',
                    fontSize: '11px',
                    fontWeight: '400',
                    lineHeight: 1.4,
                    textTransform: 'capitalize',
                    paddingRight: '3px',

                  }}>{caption}</p>
                </Link>
              ))
            }
          </div>
          <div style={{
            borderRadius: '3px',
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems:'center',
            margin: '15px 0',
            justifyContent: 'center',
            // border: '1px solid #e6e6e6',
            border: '1px solid #003ee6',
            boxShadow: '5px 6px 0px #0030b3',
            backgroundColor: 'white',
            height: '28vh',
            padding: '16px',
            boxSizing: 'border-box',
          }}>
            {tags
              .map(
                tag =>
                  <Link to={`/tags/${tag}`} style={{
                    color: '#003569',
                    textDecoration: 'none',
                    padding: '0 2px',
                    fontSize: '14px',
                    margin: '0 4px',
                    border: `1px solid ${selectedTag == tag ? '#003ee6' : 'transparent'}`,
                    boxShadow: selectedTag == tag && '5px 6px 0px #0030b3',
                  }}>#{tag}</Link>
              )}
          </div>

          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            marginTop: '16px',
          }}>
            {
              [
                'About', 'Contact', 'Github', 'Privacy', 'Terms', 'Language',
              ].map(link => <Link
                to="#"
                style={{
                  color: '#c7c7c7',
                  fontSize: '11px',
                  fontWeight: '400',
                  lineHeight: 1.8,
                  textTransform: 'capitalize',
                  paddingRight: '3px',
                  textDecoration: 'none',
                }}>{link} .</Link>)
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageTemplate

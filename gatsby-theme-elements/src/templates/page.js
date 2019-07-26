import React from "react"
// import { Styled } from "theme-ui"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from 'gatsby'
import StyledArticle from "../components/styled-article";

const PageTemplate = ({ pageContext }) => {
  const {
    imageOne: {
      publicURL
    },
    allMarkdownRemark: {
      edges: pages
    }
  } = useStaticQuery(graphql`
    query {
      imageOne: file(relativePath: {eq: "jamal.jpg"}) {
        publicURL
      }
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
              image {
                publicURL
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      {/* <Styled.h1>{pageContext.heading}</Styled.h1> */}
      {/* <div dangerouslySetInnerHTML={{ __html: pageContext.content }} /> */}
      {/* <pre>{JSON.stringify(pages, 2, null)}</pre> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <div
          style={{
            width: '65%',
            marginTop: '15px'
          }}
        >{
          pages.map(
            ({ node }) => (
              <StyledArticle {...node}/>
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
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <img style={{
              boxSizing: 'border-box',
              border: '1px solid #efefef',
              padding: '2px',
              backgroundColor: '#fff',
              width: '58px',
              height: '58px',
              borderRadius: '58px',
              objectFit: 'cover',
            }} src={publicURL}/>
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
          </div>
          <div style={{
            borderRadius: '3px',
            border: '1px solid #e6e6e6',
            backgroundColor: 'white',
            marginBottom: '54px',
            height: '31vh',
            margin: '15px 0',
          }}/>
          <div style={{
            borderRadius: '3px',
            border: '1px solid #e6e6e6',
            backgroundColor: 'white',
            marginBottom: '54px',
            height: '27vh',
            margin: '15px 0',
          }}/>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
          }}>
            {
              [
                'About', 'Support', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Directory', 'Profiles', 'Hashtags', 'Language',
              ].map(link => <div
                style={{
                  color: '#c7c7c7',
                  fontSize: '11px',
                  fontWeight: '400',
                  lineHeight: 1.8,
                  textTransform: 'capitalize',
                  paddingRight: '3px'
                }}>{link} .</div>)
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PageTemplate

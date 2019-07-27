import React from 'react'
import Layout from "../components/layout"
import { graphql, Link } from 'gatsby';
import Icon from '../components/icon';

export const query = graphql`
  query ($articleId: String!) {
    markdownRemark(id: {eq:$articleId}) {
      html
      frontmatter {
        title
        tags
        date
        read
      }
    }
  }
`

const Article = ({
  data: {
    markdownRemark: { html, frontmatter: { title, tags, date, read } }
  },
  pageContext: {
    prev,
    next
  }
}) => {
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',

          border: '1px solid #003ee6',
          boxShadow: '5px 6px 0px #0030b3',
          marginTop: '15px',
        }}>
        <div
          style={{
            width: '65%',
            height: '100%',
          }}>
          <div
            style={{
              borderRight: '1px solid #003ee6',
              backgroundColor: 'white',
              padding: '16px 0',
              height: '100%',
              minHeight: '75vh',
            }}
          >
            <div style={{ padding: '0 16px' }}>
              <p style={{
                margin: 0,
                color: '#111',
              }}>{title}</p>
            </div>

            <div style={{ padding: '0 16px', fontSize: '14px' }}
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <div style={{ padding: '0 16px' }}>
              <p style={{
                fontSize: '14px',
              }}>{
                  tags.map(
                    tag => {
                      return <Link to={`/tags/${tag}`} style={{
                        color: '#003569',
                        textDecoration: 'none',
                        padding: '0 2px',
                        fontSize: '14px',
                        margin: '0 4px',
                        border: `1px solid transparent`,
                      }}>#{tag}</Link>
                    }
                  )
                }</p>
            </div>
            <div style={{ padding: '0 16px' }}>
              <p style={{
                fontSize: '10px',
              }}>{date}</p>
            </div>

          </div>
        </div>
        <div
          style={{
            width: 'calc(35%)',
            // marginTop: '15px',
          }}>
          <div style={{
            borderRadius: '3px',
            // border: '1px solid #e6e6e6',

            // border: '1px solid #003ee6',
            // boxShadow: '5px 6px 0px #0030b3',

            backgroundColor: 'white',
            marginBottom: '54px',
            // height: '100%',
            // margin: '15px 0',
            height: '100%',
            display: 'flex',
            flexFlow: 'column nowrap',
          }}>
            <div
              style={{
                width: '100%',
                border: '0',
                padding: '15px 16px',
                borderBottom: '1px solid #003ee6',
                boxSizing: 'border-box',
                fontSize: '14px',
                display: 'flex',
              }}
              placeholder="Add a comment..."
            >
              <div style={{ flex: 1 }}>
                <p style={{
                  margin: 0,
                  marginTop: '8px',
                  color: '#111',
                  lineHeight: 1,
                  fontSize: '12px',
                  fontWeight: '500',
                }}>{read} min read</p>
              </div>
              <a href='#' style={{
                backgroundColor: '#003ee6',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '3px',
                fontSize: '14px',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}>save</a>
            </div>
            <div style={{flex: 1}}/>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
              {
                prev &&
                <li>
                  <Link style={{
                    textDecoration: 'none',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }} to={prev.slug}>
                    <div style={{
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Icon name="back" size={16} />
                    </div>
                    <div style={{width: '15px'}}></div>
                    <div style={{ flex: 1, overflow: 'hidden'}}>
                      <p style={{
                        margin: 0,
                        color: '#111',
                        lineHeight: 1,
                        fontSize: '14px',

                        whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      display: 'inherit',
                                            }}>
                        {prev.node.frontmatter.title}
                      </p>
                      <p style={{
                        margin: 0,
                        marginTop: '8px',
                        color: '#111',
                        lineHeight: 1,
                        fontSize: '10px',
                      }}>
                        {prev.node.frontmatter.read} min read
                      </p>
                    </div>
                  </Link>
                </li>
              }
              {
                next &&
                <li>
                  <Link style={{
                    textDecoration: 'none',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }} to={next.slug}>
                    <div>
                      <p style={{
                        margin: 0,
                        color: '#111',
                        lineHeight: 1,
                        fontSize: '14px',
                      }}>
                        {next.node.frontmatter.title}
                      </p>
                      <p style={{
                        margin: 0,
                        marginTop: '8px',
                        color: '#111',
                        lineHeight: 1,
                        fontSize: '10px',
                      }}>
                        {next.node.frontmatter.read} min read
                      </p>
                    </div>
                    <div style={{ width: '15px' }}></div>

                    <div style={{
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Icon name="next" size={16}/>
                    </div>
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '75px 0 15px 0',
      }}>
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          flex: 1,
        }}>
          {
            [
              'About', 'Contact', 'Github', 'Privacy', 'Terms', 'Language',
            ].map(link => <Link
              to="#"
              style={{
                color: '#003569',
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: 1.8,
                textTransform: 'uppercase',
                marginRight: '24px',
                textDecoration: 'none',
              }}>{link}</Link>)
          }
        </div>
        <p style={{
          margin: 0,
          padding: 0,
          fontSize: '12px',
          color: '#999',
          fontWeight: '500',
        }}>&copy; 2019 ELEMENTS</p>
      </div>
    </Layout>
  )
}

export default Article

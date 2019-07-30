import React from 'react'
import { Link } from 'gatsby';

const slugify = str => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  return `/${'/'}/${slug}`.replace(/\/\/+/g, '/');
}
const readingTime = (words) => {
  const wordsPerMinute = 200;
  const minutes = words / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return `${readTime} min read`;
}
const StyledArticle = ({
    wordCount: {
      words
    },
    excerpt,
    frontmatter: {
      title,
      date,
      path,
      tags,
      image: {
        publicURL
      }
    },
    tag: selectedTag,
  }) => {
  return (
    <div
      style={{
        borderRadius: '3px',
        // border: '1px solid #e6e6e6',

        border: '1px solid #003ee6',
        boxShadow: '5px 6px 0px #0030b3',

        backgroundColor: 'white',
        marginBottom: '54px'
      }}
    >
      <div style={{padding: '0 16px'}}>
        <p><Link to={slugify(title)} style={{
          textDecoration: 'none',
          color: '#111',
        }}>{title}</Link></p>
      </div>

      {/* <div style={{ padding: '0' }}>
        <img style={{
          width: '100%',
          height: '350px',
          objectFit: 'cover',
        }} src={publicURL} alt={publicURL} />
      </div> */}
      <div style={{ padding: '0 16px' }}>
        <p style={{
          fontSize: '14px',
        }}>{excerpt}</p>
      </div>
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
                border: `1px solid ${selectedTag == tag ? '#003ee6' : 'transparent'}`,
                boxShadow: selectedTag == tag && '5px 6px 0px #0030b3',
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
      <div
        style={{
          width: '100%',
          border: '0',
          padding: '15px 16px',
          borderTop: '1px solid #003ee6',
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
          }}>{readingTime(words)}</p>
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
    </div>
  )
}

export default StyledArticle

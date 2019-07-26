import React from 'react'
import { Link } from 'gatsby';
import Icon from './icon';

const slugify = str => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  return `/${'/'}/${slug}`.replace(/\/\/+/g, '/');
}
const StyledArticle = ({
    excerpt,
    frontmatter: {
      title,
      date,
      path,
      tags,
      image: {
        publicURL
      }
    }
  }) => {
  return (
    <div
      style={{
        borderRadius: '3px',
        border: '1px solid #e6e6e6',
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

      <div style={{ padding: '0' }}>
        <img style={{
          width: '100%',
          height: '650px',
          objectFit: 'cover',
        }} src={publicURL} />
      </div>
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
            tag => <span style={{
              paddingRight: '5px',
              color: '#003569'
            }}>{`#${tag}`}</span>
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
          borderTop: '1px solid #efefef',
          boxSizing: 'border-box',
          fontSize: '14px',
          display: 'flex',
        }}
        placeholder="Add a comment..."
      >
        <Icon name={'like'} />
        <Icon name={'upload'} />
        <div style={{flex: 1}}></div>
        <Icon name={'bookmark'} />
      </div>
    </div>
  )
}

export default StyledArticle

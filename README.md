# Gatsby Theme Elements

This is a Gatsby theme built for [Theme Jam](https://themejam.gatsbyjs.org).

See the [live demo](https://gatsby-theme-element-jm.netlify.com/)

## Installation

To use this theme in your Gatsby sites, follow these instructions:

1.  Install the theme
    ```sh
    npm install --save gatsby-theme-elemetns
    ```

2.  Add the theme to your `gatsby-config.js`:
    ```js
    module.exports = {
      plugins: [
        'gatsby-theme-elements'
      ]
    }
    ```

4. Create src/articles/ folder for .md articles with the following frontmatter

  \-\-\-
  date: "2019-06-23"
  title: "Quis ad eiusmod qui irure"
  tags: ['javascript', 'webdev', 'tutorial', 'node', 'career', 'css']
  image: "./images/index.jpg"
  \-\-\-


5. Create src/stories/stories.yaml with the following structure

\- caption: 'Develop React or React native with backend Nodejs Laravel'
  image: 'react'

\- caption: 'Create a Gatsby website connected to a headless CMS'
  image: 'gatsby'

\- caption: 'Develop iOS and Android app using Flutter with back end'
  image: 'flutter'

6.  Start your site
    ```sh
    gatsby develop
    ```


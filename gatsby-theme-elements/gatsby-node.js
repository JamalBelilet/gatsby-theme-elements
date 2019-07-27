const fs = require('fs');
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'articles';

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
}

const slugify = (str, basePath) => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || '/';
  // const tagPageTemplate = require.resolve('./src/templates/tag.js');


  const $response = await graphql(`
    query {
      allMarkdownRemark(
        sort: {order:DESC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              date
              tags
              read
              image {
                publicURL
              }
            }
          }
        }
      }
    }
  `);

  if ($response.errors) {
    reporter.panic('error loading articles', reporter.errors);
    return;
  }

  const articles = $response.data.allMarkdownRemark.edges;

  const articlesByTag = {}
  articles.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(
        tag => {
          if (!articlesByTag[tag]) {
            articlesByTag[tag] = [];
          }
          articlesByTag[tag].push({ node });
        }
      )
    }
  })
  const tags = Object.keys(articlesByTag)

  actions.createPage({
    path: basePath,
    component: require.resolve("./src/templates/page.js"),
    context: {
      heading: "",
      content: "",
      tags: tags.sort(),
    },
  })

  articles.forEach(({ node: { id, frontmatter: { title } } }, index) => {
    const slug = slugify(title, basePath);
    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/article.js'),
      context: {
        articleId: id,
        slug: slug,
        prev: index == 0 ? null : {
          slug: slugify(articles[index - 1].node.frontmatter.title, basePath),
          node: articles[index - 1].node
        },
        next: index == (articles.length - 1) ? null : {
          slug: slugify(articles[index + 1].node.frontmatter.title, basePath),
          node: articles[index + 1].node
        },
      }
    });
  });

  tags.forEach((tag) => {
    const articles = articlesByTag[tag];

    actions.createPage({
      path: `/tags/${tag}`,
      component: require.resolve('./src/templates/tag.js'),
      context: {
        articles,
        tag,
        tags
      }
    });
  });
}

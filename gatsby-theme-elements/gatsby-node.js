const fs = require('fs');
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'articles';

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || '/';

  actions.createPage({
    path: basePath,
    component: require.resolve("./src/templates/page.js"),
    context: {
      heading: "",
      content: "",
    },
  })

  const $response = await graphql(`
    query {
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: ASC}) {
        edges {
          node {
            id
            frontmatter {
              title
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

  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
  }

  articles.forEach(({ node: { id, frontmatter: { title } } }, index) => {
    const slug = slugify(title);
    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/article.js'),
      context: {
        articleId: id,
        slug: slug,
        prev: index == 0 ? null : {
          slug: slugify(articles[index - 1].node.frontmatter.title),
          node: articles[index - 1].node
        },
        next: index == (articles.length - 1) ? null : {
          slug: slugify(articles[index + 1].node.frontmatter.title),
          node: articles[index + 1].node
        },
      }
    });
  });
}

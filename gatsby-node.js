const _ = require('lodash');
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);
  const blogList = path.resolve(`./src/templates/blog-list.tsx`);
  const tagTemplate = path.resolve(`./src/templates/tags.tsx`);

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
          tag: post.node.frontmatter.tags,
        },
      });
    });

    // Create blog post list pages
    const postsPerPage = 6;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/page/1` : `/page/${i + 1}`,
        component: blogList,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, (edge) => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach((tag) => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      });
    });

    return null;
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    if (typeof node.frontmatter.slug !== 'undefined') {
      createNodeField({
        node,
        name: 'slug',
        value: node.frontmatter.slug,
      });
    } else {
      const value = createFilePath({ node, getNode });
      createNodeField({
        node,
        name: 'slug',
        value,
      });
    }
  }
};

// for React-Hot-Loader: react-🔥-dom patch is not detected
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig();
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    };
  }
};

// // for instagram graphql api
// exports.sourceNodes = async ({ actions }) => {
//   const { createNode } = actions;

//   // fetch raw data from the instagram basic display api
//   const fetchInstagramPhotos = () =>
//     axios.get(
//       `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
//     );
//   // await for results
//   const res = await fetchInstagramPhotos();

//   // map into these results and create nodes
//   res.data.data.map((photo, i) => {
//     // Create your node object
//     const igPhotoNode = {
//       // Required fields
//       id: `${i}`,
//       parent: `__SOURCE__`,
//       internal: {
//         type: `InstagramPhoto`, // name of the graphQL query --> allInstagramPhoto {}
//         // contentDigest will be added just after
//         // but it is required
//       },
//       children: [],
//       id: photo.id,
//       caption: photo.caption,
//       media_url: photo.media_url,
//       media_type: photo.media_type,
//       permalink: photo.permalink,
//     };

//     // Get content digest of node. (Required field)
//     const contentDigest = crypto
//       .createHash(`md5`)
//       .update(JSON.stringify(igPhotoNode))
//       .digest(`hex`);
//     // add it to igPhotoNode
//     igPhotoNode.internal.contentDigest = contentDigest;

//     // Create node with the gatsby createNode() API
//     createNode(igPhotoNode);
//   });

//   return;
// };

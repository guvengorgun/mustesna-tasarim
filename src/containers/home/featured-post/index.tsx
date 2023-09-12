import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import FeaturedCard from '../../../components/featured-card/featured-card';
import {
  FeaturedPostWrapper,
  FeaturedPostRow,
  FeaturedPostCol,
  SecTitle,
} from './style';

type FeaturedPostsProps = {};

const FeaturedPosts: React.FunctionComponent<FeaturedPostsProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 3
      ) {
        totalCount
        edges {
          node {
            excerpt(pruneLength: 150)
            fields {
              slug
              readingTime {
                text
              }
            }
            frontmatter {
              date(formatString: "MMM DD, YYYY")
              title
              description
              tags
              cover {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
        }
      }
    }
  `);

  const Posts = Data.allMarkdownRemark.edges;

  return (
    <FeaturedPostWrapper>
      <SecTitle>Öne Çıkanlar</SecTitle>
      <FeaturedPostRow>
        {Posts.map(({ node }: any) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <FeaturedPostCol key={title}>
              <FeaturedCard
                title={title}
                image={
                  node.frontmatter.cover == null
                    ? null
                    : node.frontmatter.cover.childImageSharp.gatsbyImageData
                }
                url={node.fields.slug}
                tags={node.frontmatter.tags}
                description={node.excerpt}
              />
            </FeaturedPostCol>
          );
        })}
      </FeaturedPostRow>
    </FeaturedPostWrapper>
  );
};

export default FeaturedPosts;

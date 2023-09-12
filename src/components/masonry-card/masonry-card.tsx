import * as React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import GatsbyImage from '../gatsby-image';
import {
  MasonryCardWrapper,
  PostPreview,
  PostDetails,
  PostDate,
  PostTitle,
  PostTags,
  PostMeta,
  ReadingTime,
  ReadMore,
} from './masonry-card.style';
import { IoIosArrowForward } from 'react-icons/io';

interface MasonryCardProps {
  image?: any;
  title: string;
  url: string;
  date?: string;
  tags?: [];
  className?: string;
  readTime?: string;
}

const MasonryCard: React.FunctionComponent<MasonryCardProps> = ({
  image,
  title,
  url,
  date,
  tags,
  className,
  readTime,
  ...props
}) => {
  // Add all classs to an array
  const addAllClasses = ['mesonry_card'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <MasonryCardWrapper className={addAllClasses.join(' ')} {...props}>
      {image == null ? null : (
        <PostPreview className="post_preview">
          <Link to={url}>
            <GatsbyImage src={image} alt="post preview" />
          </Link>
        </PostPreview>
      )}

      <PostDetails className="post_details">
        {/*<PostMeta>
          {date && (
            <PostDate
              dangerouslySetInnerHTML={{
                __html: date,
              }}
              className="post_date"
            />
          )}
          {readTime && <ReadingTime>{readTime}</ReadingTime>}
          {tags == null ? null : (
            <PostTags className="post_tags">
              {tags.map((tag: string, index: number) => (
                <Link key={index} to={`/tags/${_.kebabCase(tag)}/`}>
                  {`#${tag}`}
                </Link>
              ))}
            </PostTags>
          )}
        </PostMeta>*/}

        <PostTitle className="post_title">
          <Link to={url}>{title}</Link>
        </PostTitle>
        <ReadMore>
          <Link to={url}>
            Gözat <IoIosArrowForward />
          </Link>
        </ReadMore>
      </PostDetails>
    </MasonryCardWrapper>
  );
};

export default MasonryCard;

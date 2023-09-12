import * as React from 'react';
import {
  InstagramGridWrapper,
  PostImage,
  Overlay,
} from './instagram-grid.style';

type InstagramGridProps = {
  image: string;
  alt?: string;
  url: string;
};

const InstagramGrid: React.FunctionComponent<InstagramGridProps> = ({
  image,
  alt,
  url,
}) => {
  return (
    <InstagramGridWrapper>
      <a href={url}>
        <Overlay />
        <PostImage>
          <img src={image} alt={alt || 'instagram-image'} />
        </PostImage>
      </a>
    </InstagramGridWrapper>
  );
};

export default InstagramGrid;

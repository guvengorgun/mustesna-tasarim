import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SocialProfile from '../../../components/social-profile/social-profile';
import {
  IntroWrapper,
  IntroTitle,
  Desciption,
  BgText,
  HeroWrapper,
  IntroContentWrapper,
} from './style';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoGithub,
} from 'react-icons/io';
import GatsbyImage from "../../../components/gatsby-image";

type IntroProps = {};

const SocialLinks = [
  {
    icon: <IoLogoFacebook />,
    url: '#',
    tooltip: 'Facebook',
  },
  {
    icon: <IoLogoInstagram />,
    url: '#',
    tooltip: 'Instagram',
  },
  {
    icon: <IoLogoTwitter />,
    url: '#',
    tooltip: 'Twitter',
  },
  {
    icon: <IoLogoGithub />,
    url: '#',
    tooltip: 'Github',
  },
];

const Intro: React.FunctionComponent<IntroProps> = (props) => {
  const Data = useStaticQuery(graphql`
    query {
      heroImage: file(absolutePath: { regex: "/zho-small.png/" }) {
        childImageSharp {
          gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      site {
        siteMetadata {
          author
          about
        }
      }
    }
  `);

  const { about } = Data.site.siteMetadata;

  return (
    <IntroWrapper>
      {/*<BgText>ABOUT</BgText>*/}
      <HeroWrapper>
        <GatsbyImage src={Data.heroImage.childImageSharp.gatsbyImageData} alt="hero" />
      </HeroWrapper>
      <IntroContentWrapper>
        <IntroTitle>Esra harika bir insan!</IntroTitle>
        <Desciption>{about}</Desciption>
        <SocialProfile items={SocialLinks} />
      </IntroContentWrapper>
    </IntroWrapper>
  );
};

export default Intro;

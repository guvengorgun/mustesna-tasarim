import React from "react";
import PropTypes from "prop-types";
import {GatsbyImage} from "gatsby-plugin-image";
import {Link} from "gatsby";

export default function FullScreenImage(props) {
  const {
    // height = 900,
    img,
    title,
    subheading,
    imgPosition = "center",
    links
  } = props;

  return (
    <React.Fragment>
      <div
        className="margin-top-0"
        style={{
          display: "grid",
          alignItems: "start",

        }}
      >
        {img?.url ? (
          <img
            src={img}
            objectFit={"cover"}
            objectPosition={imgPosition}
            style={{
              gridArea: "1/1",
              // You can set a maximum height for the image, if you wish.
              // height: height,
              height: '100vh',
              // opacity: 0.8,
              // background: "radial-gradient(ellipse 60% 400px, #80FFDB 10%, #5390D9 10%;"
              // width: "100%",
            }}
            // This is a presentational image, so the alt should be an empty string
            alt=""
          />
        ) : (
          <GatsbyImage
            image={img}
            objectFit={"cover"}
            objectPosition={imgPosition}

            style={{
              gridArea: "4/1",
              // You can set a maximum height for the image, if you wish.
              // maxHeight: height,
              height: '100vh',
              background: "radial-gradient(ellipse 60% 400px, #80FFDB 10%, #5390D9 50%, #5E60CE)",
            }}
            imgClassName="hero-image"
            // layout="fullWidth"
            // You can optionally force an aspect ratio for the generated image
            // aspectratio={3 / 1}
            // This is a presentational image, so the alt should be an empty string
            alt=""
            formats={["auto", "webp", "avif"]}
          />
        )}
        {(title || subheading) && (
          <div
            style={{
              // By using the same grid area for both, they are stacked on top of each other
              gridArea: "4/1",
              position: "relative",
              // This centers the other elements inside the hero component
              placeItems: "center",
              display: "grid",
              paddingTop: '10vh',
            }}
          >
            {/* Any content here will be centered in the component */}
            {title && (
              <h1
                className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                style={{
                  // boxShadow:
                  //   "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                  // backgroundColor: "rgb(255, 68, 0)",
                  color: '#fff',
                  lineHeight: "1",
                  padding: "0.25em",
                  fontFamily: "Aboreto, cursive",
                  letterSpacing: '0.3rem'
                }}
              >
                {title}
              </h1>
            )}
            {subheading && (
              <h3
                className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                style={{
                  // boxShadow:
                  //   "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                  // backgroundColor: "rgb(255, 68, 0)",
                  color: '#fff',
                  lineHeight: "1",
                  padding: "0.25rem",
                  marginTop: "0.5rem",
                  fontFamily: "Montserrat, sans-serif",
                  letterSpacing: '0.3rem'
                }}
              >
                {subheading}
              </h3>
            )}
            <div
              style={{
                marginTop: '56vh'
              }}
            >
              {links.map((link) => (
                <Link
                  to={link.url}
                  style={{
                    // boxShadow:
                    //   "rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px",
                    // backgroundColor: "rgb(255, 68, 0)",
                    color: '#fff',
                    lineHeight: "1",
                    padding: "2rem",
                    marginTop: "0.5rem",
                    fontFamily: "Montserrat, sans-serif",
                    letterSpacing: '0.2rem',
                    fontWeight: 600
                  }}
                >
                  {link.label}
                </Link>
              ))}

            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

FullScreenImage.propTypes = {
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  height: PropTypes.number,
  subheading: PropTypes.string,
};


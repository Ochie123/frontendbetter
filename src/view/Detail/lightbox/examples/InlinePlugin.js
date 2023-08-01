import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";


import { useQuery } from "react-query";
import { loadImages } from '../../../../data/api/api'
import { loadAuction } from '../../../../data/api/api'
import { useParams } from 'react-router-dom';

import { Box, Container, Typography, useMediaQuery } from "@mui/material"

export default function InlinePlugin() {
  const mobileDevice = useMediaQuery("(max-width:650px)")
  const { id } = useParams();
  const { data = { results: [] }} = useQuery("images", loadImages);
  const results = data.results;
  
  const { data: auction } = useQuery(["currentAuction", { id }], () =>
    loadAuction(id)
  );

  if (!auction) {
    return null;
  }
  //console.log(results)
  // Assuming you have the API response stored in a variable called 'images'
  const filteredImages = results.filter((image) => image.auction === auction.uuid);

  //console.log(filteredImages)
  //console.log(auction.images)

  
  //
  //
  const slides = filteredImages.map(({ src, key, image, images }) => ({
    src: `${image}`,
    key: `${image}`,
   
    srcSet: images?.map((image) => ({
      src: `${image}`,
    }))
  }));
  

  //
  

  //

  //console.log(slides)


  return (
    <>
      {mobileDevice ? (
        <Box>
          <Lightbox
            slides={slides}
            plugins={[Inline, Slideshow, Fullscreen, Video, Zoom]}
            inline={{
              style: {
                width: "100%",
                maxWidth: "auto",
                aspectRatio: "3 / 3",
              },
            }}
            renderHeader={({ currentIndex }) => (
              <div style={{ position: "absolute", top: 0, left: 0, padding: "8px" }}>
                <span>{slides[currentIndex].position}</span>
              </div>
            )}
          />
        </Box>
      ) : (
        <Lightbox
          slides={slides}
          plugins={[Inline, Slideshow, Fullscreen, Video, Zoom]}
          inline={{
            style: {
              width: "100%",
              maxWidth: "auto",
              aspectRatio: "3 / 2",
            },
          }}
          renderHeader={({ currentIndex }) => (
            <div style={{ position: "absolute", top: 0, left: 0, padding: "8px" }}>
              <span>{slides[currentIndex].position}</span>
            </div>
          )}
        />
      )}
    </>
  );
  
}

import * as React from "react";

import { useQuery } from "react-query";
import { loadProduct } from '../../../../data/api/api'
import { useParams } from 'react-router-dom';
import useCurrent from '../../../../../src/data/products/useCurrent'

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

import { LightboxButton, Paragraph, Link } from "../components";
//import slides from "../data/slides";

export default function FullscreenPlugin() {
  const [open, setOpen] = React.useState(false);
  const [auto, setAuto] = React.useState(false);

 
  const { id } = useParams();
  const seeAllProducts = useCurrent((state) => state.seeAllProducts);

  const { data: product } = useQuery(["currentProduct", { id }], () =>
    loadProduct(id)
  );

  if (!product) {
    return null;
  }
  //console.log(id)
  //console.log(product.images)

  const slides = product.images.map(({ src, key, image, images }) => ({
    src: `http://127.0.0.1:8000${image}`,
    key: `${image}`,
   
    srcSet: images?.map((image) => ({
      src: `http://127.0.0.1:8000${image}`,
    
    }))
  }));
  

  console.log(slides)

  const isFullscreenEnabled = () =>
    document.fullscreenEnabled ??
    document.webkitFullscreenEnabled ??
    document.mozFullScreenEnabled ??
    document.msFullscreenEnabled;

  return (
    <>
      <Lightbox
        open={open}
        fullscreen={auto}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Fullscreen]}
      />

      {isFullscreenEnabled() ? (
        <>
          <Paragraph>
            Fullscreen plugin adds the "fullscreen" button in browsers that
            support fullscreen mode.
          </Paragraph>

          <LightboxButton
            onClick={() => {
              setAuto(false);
              setOpen(true);
            }}
          />

          <Paragraph>
            The fullscreen mode can be requested automatically. However, this
            doesn't work in all browsers.
          </Paragraph>

          <LightboxButton
            onClick={() => {
              setAuto(true);
              setOpen(true);
            }}
          />
        </>
      ) : (
        <>
          <Paragraph>
            Fullscreen plugin doesn't work in some browsers (i.e. Safari on
            iPhone) or inside iframes.
          </Paragraph>

          <Paragraph>
            Please{" "}
            <Link
              href="https://9qvmif.csb.app/"
              target="_blank"
              rel="noreferrer noopener"
            >
              open this demo
            </Link>{" "}
            in a separate window or try a different browser.
          </Paragraph>
        </>
      )}
    </>
  );
}

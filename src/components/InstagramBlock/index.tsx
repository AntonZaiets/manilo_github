import React from "react";
import "./style.scss";

interface InstBlocks {
  images?: Array<{ src: string }>;
  countFrom?: number;
  countTo?: number;
  styleImg?: string;
}
const defaultImages = [
  { src: "/inst/1.jpg" },
  { src: "/inst/2.jpg" },
  { src: "/inst/3.jpg" },
  { src: "/inst/4.jpg" },
  { src: "/inst/5.jpg" },
  { src: "/inst/6.jpg" },
  { src: "/inst/7.jpg" },
  { src: "/inst/8.jpg" },
  { src: "/inst/9.jpg" },
  { src: "/inst/10.jpg" },
  { src: "/inst/11.jpg" },
  { src: "/inst/12.jpg" },
];
export const InstagramBlock = ({
  images = defaultImages,
  countFrom = 0,
  countTo = 8,
  styleImg,
}: InstBlocks) => {
  return (
    <div className="inst_block">
      <div className="inst_title">
        <a href="https://instagram.com/manilo_with_love" target="_blank">
          @manilo_with_love
        </a>
      </div>
      <div className="inst_block__collage">
        <div className="inst_block__photo">
          {images.slice(countFrom, countTo).map((image: { src: string }) => (
            <img className={styleImg} src={image.src} />
          ))}
        </div>
      </div>
    </div>
  );
};

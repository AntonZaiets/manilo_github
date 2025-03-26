import React from "react";
import { useMediaQuery } from "utils";

export const FooterBottom = () => {
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <footer className="footer">
      <div className="container between">
        <div className="footer_block">
          <a className="footer_politic">ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</a>
          {!isMobile && (
            <div className="footer_copyright">Copyright © 2023</div>
          )}
          <div className="logo_footer">
            <a href="" className="footer_link">
              <h1>Manilo</h1>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

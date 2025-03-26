import React, { useEffect, useState } from "react";
import { ArrowUp } from "images/icons";
import { scrollToTop } from "utils";
import "./style.scss";

export const ToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`to_top ${isVisible ? "active" : ""}`}
      onClick={scrollToTop}
    >
      <span>
        <ArrowUp fill="#c4b051" />
      </span>
    </button>
  );
};

export default ToTopButton;

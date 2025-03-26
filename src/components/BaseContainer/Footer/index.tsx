import React from "react";
import { FooterBottom } from "./FooterBottom";
import { Link } from "react-router-dom";
import { Routes } from "constants/routes";
import { Delivery, History, Home, InstagramIcon, Question } from "images/icons";
import { scrollToTop, useMediaQuery } from "utils";
//import { useAppSelector } from "store/hooks";
//import { selectUser } from "store/authSlice";

interface IFooterPart<T> {
  items?: Array<T>;
}

interface INavigation {
  label: string;
  link: string;
  icon?: any;
  customClick?: any;
}

const Navigation = (props: IFooterPart<INavigation>) => {
  return (
    <>
      {props.items.map(
        (item, index) =>
          item && (
            <div
              key={index}
              className="link"
              onClick={!!item.customClick ? item.customClick : scrollToTop}
            >
              <Link to={`/${item.link}`} className="footer_link__block">
                <div className="footer_link__icon">{item.icon}</div>
                {item.label}
              </Link>
            </div>
          )
      )}
    </>
  );
};

export const Footer = () => {
  const isTablet = useMediaQuery("(max-width: 768px)");
  //const user = useAppSelector(selectUser);

  return (
    <>
      <div className="footer_top">
        <div className="container">
          <div className="row content footer_content">
            <div className="footer__navigation">
              <h3 className="nav_head">Навігація</h3>
              <div className="block">
                <Navigation
                  items={[
                    {
                      label: "Головна",
                      link: Routes.base,
                      icon: <Home fill="#d7cdb9" />,
                    },
                    {
                      label: "Про нас",
                      link: Routes.aboutUs,
                      icon: <History fill="#d7cdb9" />,
                      customClick: () => {
                        window.scrollTo({
                          top: 1000,
                          behavior: "smooth",
                        });
                      },
                    },
                    {
                      label: "Доставка",
                      link: Routes.delivery,
                      icon: <Delivery fill="#d7cdb9" />,
                    },
                    {
                      label: "Питання",
                      link: Routes.questions,
                      icon: <Question fill="#d7cdb9" />,
                    },
                  ]}
                />
              </div>
            </div>

            <div className="contact_us">
              <h1 className="">Як зв'язатись з нами</h1>
              <div className="info_block">
                <div className="flex info">
                  {!isTablet && <span>01</span>}
                  <div className="info_text">
                    <div className="info_label">Телефон</div>
                    <div className="info_value">+38 (099) 915 75 73</div>
                  </div>
                </div>
                <div className="flex info">
                  {!isTablet && <span>02</span>}
                  <div className="info_text">
                    <div className="info_label">Email</div>
                    <div className="info_value">manilo.withlove@gmail.com</div>
                  </div>
                </div>
                <div className="flex info">
                  {!isTablet && <span>03</span>}
                  <div className="info_text">
                    <div className="info_label">Соціальні мережі</div>
                    <div className="info_value">
                      <a
                        href="https://instagram.com/manilo_with_love"
                        target="_blank"
                      >
                        <InstagramIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBottom />
    </>
  );
};

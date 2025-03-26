import React from "react";
import { scrollToTop, useMediaQuery, useScrollPosition } from "utils";
import { Routes } from "constants/routes";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ModalTypes } from "interface";
import { modalAction } from "components";
import { Basket, Heart, User } from "images/icons";
import { selectUser } from "store/authSlice";
import { MobileHeader } from "./MobileHeader";
import { useSelector } from "react-redux";
import { selectCartSlice } from "store/cartSlice";
// @ts-ignore
import logo from "images/logo1.png";

export const Head = () => {
  const scrollPosition = useScrollPosition();
  const dispatch = useAppDispatch();
  const headerScroll = scrollPosition >= 5 ? "header__is_scroll" : "";
  const scrollLight = scrollPosition >= 5 ? "header__scroll_light" : "";
  const { cart: isCartsInStorage } = useSelector(selectCartSlice);
  const isProductInHeart = JSON.parse(localStorage.getItem(`like`));
  const classes = `header between ${headerScroll}`;
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const isTextModalWhite = ["/catalog"].indexOf(pathname) > -1;

  const openChangeEnabledModal = () => {
    dispatch(modalAction("1", ModalTypes.LOGIN_REGISTER));
  };

  const isTablet = useMediaQuery("(max-width: 768px)");

  if (isTablet) {
    return <MobileHeader />;
  }

  return (
    <header className={classes} id="header">
      <div className="flex header_side_blocks">
        {/*<img src={logo} />*/}
        <div className="catalog">
          <button className="link">
            <div className="catalog_dots">
              <div
                className={`catalog_dots__top ${scrollLight} ${
                  isTextModalWhite && "header_white__text"
                }`}
              />
              <div
                className={`catalog_dots__bot ${scrollLight} ${
                  isTextModalWhite && "header_white__text"
                }`}
              />
            </div>
            <Link to={`/${Routes.catalog}`} onClick={scrollToTop}>
              <strong
                className={`header_link header__catalog_link ${scrollLight} ${
                  isTextModalWhite && "header_white__text"
                }`}
              >
                Каталог
              </strong>
            </Link>
          </button>
        </div>
      </div>
      <div>
        <Link
          to={`/${Routes.base}`}
          className={`logo ${scrollLight} ${
            isTextModalWhite && "header_white__text"
          }`}
          onClick={scrollToTop}
        >
          MANILO
        </Link>
      </div>

      <div className="flex header_side_blocks flexEnd">
        {user.isAuthorized && (
          <Link
            to={`/${Routes.admin}`}
            className={`header_link ${scrollLight}`}
            onClick={scrollToTop}
          >
            <div
              className={`add_close ${
                isTextModalWhite && "header_white__text"
              }`}
            >
              Кабінет
            </div>
          </Link>
        )}
        {/*<Link*/}
        {/*  to={`/${Routes.heart}`}*/}
        {/*  className={`header_link header_link__right ${scrollLight}`}*/}
        {/*>*/}
        {/*  <Heart*/}
        {/*    className={`${isProductInHeart?.length ? "heart_filled" : ""} ${*/}
        {/*      isTextModalWhite && "header_white__text"*/}
        {/*    }`}*/}
        {/*  />*/}
        {/*</Link>*/}
        <a
          onClick={openChangeEnabledModal}
          className={`header_link header_link__right ${scrollLight}`}
        >
          <User className={isTextModalWhite && "header_white__text"} />
        </a>
        <Link
          to={`/${Routes.basket}`}
          className={`header_link ${scrollLight}`}
          onClick={scrollToTop}
        >
          <Basket
            className={`${!!isCartsInStorage?.length ? "heart_filled" : ""} ${
              isTextModalWhite && "header_white__text"
            }`}
          />
        </Link>
      </div>
    </header>
  );
};

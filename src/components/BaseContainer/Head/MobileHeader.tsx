import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Routes } from "constants/routes";
import { scrollToTop, useScrollPosition } from "utils";
import { modalAction } from "components";
import { ModalTypes } from "interface";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Basket, Cross } from "images/icons";
import { useSelector } from "react-redux";
import { selectCartSlice } from "store/cartSlice";
import { selectUser } from "store/authSlice";

export const MobileHeader = () => {
  const scrollPosition = useScrollPosition();
  const dispatch = useAppDispatch();
  const headerScroll = scrollPosition >= 5 ? "header__is_scroll" : "";
  const scrollLight = scrollPosition >= 5 ? "header__scroll_light" : "";
  const classes = `header header_mobile flex ${headerScroll}`;
  const { pathname } = useLocation();
  const isTextModalWhite = ["/catalog"].indexOf(pathname) > -1;
  const { cart: isCartsInStorage } = useSelector(selectCartSlice);
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectUser);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    scrollToTop();
  };

  const openChangeEnabledModal = () => {
    dispatch(modalAction("1", ModalTypes.LOGIN_REGISTER));
  };

  return (
    <>
      <header className={classes}>
        <div className="flex">
          <div
            className={`menu-btn ${scrollLight} ${
              isTextModalWhite && "header_white__text"
            }`}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div>
          <NavLink
            to={`/${Routes.base}`}
            className={`logo logo_mobile ${scrollLight} ${
              isTextModalWhite && "header_white__text"
            }`}
          >
            MANILO
          </NavLink>
        </div>
        <div className="basket_modal">
          <Link
            to={`/${Routes.basket}`}
            className={`header_link ${scrollLight}`}
          >
            <Basket
              className={`${isCartsInStorage?.length ? "heart_filled" : ""} ${
                isTextModalWhite && "header_white__text"
              }`}
            />
          </Link>
        </div>
      </header>
      <div className={`nav-elements  ${isOpen && "active"}`}>
        <div className={`${isOpen ? "open" : "not_open"}`}>
          <div className="cross" onClick={toggleMenu}>
            <Cross />
          </div>
          <div className="login_mob">
            <a onClick={openChangeEnabledModal} className="login_mob__link">
              ВХІД
            </a>
          </div>
          <ul className="mob_menu">
            <NavLink
              to={`/${Routes.base}`}
              className={({ isActive }) =>
                `mob_menu__link ${isActive ? "active" : ""}`
              }
              onClick={toggleMenu}
            >
              <li>ГОЛОВНА</li>
            </NavLink>
            <NavLink
              to={`/${Routes.catalog}`}
              className={({ isActive }) =>
                `mob_menu__link ${isActive ? "active" : ""}`
              }
              onClick={toggleMenu}
            >
              <li>КАТАЛОГ</li>
            </NavLink>
            <NavLink
              to={`/${Routes.delivery}`}
              className={({ isActive }) =>
                `mob_menu__link ${isActive ? "active" : ""}`
              }
              onClick={toggleMenu}
            >
              <li>ДОСТАВКА</li>
            </NavLink>
            <NavLink
              to={`/${Routes.questions}`}
              className={({ isActive }) =>
                `mob_menu__link ${isActive ? "active" : ""}`
              }
              onClick={toggleMenu}
            >
              <li>ПИТАННЯ</li>
            </NavLink>
            {user.isAuthorized && (
              <NavLink
                to={`/${Routes.admin}`}
                className={({ isActive }) =>
                  `mob_menu__link ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                <li>Кабінет</li>
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

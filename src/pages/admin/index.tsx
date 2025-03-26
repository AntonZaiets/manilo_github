import React from "react";
import { Breadcrumbs } from "components";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "constants/routes";
import { NoData, AddProduct, Info } from "images/icons";
import { AddClothes, Order } from "pages";
import "./style.scss";

export const Admin = () => {
  const { pathname } = useLocation();
  const isAdd = pathname === Routes.adminAdd;
  const isOrder = pathname === Routes.adminOrder;
  const isInfo = pathname === Routes.adminInfo;

  return (
    <div className="product_page">
      <div className="container">
        <Breadcrumbs />
        <div className="admin">
          <h1 className="title_h1">Кабінет</h1>
          <div className="admin_page">
            <aside className="admin_sidebar">
              <div
                className={`admin_sidebar__block ${
                  isOrder && "admin_sidebar__active"
                }`}
              >
                <NoData fill="#3a3328" />
                <Link className="admin_sidebar__link" to={Routes.adminOrder}>
                  Замовлення
                </Link>
              </div>
              <div className="admin_sidebar__block">
                <AddProduct fill="#3a3328" />
                <Link className="admin_sidebar__link" to={Routes.adminAdd}>
                  Додати одяг
                </Link>
              </div>
              <div className="admin_sidebar__block">
                <Info fill="#3a3328" />
                <Link className="admin_sidebar__link" to={Routes.adminInfo}>
                  Інформація
                </Link>
              </div>
            </aside>
            <main className="admin_content">
              {isAdd && <AddClothes />}
              {isOrder && <Order />}
              {isInfo && <InfoAdmin />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoAdmin = () => {
  return (
    <div className="cabinet-content">
      <h1 className="about_title add_block__title">Інформація</h1>
    </div>
  );
};

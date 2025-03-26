import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import { BreadcrumbsArrow } from "images/icons";
import { Routes } from "constants/routes";

interface IRoutes {
  path: string;
  breadcrumb: string;
}

const routes = [
  { path: Routes.catalog, breadcrumb: "Каталог" },
  { path: "/", breadcrumb: "Головна" },
  { path: "basket", breadcrumb: "Кошик" },
  { path: Routes.heart, breadcrumb: "Вподобання" },
  { path: Routes.admin, breadcrumb: "Кабінет адміністратора" },
  { path: "add", breadcrumb: "Додати одяг" },
  { path: "order", breadcrumb: "Замовлення" },
  { path: "info", breadcrumb: "Інформація" },
  { path: Routes.delivery, breadcrumb: "Доставка, оплата" },
  { path: Routes.questions, breadcrumb: "Питання" },
  { path: "checkout", breadcrumb: "Оформлення" },
];

const getRoutesTitle = (routes: Array<IRoutes>, crumb: string) => {
  return routes.find((item) => item.path === crumb)?.breadcrumb || crumb;
};

export const Breadcrumbs = ({ lastTitle }: { lastTitle?: string }) => {
  const { pathname } = useLocation();
  const isTextWhite = ["/catalog"].indexOf(pathname) > -1;
  const { id } = useParams();
  let crumbLink = "";

  const crumbPath = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((crumb, index) => {
      crumbLink += `/${crumb}`;
      const isLastCrumb = crumbLink === pathname;

      return (
        <div
          className={`breadcrumbs_item ${
            isTextWhite ? "dark-layout" : "light-layout"
          }`}
          key={index}
        >
          <BreadcrumbsArrow
            className={`${isTextWhite && "white_breadcrumb"}`}
          />
          <Link
            to={`${crumbLink}`}
            key={crumb}
            className={`${isLastCrumb ? "disabled_link" : ""}`}
          >
            {id === crumb ? lastTitle : getRoutesTitle(routes, crumb)}
          </Link>
        </div>
      );
    });

  if (crumbPath.length === 0) {
    return null;
  } else {
    crumbPath.unshift(
      <div
        className={`breadcrumbs_item ${
          isTextWhite ? "dark-layout" : "light-layout"
        }`}
      >
        <Link to={`/`} key={"home"}>
          Головна
        </Link>
      </div>
    );
  }

  return <div className="breadcrumbs">{crumbPath}</div>;
};

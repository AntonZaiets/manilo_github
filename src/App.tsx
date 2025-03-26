import React, { useEffect } from "react";
import "./App.scss";
import { BaseContainer } from "components";
import { Routes, Route } from "react-router-dom";
import { Routes as Link } from "constants/routes";
import {
  Admin,
  Basket,
  Catalog,
  Checkout,
  Contacts,
  Delivery,
  Home,
  ProductPage,
  Questions,
} from "pages";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./store/authSlice";
import { AuthenticationGuard } from "./components/router/AuthenticationGuard";
import InsideLike from "./pages/like";
import { AppDispatch } from "./store/store";
import { fillCartStorage } from "./store/cartSlice";

const routes = [
  {
    path: Link.base,
    component: <Home />,
  },
  {
    path: Link.basket,
    component: <Basket />,
  },
  {
    path: Link.aboutUs,
    component: <Home />,
  },
  {
    path: Link.catalog,
    component: <Catalog />,
  },
  {
    path: `/${Link.catalog}/:id`,
    component: <ProductPage />,
  },
  {
    path: Link.questions,
    component: <Questions />,
  },
  {
    path: Link.delivery,
    component: <Delivery />,
  },
  {
    path: Link.aboutUs,
    component: <Catalog />,
  },
  {
    path: Link.checkout,
    component: <Checkout />,
  },
  {
    path: Link.contacts,
    component: <Contacts />,
  },
  {
    path: Link.heart,
    component: <InsideLike />,
  },
  {
    path: Link.heart,
    component: <InsideLike />,
  },
  {
    path: "*",
    component: <Home />,
  },
];

export const adminRoutes = [
  ...routes,
  {
    path: Link.admin,
    component: <Admin />,
  },
  {
    path: `/${Link.admin}/add`,
    component: <Admin />,
  },
  {
    path: `/${Link.admin}/order`,
    component: <Admin />,
  },
  {
    path: `/${Link.admin}/info`,
    component: <Admin />,
  },
];

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAuthMe());
  });
  useEffect(() => {
    dispatch(fillCartStorage());
  });

  return (
    <div className="root_block main__layout_light">
      <AuthenticationGuard
        render={({ isAuthenticated }: { isAuthenticated: boolean }) =>
          isAuthenticated ? (
            <Routes>
              {adminRoutes.map((route) => {
                return (
                  <Route
                    path={route.path}
                    element={<BaseContainer>{route.component}</BaseContainer>}
                  />
                );
              })}
            </Routes>
          ) : (
            <Routes>
              {routes.map((route) => {
                return (
                  <Route
                    path={route.path}
                    element={<BaseContainer>{route.component}</BaseContainer>}
                  />
                );
              })}
            </Routes>
          )
        }
      />
    </div>
  );
}

export default App;

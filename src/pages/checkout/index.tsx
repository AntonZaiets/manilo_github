import React from "react";
import { Breadcrumbs } from "components";
import MultiStepForm from "./MultiStepForm";
import { BASE_URL_BACK } from "axio";
import { CURRENCY_TYPE, ICatalogEntity } from "interface";
import { useSelector } from "react-redux";
import { selectCartSlice } from "store/cartSlice";
import { Routes as Route } from "constants/routes";

export const Checkout = () => {
  const { cart: isCartsInStorage } = useSelector(selectCartSlice);

  return (
    <div className="product_page">
      <div className="container_list container">
        <Breadcrumbs />
        <div className="checkout_page">
          <h2>Оформити замовлення</h2>
          {!isCartsInStorage?.length ? (
            <div className="display_center m_top__4xl">
              <h3>Товар не вибрано</h3>
            </div>
          ) : (
            <div className="checkout_page__block">
              <MultiStepForm />
              <CheckoutOrder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CheckoutOrder = () => {
  const { cart: isCartsInStorage } = useSelector(selectCartSlice);
  const sumPrice = isCartsInStorage?.reduce(
    (count: number, current: any) => count + +current?.price * current.quantity,
    0
  );

  return (
    <div className="checkout_order">
      <div className="checkout_order__title">
        <h2>ТОВАРИ</h2>
      </div>
      <div className="checkout_order__goods">
        {isCartsInStorage?.map((items: ICatalogEntity) => {
          const { images, price, title, quantity } = items || {};
          return (
            <div className="checkout_order__item">
              <div className="checkout_item__img">
                <img
                  src={!!images.length && images[0]}
                  alt="checkout"
                  className=""
                />
              </div>
              <div className="checkout_item__content">
                <div className="checkout_item__name">
                  <a
                    className="f-s__18"
                    href={`/${Route.catalog}/${items["_id"]}`}
                  >
                    {title}
                  </a>
                </div>
                <div className="checkout_item__footer">
                  <div className="checkout_item__count">
                    <p className="f-s__14">Кількість: {quantity}</p>
                  </div>
                  <div className="checkout_item__price">
                    <p>
                      {price} {CURRENCY_TYPE.UA}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkout_order__sum">
        <p className="f-s__24">Сума:</p>
        <p className="f-s__28">
          {sumPrice} {CURRENCY_TYPE.UA}
        </p>
      </div>
    </div>
  );
};

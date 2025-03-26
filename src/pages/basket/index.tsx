import React from "react";
import { Breadcrumbs, TxtButton } from "components";
import { CURRENCY_TYPE, ICatalogEntity } from "interface";
import { BASE_URL_BACK } from "axio";
import { useNavigate } from "react-router-dom";
import { Routes as RouteLink } from "constants/routes";
import {
  DiagonalArrow,
  EmptyBasket,
  DeliverySend,
  QuestionSend,
} from "images/icons";
import { scrollToTop, useMediaQuery } from "utils";
import { useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  selectCartSlice,
} from "store/cartSlice";
import { useAppDispatch } from "store/hooks";
import { printDefined } from "constants/strings";
import { Routes as Route } from "constants/routes";

export const Basket = () => {
  const navigate = useNavigate();
  const { cart: isCartsInStorage } = useSelector(selectCartSlice);
  const sumPrice = isCartsInStorage?.reduce(
    (count: number, current: any) => count + +current?.price * current.quantity,
    0
  );
  const isTablet = useMediaQuery("(max-width: 768px)");
  return (
    <div className="product_page">
      <div className="container">
        <Breadcrumbs />
        <div className="basket_page">
          <div className="col-xs-12 col-md-9 col-lg-8">
            <h1>Кошик</h1>
            <div className={!isTablet && "basket_block"}>
              <BasketTable />
            </div>
          </div>
          {!!isCartsInStorage?.length && (
            <div className="col-xs-12 col-md-3 col-lg-3 col-lg-offset-1">
              {!isTablet && <h2>Інформація</h2>}
              <div className="basket_count">
                <h3>Сума: {sumPrice}₴</h3>
              </div>

              <button
                className="btn_order"
                onClick={() => navigate(`/${RouteLink.checkout}`)}
              >
                Оформити замовлення
              </button>
            </div>
          )}
        </div>
        {!isCartsInStorage?.length && (
          <div className="basket_empty">
            <EmptyBasket fill="#c4b051" />
            <h3>Кошик порожній</h3>
            <p className="f_z__18">Але це ніколи не пізно виправити ❤️</p>
          </div>
        )}
        <div className="additional_block">
          <div className="additional_block__item delivery">
            <div className="delivery_block__content">
              <div>
                <h3>Доставка</h3>
                <div className="delivery_content">
                  <h5>
                    Замовлення доставляються в робочі дні (з понеділка по
                    п'ятницю), крім державних свят.
                  </h5>
                </div>
              </div>

              <DeliverySend />
            </div>
            <TxtButton
              styles={{ color: "#3a3328", fontSize: "16px" }}
              content="Детальніше"
              icon={<DiagonalArrow />}
              handleClick={() => {
                navigate(`/${RouteLink.delivery}`);
                scrollToTop();
              }}
            />
          </div>
          <div className="additional_block__item delivery">
            <div className="delivery_block__content">
              <div>
                <h3>Питання та Відповіді</h3>
                <div className="delivery_content">
                  <h5>
                    Ви можете знайти відповіді на більшість питань на сторінці
                    Питання і Відповіді
                  </h5>
                </div>
              </div>

              <QuestionSend />
            </div>
            <TxtButton
              styles={{ color: "#3a3328", fontSize: "16px" }}
              content="Детальніше"
              icon={<DiagonalArrow />}
              handleClick={() => {
                navigate(`/${RouteLink.questions}`);
                scrollToTop();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BasketTable = () => {
  const dispatch = useAppDispatch();
  const { cart: isCartsInStorage } = useSelector(selectCartSlice);
  const isTablet = useMediaQuery("(max-width: 768px)");

  if (isCartsInStorage?.length) {
    return (
      <>
        {isCartsInStorage.map((items: ICatalogEntity) => {
          const { images, price, title, quantity, size } = items || {};

          if (isTablet) {
            return (
              <div className="basket_item__modal">
                <div className="basket_item__container">
                  <div className="basket_item__head">
                    <img
                      src={images.length && images[0]}
                      alt="basket"
                      className="basket_item__img"
                    />
                    <div className="basket_head__block">
                      <h6>Назва</h6>
                      <a
                        className="basket_item__link"
                        href={`/${Route.catalog}/${items["_id"]}`}
                      >
                        {title}
                      </a>
                    </div>
                  </div>
                  <div className="basket_content_modal">
                    <div className="basket_content_item">
                      <h6>Розмiр:</h6>
                      <p>{size}</p>
                    </div>
                    <div className="basket_content_item">
                      <h6>Кiлькiсть:</h6>
                      <div className="basket_calc">
                        <button
                          onClick={() =>
                            dispatch(decrementQuantity(items["_id"]))
                          }
                          className="basket_calc__btn"
                        >
                          -
                        </button>
                        <p className="basket_calc__count">{quantity}</p>
                        <button
                          onClick={() =>
                            dispatch(incrementQuantity(items["_id"]))
                          }
                          className="basket_calc__btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="basket_content_item">
                      <h6>Цiна:</h6>
                      <p>
                        {price} {CURRENCY_TYPE.UA}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="basket_item__remove display_center"
                  onClick={() => dispatch(removeItem(items["_id"]))}
                >
                  <h4 className="remove_icon right">&#215;</h4>
                </div>
              </div>
            );
          }
          return (
            <div className="basket_item">
              <div className="basket_item__block">
                <img
                  src={!!images.length && images[0]}
                  alt="basket"
                  className="basket_item__img"
                />
              </div>
              <div className="basket_item__block basket_item__name">
                <h6>Назва</h6>
                <a
                  className="basket_item__link"
                  href={`/${Route.catalog}/${items["_id"]}`}
                >
                  {title}
                </a>
              </div>
              <div className="basket_item__block">
                <h6>Розмiр</h6>
                <p>{printDefined(size)}</p>
              </div>
              <div className="basket_item__block basket_item__count">
                <h6>Кiлькiсть</h6>
                <div className="basket_calc">
                  <button
                    onClick={() => dispatch(decrementQuantity(items["_id"]))}
                    className="basket_calc__btn"
                  >
                    &larr;
                  </button>
                  <p className="basket_calc__count">{quantity}</p>
                  <button
                    onClick={() => dispatch(incrementQuantity(items["_id"]))}
                    className="basket_calc__btn"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
              <div className="basket_item__block basket_item__price">
                <h6>Цiна</h6>
                <p>
                  {price} {CURRENCY_TYPE.UA}
                </p>
              </div>
              <div
                className="basket_item__block display_center"
                onClick={() => dispatch(removeItem(items["_id"]))}
              >
                <h4 className="remove_icon right">&#215;</h4>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  return null;
};

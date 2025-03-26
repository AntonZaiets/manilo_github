import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumbs, PreLoader, ProductSlider } from "components";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, selectProduct } from "store/productSlice";
import { CURRENCY_TYPE, ICatalogEntity } from "interface";
import { AddToBusket } from "images/icons";
import { AppDispatch } from "store/store";
import { addToCart, selectCartSlice } from "store/cartSlice";
// @ts-ignore
import productBack from "images/productBack.jpg";
import { scrollToTop, useMediaQuery } from "utils";

export const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data, fetchError, fetchStatus } = useSelector(selectProduct);
  const { price, title, size, text, color } = data || {};
  const isLoading = fetchStatus === "fetching" || fetchStatus === "init";
  const { cart: isCartsInStorage } = useSelector(selectCartSlice);
  const isTablet = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    scrollToTop();
    dispatch(getProduct(id));
  }, []);

  if (isLoading) {
    return (
      <div className="product_page">
        <PreLoader isLoading={true} />
      </div>
    );
  }
  const isProductInBasket = isCartsInStorage?.find(
    (item: ICatalogEntity) => item["_id"] === data["_id"]
  );

  const addToBusket = () => {
    if (!isProductInBasket) {
      dispatch(addToCart(data));
    }
  };

  if (isTablet) {
    return (
      <>
        <div className="product_page">
          <img src={productBack} alt="basket" className="product_page__image" />
          <div className="container_list">
            <Breadcrumbs lastTitle={title} />
          </div>
          <div className="product_page_mob">
            <ProductSlider
              styleSlider={{
                width: "100%",
                height: "100%",
                boxSizing: "borderBox",
                objectFit: "cover",
              }}
              time={6000}
            />
            <div className="btn_buy__mob">
              <button
                onClick={addToBusket}
                disabled={isProductInBasket}
                className={`${isProductInBasket ? "btn_disabled" : ""}`}
              >
                <AddToBusket />
              </button>
            </div>
          </div>
        </div>
        <div className="product_footer__mob">
          <div className="info_text">
            <div className="info_title">Розмiр:</div>
            <div className="info_value">{size}</div>
          </div>
          <div className="info_text">
            <div className="info_title">Колiр:</div>
            <span className="info_value">{color}</span>
          </div>
          <div className="info_text">
            <div className="info_title">Ціна:</div>
            <span className="info_value">
              {price} {CURRENCY_TYPE.UA}
            </span>
          </div>
          <div className="info_text">
            <div className="info_title">Інформація:</div>
            <span className="info_value">{text}</span>
          </div>
        </div>
      </>
    );
  }
  if (fetchError) {
    return (
      <div className="product_page">
        <img src={productBack} alt="basket" className="product_page__image" />
        <div className="container_list">
          <Breadcrumbs lastTitle={title} />
          <div className="product_content product_content__error">
            <h3 className="title_error">Товар не знайдено</h3>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="product_page">
        <img src={productBack} alt="basket" className="product_page__image" />
        <div className="container_list">
          <Breadcrumbs lastTitle={title} />
          <div className="product_content">
            <div className="product_content__left">
              <div className="title_info">
                <div className="title_h2 product_page__title">
                  <h2>{`« ${title} »`}</h2>
                </div>
                <div className="product_info">
                  <div className="product_info__line">
                    <div className="info_text__product">
                      <div className="info_title">Розмiр:</div>
                      <div className="info_value">{size}</div>
                    </div>
                  </div>
                  <div className="product_info__line">
                    <div className="info_text__product">
                      <div className="info_title">Колiр:</div>
                      <span className="info_value">{color}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product_info product_block__btn">
                <div className="product_info__price">
                  {price} {CURRENCY_TYPE.UA}
                </div>
                <div className="product_buy__btn">
                  <button
                    onClick={addToBusket}
                    disabled={isProductInBasket}
                    className={`${isProductInBasket ? "btn_disabled" : ""}`}
                  >
                    <AddToBusket />
                    {!isProductInBasket ? (
                      <span>
                        Додати
                        <br />в кошик
                      </span>
                    ) : (
                      <span>
                        Товар
                        <br />у кошику
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="product_content__right">
              <ProductSlider
                styleSlider={{
                  width: "100%",
                  height: "100%",
                  boxSizing: "borderBox",
                  objectFit: "cover",
                }}
                time={6000}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="product_footer">
        <div className="container_list">
          <div className="product_footer__description">
            <h3>{text}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatalog, selectCatalog } from "store/catalogSlice";
import { Link } from "react-router-dom";
import { CURRENCY_TYPE, ICatalogEntity, ModalTypes } from "interface";
import { Routes } from "constants/routes";
import { Breadcrumbs, modalAction, PreLoader } from "components";
import { AddClothes, NoData } from "images/icons";
import Like from "./like_btn";
import { AppDispatch } from "store/store";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectUser } from "store/authSlice";
import { addToCart, selectCartSlice } from "store/cartSlice";
import { getCatalogSort, SearchTab, Tab } from "./sortTab";
import "./style.scss";

export const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, fetchError, fetchStatus } = useSelector(selectCatalog);
  const isLoading = fetchStatus === "fetching" || fetchStatus === "init";

  useEffect(() => {
    dispatch(getCatalog());
  }, []);

  return (
    <div className="catalog_block">
      <div className="container_list">
        <Breadcrumbs />
        <header className="filter_block">
          <div className="filter_block__colors">
            <span className="filter_label">Сортувати за:</span>
            <div className="sort_tabs">
              {getCatalogSort.map((item, id) => (
                <Tab
                  key={item.key}
                  title={item.text}
                  id={item.key}
                  hidden={item.hidden}
                  disabled={item.disabled}
                />
              ))}
            </div>
          </div>
          <div className="filter_block__colors">
            <SearchTab />
          </div>
        </header>
        <div className="product_list row">
          <PreLoader isLoading={isLoading} />
          {fetchError && !isLoading && (
            <div className="empty_data">
              <div className="empty_data__icon">
                <NoData fill="#c4b051" />
              </div>
              <h3 className="empty_data__title">Вибачте, сталася помилка</h3>
            </div>
          )}
          {!data.length && !isLoading && !fetchError && (
            <div className="empty_data">
              <div className="empty_data__icon">
                <NoData fill="#c4b051" />
              </div>
              <h3 className="empty_data__title">Товар відсутній</h3>
            </div>
          )}
          {!!data.length &&
            !isLoading &&
            !fetchError &&
            data?.map((item, index: number) => (
              <Product key={index} id={item["_id"]} data={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

const Product = (props: { id: string; data: ICatalogEntity }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { cart: isCartsInStorage } = useSelector(selectCartSlice);
  const { id, data } = props;
  const { price, images, viewsCount = 0 } = data;

  const isProductInBasket = isCartsInStorage?.find(
    (item: ICatalogEntity) => item["_id"] === id
  );

  const handleDelete = () => {
    dispatch(modalAction("1", ModalTypes.DELETE_PRODUCT, { id: id }));
  };
  const handleEdit = () => {
    dispatch(modalAction("1", ModalTypes.EDIT_PRODUCT, { id: id, data: data }));
  };

  return (
    <div key={id} className="product col-xs-6 col-sm-6 col-md-4">
      <Link to={`/${Routes.catalog}/${id}`} className="product_link">
        {images?.length && (
          <img src={images[0]} alt="basket" className="product_image" />
        )}
      </Link>
      <div className="product_price">
        {price} {CURRENCY_TYPE.UA}
      </div>
      <Like data={data} />
      {user.isAuthorized && (
        <div className="product_control">
          <div className="product_control__views product_control__btn">
            Переглядів - {viewsCount}
          </div>
          <button className="product_control__btn" onClick={handleEdit}>
            Редагувати
          </button>
          <button className="product_control__btn" onClick={handleDelete}>
            Видалити
          </button>
        </div>
      )}
      <div
        className="product_btn"
        onClick={() => {
          dispatch(addToCart(data));
        }}
      >
        <div className="product_btn__add">
          <button
            className={`button_circle ${isProductInBasket && "disabledBtn"}`}
          >
            <AddClothes />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "store/hooks";
import { getOrder, selectOrder } from "store/orderSlice";
import { useSelector } from "react-redux";
import { IOrderEntity } from "interface";
import { printDefined } from "constants/strings";
import { BASE_URL_BACK } from "axio";
import moment from "moment";
import "./style.scss";

export const Order = () => {
  const { data, fetchError, fetchStatus } = useSelector(selectOrder);
  const dispatch = useAppDispatch();
  const isError = fetchError === "error";
  useEffect(() => {
    if (fetchStatus === "init") {
      dispatch(getOrder());
    }
  });

  if (isError || !data.length) {
    return (
      <div className="cabinet-content">
        <h1 className="about_title add_block__title">Замовлення</h1>
        <div className="order_block">
          {isError ? "Вибачте, сталась помилка" : "На жаль замовлень немає"}
        </div>
      </div>
    );
  }

  return (
    <div className="cabinet-content">
      <h1 className="about_title add_block__title">Замовлення</h1>
      <div className="order_block">
        {data.map((item: IOrderEntity, index) => (
          <OrderItem data={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const OrderItem = ({ data, index }: { data: IOrderEntity; index: number }) => {
  const {
    createdAt,
    carts,
    name,
    city,
    email,
    secondName,
    phone,
    address,
    order,
  } = data;
  const sum = carts?.reduce((sum, cur) => cur.price + sum, 0);
  const [isOpen, setOpen] = useState(false);

  return (
    <div key={index} className="order_item">
      <div className="order_head">
        <div className="order_head__data">
          <HorizontalItem
            title={moment(createdAt).format("YYYY-MM-DD, HH:mm")}
            value={`№ ${printDefined(order)}`}
          />
        </div>
        <div className="order_head__price">
          <HorizontalItem
            title="Сума замовлення"
            value={`${sum} ${!!sum && "₴"}`}
          />
        </div>
        <div className="order_head__img">
          {carts?.map((cart, ind) => (
            <>
              {!!cart.images?.length && (
                <img className="m_left__m" src={cart.images[0]} />
              )}
            </>
          ))}
        </div>
        <div className="order_head__arrow" onClick={() => setOpen(!isOpen)}>
          {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </div>
      </div>
      {isOpen && (
        <div className="order_content">
          <h3 className="order_content__title">Інформація про замовника</h3>
          <div className="m_top__m" />
          <p className="order_content__info">
            Ім'я:{" "}
            <span>
              {printDefined(secondName)} {printDefined(name)}
            </span>
          </p>
          <p className="order_content__info">
            Телефон: <span>{printDefined(phone)}</span>
          </p>
          <p className="order_content__info">
            Адреса:{" "}
            <span>
              {printDefined(city)}, {printDefined(address)}
            </span>
          </p>
          <p className="order_content__info">
            Email: <span>{printDefined(email)}</span>
          </p>
          <div className="m_top__m" />
          <h3 className="order_content__title">Товари</h3>
          <div className="m_top__m" />
          {carts.map((item, index) => (
            <div key={index} className="order_content__clothe">
              <img className="order_content__clothe_img" src={item.images[0]} />
              <p className="order_content__info order_content__info_title">
                {printDefined(item.title)}
              </p>
              <HorizontalItem
                className="order_content__info"
                title="Кількість"
                value={item.quantity}
              />
              <HorizontalItem
                className="order_content__info"
                title="Сума"
                value={item.price}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const HorizontalItem: React.FC<{
  title: string;
  value: string | number;
  className?: string;
}> = ({ title, value, className, ...props }) => (
  <div className={`info_row ${className}`}>
    <p className="">{title}</p>
    <h3>{printDefined(value)}</h3>
  </div>
);

import React from "react";
import { Breadcrumbs } from "components/Breadcrumbs";
import { DeliveryCar, Card, Medal } from "images";
// @ts-ignore
import DeliveryIcon2 from "./image4.svg";

export const Delivery = () => {
  return (
    <div className="delivery_page">
      <div className="container_list">
        <Breadcrumbs />
        <div className="delivery_header">
          <h1 className="title_container delivery_title">ДОСТАВКА</h1>
          <div className="delivery_img">
            <img src={DeliveryIcon2} alt="" />
          </div>
        </div>

        <div className="delivery_description">
          <div className="description_block">
            <DeliveryCar />
            <span className="description_block__title">ДОСТАВКА</span>
            <div className="description_block__text">
              Новою Поштою в будь-який куточок України до 10 днів. Також є
              можливість відправки за кордон.
            </div>
          </div>
          <div className="description_block">
            <Card />
            <span className="description_block__title">ОПЛАТА</span>
            <div className="description_block__text">
              Банківською картою VISA або Master Card.
            </div>
          </div>
          <div className="description_block">
            <Medal />
            <span className="description_block__title">ПЕРЕВІРКА ЯКОСТІ</span>
            <div className="description_block__text">
              Ви маєте право перевірити товар на пошті перед оплатою.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

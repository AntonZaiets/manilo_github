import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "components/Breadcrumbs";
import "./style.scss";
import { ICatalogEntity } from "interface";
import { Link } from "react-router-dom";

const InsideLike = () => {
  const [heart, setHeart] = useState([]);

  useEffect(() => {
    const getHeart = JSON.parse(localStorage.getItem("like")) || [];
    setHeart(getHeart);
  }, []);

  const LikedData = heart.map(
    (element: { price: number; title: string; text: string }, index) => (
      <Link
        key={index}
        to={`/catalog/${element["_id"]}`}
        className="liked_item_block"
      >
        <div className="liked_item_photo">Фото відсутнє</div>
        <div className="liked_item_description">
          {element.title} {element.text} <br />
          <span className="description_price">{element.price}грн.</span>
        </div>
      </Link>
    )
  );

  const AddingToHeart = () => {
    if (heart.length) {
      return <div className="notEmpty">{LikedData}</div>;
    }
    return (
      <div className="display_center m_top__4xl">
        <h3>Немає вподобань</h3>
      </div>
    );
  };

  return (
    <div className="product_page">
      <div className="container">
        <Breadcrumbs />
        <div className="liked">
          <h1>ВПОДОБАННЯ</h1>
        </div>
        <AddingToHeart />
      </div>
    </div>
  );
};

export default InsideLike;

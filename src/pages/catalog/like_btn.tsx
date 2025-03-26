import React, { useEffect, useState } from "react";
import { LikeIcon } from "images/icons/Like";
import { ICatalogEntity } from "interface";


const Like = (props: { data: ICatalogEntity }) => {
    const [isProductInHeart, setIsProductInHeart] = useState(false);

    useEffect(() => {
        const getHeart = JSON.parse(localStorage.getItem("like")) || [];
        const foundItem = getHeart.find(
            (item: ICatalogEntity) => item["_id"] === props.data["_id"]
        );
        setIsProductInHeart(!!foundItem);
    }, [props.data]);

    const toHeart = () => {
        const getHeart = JSON.parse(localStorage.getItem("like")) || [];
        if (!isProductInHeart) {
            getHeart.push(props.data);
            localStorage.setItem("like", JSON.stringify(getHeart));
        } else {
            const updatedHeart = getHeart.filter(
                (item: ICatalogEntity) => item["_id"] !== props.data["_id"]
            );
            localStorage.setItem("like", JSON.stringify(updatedHeart));
        }
        setIsProductInHeart(!isProductInHeart);

    };

    const handleClick = () => {
        toHeart();
    };

    return (
        <div className="like">
            <button className="like_btn" onClick={handleClick}>
                <div
                    className="like_icon"
                    style={{
                        fill: isProductInHeart ? "#771103" : "black",
                    }}
                >
                    <LikeIcon />
                </div>
            </button>
        </div>
    );
};

export default Like;
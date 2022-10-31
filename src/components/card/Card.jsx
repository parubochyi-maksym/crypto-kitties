import React from "react";
import { Link } from "react-router-dom";
import { ImPriceTags } from "react-icons/im";
import useImageCheck from "../../hooks/useImageCheck";
import "../card/card.css";

export default function Card({ catInfo, sortBy }) {
  const { id, name, image_url, category, price } = catInfo;
  const url = useImageCheck(image_url);

  return (
    <Link to={`/${id}`}>
      <div className="item-price">
        <ImPriceTags className="price-image" />
        {price}
        <span className="item-price-backdrop"></span>
      </div>
      <div className="item-image">
        {url ? (
          <img className="card-image" src={url} alt={name} />
        ) : (
          <div className="lds-dual-ring"></div>
        )}
      </div>

      <div className="item-description">
        <span className={"item-title " + (sortBy === "name" ? "bold" : "")}>
          {name}
        </span>
        <span
          className={"item-category " + (sortBy === "category" ? "bold" : "")}
        >
          {category}
        </span>
      </div>
    </Link>
  );
}

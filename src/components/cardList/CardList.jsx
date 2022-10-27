import React, { useState, useRef, useCallback } from "react";
import useCatFilter from "../../hooks/useCatFilter";
import Select from "../select/Select";
import Card from "../card/Card";
import { options_by } from "../../data/constants";
import "../cardList/cardList.css";

export default function CardList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const { cats, hasMore, loading, error } = useCatFilter(sortBy, pageNumber);

  const observer = useRef();

  const lastCatElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="cards-title">
        <h1 className="cards-title-text">Crypto Kitties</h1>
      </div>
      <div className="selects">
        <p className="select-text">Sort by</p>
        <Select
          className="select"
          options={options_by}
          value={sortBy}
          onChangeValue={(value) => {
            setSortBy(value);
            setPageNumber(1);
          }}
        />
      </div>

      <ul className="cards-list">
        {cats.map((cat, index) => {
          if (cats.length === index + 1) {
            return (
              <li className="card-item" ref={lastCatElementRef} key={cat.id}>
                <Card catInfo={cat} sortBy={sortBy} />
              </li>
            );
          } else {
            return (
              <li className="card-item" key={cat.id}>
                <Card catInfo={cat} sortBy={sortBy} />
              </li>
            );
          }
        })}
      </ul>
      <div>{loading && <div className="lds-dual-ring"></div>}</div>
      <div>{error && "Error"}</div>
    </>
  );
}

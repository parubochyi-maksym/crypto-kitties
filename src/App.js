import React from "react";
import { Routes, Route } from "react-router-dom";
import FullCard from "./components/cardPage/FullCard";
import CardList from "./components/cardList/CardList";

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<CardList />} />
        <Route path=":id" element={<FullCard />} />
      </Route>
    </Routes>
  );
}

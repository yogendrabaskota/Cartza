import { useState } from "react";
import Card from "../../globals/card/Card";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Hero from "./components/Hero";
import { fetchProduct } from "../../store/productSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  const { product } = useAppSelector((state) => state.products);
  //   console.log(product)

  useState(() => {
    dispatch(fetchProduct())
  },[])
  return (
    <>
      <div className="relative overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-100">
        <Navbar />

        <Hero />

      </div>
      <h1 className="text-4xl font-bold text-center mb-4 mt-8 text-gray-900">
        Top Products
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {product.length > 0 &&
          product.map((pd) => {
            return <Card key={pd.id} data={pd} />;
          })}
      </div>
    </>
  );
};

export default Home;

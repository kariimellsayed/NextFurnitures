"use client";

import { useEffect, useState } from "react";
import ProductsApis from "../_utils/ProductsApis";
import Loading from "../_components/loading";
import ProductsList from "../_components/ProductsList";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // products Loading

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    ProductsApis.ProductsGetLest()
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  return (
    <section className="py-28 padding-x">
      <h1 className="sm:text-4xl text-xl font-semibold text-gray-500 text-left">
        All Furnitures For You...
      </h1>
      <div className="mt-16">
        {loading ? (
          <Loading screen={"w-full"} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </section>
  );
};

export default AllProducts;

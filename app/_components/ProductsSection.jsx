"use client";
import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import ProductsApis from "../_utils/ProductsApis";
import Loading from "./loading";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // حالة تحميل البيانات

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="padding-x" id="product">
      <ProductsList products={products} />
    </div>
  );
};

export default ProductsSection;

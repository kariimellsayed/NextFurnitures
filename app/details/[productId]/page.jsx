"use client";

import Loading from "@/app/_components/loading";
import ProdcutImage from "@/app/_components/ProdcutImage";
import ProductInfo from "@/app/_components/ProductInfo";
import ProductsList from "@/app/_components/ProductsList";
import ProductsApis from "@/app/_utils/ProductsApis";
import { useEffect, useState } from "react";

const ProductDetails = ({ params }) => {
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState({});
  const [catProducts, setCatProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams?.productId);
    })();
  }, [params]);

  useEffect(() => {
    if (productId) {
      getProductData();
    }
  }, [productId]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const res = await ProductsApis.ProductDetails(productId);
      setProduct(res.data.data);
      await productListCategory(res.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setProduct({});
    } finally {
      setLoading(false);
    }
  };

  const productListCategory = async (cat) => {
    try {
      const res = await ProductsApis.ProductByCategory(cat?.category?.name);
      setCatProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loading screen={"w-full h-screen"} />;
  }

  return (
    <section className="padding-x py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProdcutImage productDetails={product} />
        <ProductInfo productDetails={product} />
      </div>

      <div>
        <h1 className="text-gray-500 font-semibold sm:text-3xl text-2xl mt-10">
          Similar furnitures..
        </h1>
        <div className="mt-14">
          <ProductsList products={catProducts} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

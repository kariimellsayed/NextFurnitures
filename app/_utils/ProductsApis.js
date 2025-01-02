import axiosClient from "./AxiosClient";

// Fetch All Products
const ProductsGetLest = () => axiosClient.get("/products?populate=*");

// Fetch First Product
const ProductDetails = (documentId) =>
  axiosClient.get(`/products/${documentId}?populate=*`);

// Fetch Products By Category
const ProductByCategory = (category) => {
  return axiosClient.get(
    `/products?filters[category][name][$eq]=${category}&populate=*`
  );
};

export default {
  ProductsGetLest,
  ProductDetails,
  ProductByCategory,
};

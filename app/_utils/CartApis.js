import axiosClient from "./AxiosClient";

const CartProducts = (payload) => axiosClient.post("carts", payload);

const getUserCartItems = (email) =>
  axiosClient.get(
    `carts?populate[products][populate]=image&filters[email][$eq]=${email}`
  );

const deleteCartItem = (id) => axiosClient.delete(`carts/${id}`);

export default {
  CartProducts,
  getUserCartItems,
  deleteCartItem,
};

"use client";

import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../_features/cartSlice";
import CartApis from "../_utils/CartApis";
import { loadStripe } from "@stripe/stripe-js";

// تهيئة stripe باستخدام الـ public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalItems, loading, error } = useSelector(
    (state) => state.cart
  );

  // إزالة عنصر من السلة
  const handleDelete = async (documentId) => {
    try {
      await CartApis.deleteCartItem(documentId);
      dispatch(removeFromCart(documentId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // بدء عملية الدفع باستخدام Stripe
  const handleCheckout = async () => {
    try {
      // إرسال طلب لإنشاء جلسة دفع
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
        }),
      });

      if (!res.ok) throw new Error("Failed to create Stripe session");

      const { id } = await res.json();

      const stripe = await stripePromise;

      // إعادة توجيه المستخدم إلى صفحة الدفع في Stripe
      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-black mb-6">Shopping Cart</h1>
        {items?.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty!</p>
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-6 text-center mb-6 border-b pb-4 text-gray-500">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Action</span>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-6 items-center mb-6"
              >
                <div className="flex items-center flex-wrap gap-4">
                  <Image
                    src={item.products[0]?.image[0]?.url || "/placeholder.jpg"}
                    alt={item.products[0]?.name || "Product"}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <p className="text-gray-700 text-left text-xs max-sm:text-clip-1">
                    {item.products[0]?.name}
                  </p>
                </div>
                <p className="text-black font-medium text-center max-sm:text-sm">
                  ${item.products[0]?.price.toFixed(2)}
                </p>
                <p className="text-gray-700 text-center">{item.quantity}</p>
                <button
                  className="flex items-center justify-center text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(item.documentId)}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}

            <div className="border-t pt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-black">Total Items:</h2>
                <p className="text-gray-700">{totalItems}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-xl font-bold text-black">Total Price:</h2>
                <p className="text-gray-700">
                  $
                  {items
                    .reduce(
                      (acc, item) =>
                        acc + item.products[0]?.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;

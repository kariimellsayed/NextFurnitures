"use client";

import { FaCartShopping, FaStar } from "react-icons/fa6";
import { useUser } from "@clerk/nextjs"; // استيراد Clerk
import { useRouter } from "next/navigation";
import CartApis from "../_utils/CartApis";
import { useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../_features/cartSlice";

const ProductInfo = ({ productDetails }) => {
  const { isSignedIn, user } = useUser(); // الحصول على حالة المستخدم
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (!productDetails || !productDetails.documentId) {
      alert("تفاصيل المنتج غير متوفرة.");
      return;
    }

    try {
      // تحديث Redux محليًا
      dispatch(
        addToCart({
          documentId: productDetails?.documentId,
          name: productDetails?.name,
          price: productDetails?.price,
          category: productDetails?.category?.name,
        })
      );

      // Post Product To Cart Api
      const payload = {
        data: {
          username: user?.username || user?.firstName || "Guest",
          email: user?.primaryEmailAddress?.emailAddress || "No Email",
          products: [productDetails.documentId],
        },
      };
      await CartApis.CartProducts(payload);

      // تحديث البيانات من API للتأكد من التزامن
      dispatch(fetchCart(user?.primaryEmailAddress?.emailAddress));

      alert("تم إضافة المنتج إلى السلة بنجاح!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      const errorMessage =
        error.response?.data?.message ||
        "حدث خطأ أثناء إضافة المنتج إلى السلة.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col py-8 justify-center">
      <div className="mb-4">
        <span className="block text-lg font-bold text-gray-500">
          {productDetails?.category?.name || "Unknown Category"}
        </span>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          {productDetails?.name || "No Name"}
        </h2>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-8 text-sm bg-yellow-500 rounded-xl text-white font-semibold
         hover:bg-yellow-600 transition"
        >
          <span className="text-lg">4.2</span>
          <FaStar />
        </button>
        <span className="text-sm text-gray-500">56 Ratings</span>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-3xl font-bold text-gray-500">
          ${productDetails?.price || 0}
        </span>
        {productDetails?.sale && (
          <span className="text-xl text-red-500 line-through font-semibold">
            ${productDetails?.price ? productDetails.price + 30 : 30}
          </span>
        )}
      </div>

      <p className="text-base text-gray-500 mt-8">
        {productDetails?.description?.[0]?.children?.[0]?.text ||
          "No description available."}
      </p>

      <div className="mt-12 w-full">
        <button
          className="w-full py-4 px-8 text-sm bg-primary font-semibold text-white rounded-lg
         hover:opacity-80 transition flex-center gap-3 text-center"
          onClick={handleAddToCart} // استدعاء الدالة عند النقر
        >
          <span> Add to Cart</span>
          <FaCartShopping />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;

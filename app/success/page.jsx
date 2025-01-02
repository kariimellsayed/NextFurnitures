import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-semibold text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mt-4 text-lg">
          Thank you for your purchase. Your order is being processed.
        </p>
        <div className="mt-6">
          <Link href="/" passHref>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-medium hover:bg-green-600 transition duration-300">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

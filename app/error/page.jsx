import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-semibold text-gray-900">
          Payment Failed!
        </h1>
        <p className="text-gray-700 mt-4 text-lg">
          Something went wrong with your payment. Please try again later.
        </p>
        <div className="mt-6">
          <Link href="/" passHref>
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg text-lg font-medium hover:bg-red-600 transition duration-300">
              Go Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

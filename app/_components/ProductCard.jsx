import Image from "next/image";
import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";

const ProductCard = ({ product }) => {
  return (
    <div
      className="p-4 mb-6 border border-gray-200 bg-white relative shadow-lg
                 overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg group cursor-pointer"
    >
      <Image
        src={product?.image?.[0]?.url}
        alt={"Product Image"}
        width={500}
        height={500}
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-52 object-contain mx-auto rounded-md"
      />

      <div className="flex flex-col mt-5 gap-3">
        <h3 className="font-medium text-sm lg:text-base text-gray-800 line-clamp-1">
          {product?.name}
        </h3>
        <div className="flex-between">
          <p className="font-bold text-green-500 text-sm lg:text-base">
            $ {product?.price}
          </p>
          <span className="flex items-center gap-2 text-gray-500 font-semibold">
            <BiSolidCategory />
            {product?.category?.name}
          </span>
        </div>
      </div>

      <div
        className="absolute w-full h-full bg-[rgba(0,0,0,0.8)] top-0 left-[3px] translate-x-full
                   group-hover:translate-x-[-3px] transition-transform duration-300 flex items-center justify-center"
      >
        <Link
          href={`/details/${product?.documentId}`}
          className="px-6 py-2 text-sm bg-white text-primary
               rounded-full text-center shadow-md hover:bg-primary border hover:border-white hover:text-white transition-colors"
        >
          Details
        </Link>
      </div>
      {product?.sale && (
        <div className="text-sm px-3 absolute top-0 left-0 text-white bg-red-500">
          Sale
        </div>
      )}
    </div>
  );
};

export default ProductCard;

import Image from "next/image";

const ProductImage = ({ productDetails }) => {
  const imageUrl = productDetails?.image?.[0]?.url;
  return (
    <div className="flex justify-center items-center relative overflow-hidden rounded-lg bg-gray-50">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="image of product"
          width={400}
          height={400}
          className=" object-cover object-center"
        />
      ) : (
        <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-700">
          No Image Available
        </div>
      )}

      {productDetails?.sale && (
        <div className="absolute px-3 text-white bg-red-500 font-semibold top-0 left-0">
          Sale
        </div>
      )}
    </div>
  );
};

export default ProductImage;

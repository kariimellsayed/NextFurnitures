import ProductCard from "./ProductCard";

const ProductsList = ({ products }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6
                 px-4 sm:px-6 lg:px-8"
    >
      {products.map((item) => (
        <ProductCard key={item.documentId} product={item} />
      ))}
    </div>
  );
};

export default ProductsList;

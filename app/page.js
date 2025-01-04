import Hero from "./_components/Hero";
import ProductsSection from "./_components/ProductsSection";

export const metadata = {
  title: "Next Furnitures - Home Page",
  description: "Welcome to the home page of My Awesome E-Commerce store.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsSection />
    </main>
  );
}

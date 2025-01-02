// Import Livvic
import { Livvic } from "next/font/google";
import Header from "./_components/Header";
import "./globals.scss";
import Footer from "./_components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "./_features/ReduxProvider";
import CartInitializer from "./_features/CartInitializer"; // استيراد CartInitializer

const livvic = Livvic({
  variable: "--font-livvic",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"], // Weights
});

export const metadata = {
  title: "NextFurnitures",
  description: "Generated by create next app",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang="en" className={livvic.variable}>
          <body>
            <CartInitializer /> {/* إضافة CartInitializer هنا */}
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}

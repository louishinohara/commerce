import { CartProvider } from "components/cart/cart-context";
import LandingPage from "components/layout/landingPage/LandingPage";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import ThemeProvider from "theme/ThemeProvider"; // ✅ Import fixed theme provider
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <ThemeProvider>
          <CartProvider cartPromise={cart}>
            <Navbar />
            <LandingPage />
            <main className="mt-[64px]">
              {children}
              <Toaster closeButton />
              <WelcomeToast />
            </main>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

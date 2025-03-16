import { CartProvider } from "components/cart/actions/cart-context";
import LandingPageClient from "components/layout/landingPage/LandingPageClient";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import ThemeProvider from "theme/ThemeProvider";
import "./globals.css";

const { NEXT_PUBLIC_COMPANY_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: NEXT_PUBLIC_COMPANY_NAME!,
    template: `%s | ${NEXT_PUBLIC_COMPANY_NAME}`,
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
            <LandingPageClient />
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

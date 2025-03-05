import { getMenu } from "lib/shopify";
import NavbarClient from "./components/NavbarClient";

const { NEXT_PUBLIC_COMPANY_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return <NavbarClient menu={menu} companyName={NEXT_PUBLIC_COMPANY_NAME || "Your Company"} />;
}
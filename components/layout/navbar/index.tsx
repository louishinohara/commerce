import NavbarClient from "./components/NavbarClient";

const { NEXT_PUBLIC_COMPANY_NAME } = process.env;

export async function Navbar() {
  return <NavbarClient companyName={NEXT_PUBLIC_COMPANY_NAME || "Your Company"} />;
}
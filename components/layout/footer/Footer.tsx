import { getMenu } from 'lib/shopify';
import { notFound } from 'next/navigation';
import FooterBottomSection from './FooterBottomSection';
import FooterTopSection from './FooterTopSection';

const { NEXT_PUBLIC_COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  // Fetch each menu
  const policiesMenu = await getMenu('footer');
  const aboutUsMenu = await getMenu('about-us');
  const helpCenterMenu = await getMenu('help-center');

  // Handle missing menus if needed
  if (!policiesMenu || !aboutUsMenu || !helpCenterMenu) {
    return notFound();
  }

  // Define columns for each menu
  const columns = [
    { title: 'About Us', menu: aboutUsMenu },
    { title: 'Policies', menu: policiesMenu },
    { title: 'Help Center', menu: helpCenterMenu },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Upper portion of the footer: logo, subscribe, menu columns, social icons */}
      <FooterTopSection columns={columns} />

      {/* Bottom portion of the footer: copyright */}
      <FooterBottomSection
        companyName={NEXT_PUBLIC_COMPANY_NAME || SITE_NAME || ''}
        displayYear={currentYear}
      />
    </footer>
  );
}

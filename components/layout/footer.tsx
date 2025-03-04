// import FooterMenu from 'components/layout/footer-menu';
// import LogoSquare from 'components/logo-square';
// import { getMenu } from 'lib/shopify';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import { Suspense } from 'react';

// // Replace these placeholders with your own icon components or library icons.
// function InstagramIcon() {
//   return <span className="inline-block w-5 h-5 bg-gray-300">IG</span>;
// }
// function TwitterIcon() {
//   return <span className="inline-block w-5 h-5 bg-gray-300">TW</span>;
// }
// function FacebookIcon() {
//   return <span className="inline-block w-5 h-5 bg-gray-300">FB</span>;
// }

// const { COMPANY_NAME, SITE_NAME } = process.env;

// export default async function Footer() {
//   const currentYear = new Date().getFullYear();
//   const startYear = 2023; // The first year you started using this brand
//   const displayYear = startYear === currentYear ? currentYear : `${startYear}-${currentYear}`;

//   // Fetch each menu separately
//   const footerMenu = await getMenu('footer');
//   const aboutUsMenu = await getMenu('about-us');
//   const helpCenterMenu = await getMenu('help-center');

//   // If any menu fails to load, you could return notFound() or handle gracefully
//   if (!footerMenu || !aboutUsMenu || !helpCenterMenu) {
//     return notFound();
//   }

//   // You can rename these columns however you like
//   const columns = [
//     { title: 'About Us', menu: aboutUsMenu },
//     { title: 'Policies', menu: footerMenu },
//     { title: 'Help Center', menu: helpCenterMenu },
//   ];

//   return (
//     <footer className="bg-black text-white">
//       {/* Upper section: Logo + Subscribe + Menu columns */}
//       <div className="mx-auto max-w-7xl px-6 py-12 md:px-4 lg:px-8">
//         <div className="flex flex-col gap-12 md:flex-row">
//           {/* Left Column: Logo & Subscribe */}
//           <div className="md:w-1/3">
//             {/* Logo/Brand */}
//             <Link href="/" className="flex items-center gap-2 text-white">
//               <LogoSquare size="sm" />
//               <span className="uppercase font-bold">{SITE_NAME}</span>
//             </Link>

//             {/* Subscribe Form */}
//             <div className="mt-6">
//               <h2 className="mb-2 text-lg font-semibold">Subscribe For Exclusive Deals!</h2>
//               <form className="flex">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full rounded-l-md p-2 text-black focus:outline-none"
//                 />
//                 <button
//                   type="submit"
//                   className="rounded-r-md bg-white px-4 py-2 text-black hover:bg-gray-200"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Middle Columns: Each menu in its own column */}
//           <div className="flex flex-col gap-8 md:flex-row md:w-2/3">
//             {columns.map((col) => (
//               <div key={col.title} className="w-full md:w-1/3">
//                 <h3 className="mb-4 text-base font-semibold uppercase tracking-wide">
//                   {col.title}
//                 </h3>
//                 <Suspense fallback={<div className="h-6 w-24 animate-pulse bg-gray-400" />}>
//                   <FooterMenu menu={col.menu} />
//                 </Suspense>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Social Media Icons */}
//         <div className="mt-8 flex items-center gap-4">
//           <a
//             href="#"
//             aria-label="Instagram"
//             className="hover:text-gray-300"
//           >
//             <InstagramIcon />
//           </a>
//           <a
//             href="#"
//             aria-label="Twitter"
//             className="hover:text-gray-300"
//           >
//             <TwitterIcon />
//           </a>
//           <a
//             href="#"
//             aria-label="Facebook"
//             className="hover:text-gray-300"
//           >
//             <FacebookIcon />
//           </a>
//         </div>
//       </div>

//       {/* Lower section: Copyright and maybe additional links */}
//       <div className="border-t border-gray-700 py-6 text-sm">
//         <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 md:flex-row lg:px-8">
//           <p>
//             &copy; {displayYear}{' '}
//             {COMPANY_NAME || SITE_NAME || ''}
//             . All rights reserved.
//           </p>
//           {/* Additional link or text if you want */}
//           <p className="text-gray-400">Last Updated: {new Date().toLocaleDateString()}</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

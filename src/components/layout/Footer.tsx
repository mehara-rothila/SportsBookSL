// src/components/layout/Footer.tsx

import Link from 'next/link';

const navigation = {
  solutions: [
    { name: 'Facility Booking', href: '/facilities' },
    { name: 'Trainer Booking', href: '/trainers' },
    { name: 'Equipment Rental', href: '/equipment' },
    { name: 'Financial Aid', href: '/financial-aid/apply' },
    { name: 'Donations', href: '/donations' }, // Added Donations
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'System Status', href: '#' }, // Added Status
    { name: 'Report Issue', href: '#' }, // Added Report
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press', href: '#' }, // Added Press
    { name: 'Partners', href: '#' },
    { name: 'Careers', href: '#' },
  ],
  legal: [ // Separated Legal links
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
  social: [
    // ... (Social icons remain the same) ...
     {
      name: 'Facebook',
      href: '#', // Add actual social links
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#', // Add actual social links
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#', // Add actual social links
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-100 to-white" aria-labelledby="footer-heading"> {/* Subtle gradient */}
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Main Content Section */}
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:pt-32 lg:px-8 lg:pt-40"> {/* Increased padding */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          {/* Branding & Social */}
          <div className="space-y-10"> {/* Increased spacing */}
            <Link href="/" className="inline-block group focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-primary-500 rounded-lg">
              <span className="sr-only">SportsBookSL Home</span>
              {/* Enhanced Logo Text */}
              <span className="text-4xl font-extrabold tracking-tight"> {/* Bolder, tighter tracking */}
                <span className="text-primary-600 group-hover:text-primary-700 transition-colors">Sports</span>
                <span className="text-secondary-500 group-hover:text-secondary-600 transition-colors">Book</span>
                <span className="text-primary-600 group-hover:text-primary-700 transition-colors">SL</span>
              </span>
            </Link>
            <p className="text-base leading-relaxed text-slate-700 max-w-xs">
              Your ultimate platform for discovering and booking sports facilities across Sri Lanka. Play more, manage less.
            </p>
            <div className="flex space-x-5">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 hover:text-primary-600 transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1" // Added slight lift
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-7 w-7" aria-hidden="true" /> {/* Slightly larger icons */}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="mt-16 grid grid-cols-2 gap-10 xl:col-span-2 xl:mt-0"> {/* Increased gap */}
            <div className="md:grid md:grid-cols-2 md:gap-10">
              {/* Solutions */}
              <div>
                <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-wide">Solutions</h3> {/* Added tracking */}
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-700 hover:font-medium transition-all duration-200 ease-in-out group flex items-center">
                         <span className="w-1.5 h-1.5 bg-primary-200 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span> {/* Hover indicator */}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Support */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-wide">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-700 hover:font-medium transition-all duration-200 ease-in-out group flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-200 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-10">
              {/* Company */}
              <div>
                <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-wide">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-700 hover:font-medium transition-all duration-200 ease-in-out group flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-200 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Legal (Moved from bottom bar) */}
              <div className="mt-10 md:mt-0">
                 <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-wide">Legal</h3>
                 <ul role="list" className="mt-6 space-y-4">
                   {navigation.legal.map((item) => (
                     <li key={item.name}>
                       <a href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-700 hover:font-medium transition-all duration-200 ease-in-out group flex items-center">
                         <span className="w-1.5 h-1.5 bg-primary-200 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                         {item.name}
                       </a>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Subscribe Section - Separated Visually */}
        <div className="mt-20 pt-16 border-t border-slate-900/10 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold leading-6 text-slate-900">Subscribe to our newsletter</h3>
            <p className="mt-2 text-base leading-7 text-slate-600 max-w-xl"> {/* Increased size */}
              Get the latest updates on new facilities, special offers, and sports events delivered right to your inbox.
            </p>
          </div>
          <form className="mt-6 lg:mt-0 lg:flex-shrink-0 lg:flex lg:items-center lg:justify-end lg:w-1/2">
            <label htmlFor="email-address-footer-enhanced" className="sr-only">
              Email address
            </label>
            <div className="relative rounded-lg shadow-sm w-full max-w-md">
              <input
                id="email-address-footer-enhanced"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full border-0 py-3 pl-4 pr-24 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 rounded-lg transition duration-150 ease-in-out"
                placeholder="Enter your email"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-primary-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors duration-200 ease-in-out"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Bar - Darker Background */}
      <div className="bg-slate-900 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <p className="text-sm leading-5 text-slate-400">
              © {currentYear} SportsBookSL Technologies (Pvt) Ltd. All rights reserved.
            </p>
            {/* Legal links moved up */}
          </div>
        </div>
      </div>
    </footer>
  );
}
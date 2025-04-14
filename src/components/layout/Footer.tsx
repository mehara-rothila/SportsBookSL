'use client';

import Link from 'next/link';
import { useState } from 'react';

const navigation = {
  solutions: [
    { name: 'Facility Booking', href: '/facilities' },
    { name: 'Trainer Booking', href: '/trainers' },
    { name: 'Equipment Rental', href: '/equipment' },
    { name: 'Financial Aid', href: '/financial-aid/apply' },
    { name: 'Donations', href: '/donations' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'System Status', href: '#' },
    { name: 'Report Issue', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
    { name: 'Careers', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
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
      href: '#',
      icon: (props) => (
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
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <footer className="relative" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      
      {/* Curved top shape */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden -translate-y-full pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
          <path fill="#f8fafc" fillOpacity="1" d="M0,192L48,202.7C96,213,192,235,288,224C384,213,480,171,576,165.3C672,160,768,192,864,197.3C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Main Footer */}
      <div className="bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-grid-slate-100 bg-[top_center] opacity-[0.15]"></div>
        
        {/* Animated rings */}
        <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        {/* Main Content Section */}
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:pt-32 lg:px-8 lg:pt-40 relative z-10">
          <div className="xl:grid xl:grid-cols-3 xl:gap-12">
            {/* Branding & Social */}
            <div className="space-y-10">
              <Link href="/" className="inline-block group focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-primary-500 rounded-lg">
                <span className="sr-only">SportsBookSL Home</span>
                {/* Logo SVG */}
                <div className="flex items-center">
                  <div className="w-12 h-12 mr-3 group-hover:scale-110 transition-transform duration-500">
                   
                  </div>
                  <span className="text-4xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent group-hover:from-primary-500 group-hover:to-primary-600 transition-colors duration-300">Sports</span>
                    <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 bg-clip-text text-transparent group-hover:from-secondary-400 group-hover:to-secondary-500 transition-colors duration-300">Book</span>
                    <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent group-hover:from-primary-500 group-hover:to-primary-600 transition-colors duration-300">SL</span>
                  </span>
                </div>
              </Link>
              <p className="text-base leading-relaxed text-slate-600 max-w-md">
                Your ultimate platform for discovering and booking sports facilities across Sri Lanka. 
                Play more, manage less, and connect with a community that shares your passion for sports.
              </p>
              <div className="flex space-x-5">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group relative h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                    aria-label={item.name}
                  >
                    <span className="sr-only">{item.name}</span>
                    <span className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <item.icon className="h-6 w-6 text-slate-500 group-hover:text-white relative z-10 transition-colors duration-300" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            <div className="mt-16 grid grid-cols-2 gap-10 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-10">
                {/* Solutions */}
                <div>
                  <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-wide after:content-[''] after:block after:w-12 after:h-1 after:bg-primary-500 after:rounded-full after:mt-2">Solutions</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.solutions.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-700 hover:font-medium transition-all duration-200 ease-in-out group flex items-center">
                          <span className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 left-0 group-hover:opacity-100 group-hover:relative group-hover:mr-2 transition-all duration-300"></span>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Support */}
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-wide after:content-[''] after:block after:w-12 after:h-1 after:bg-secondary-500 after:rounded-full after:mt-2">Support</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.support.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-700 hover:font-medium transition-all duration-200 ease-in-out group flex items-center">
                          <span className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 left-0 group-hover:opacity-100 group-hover:relative group-hover:mr-2 transition-all duration-300"></span>
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
                  <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-wide after:content-[''] after:block after:w-12 after:h-1 after:bg-purple-500 after:rounded-full after:mt-2">Company</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-700 hover:font-medium transition-all duration-200 ease-in-out group flex items-center">
                          <span className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-primary-500 opacity-0 left-0 group-hover:opacity-100 group-hover:relative group-hover:mr-2 transition-all duration-300"></span>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Legal */}
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-wide after:content-[''] after:block after:w-12 after:h-1 after:bg-slate-400 after:rounded-full after:mt-2">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-slate-600 hover:text-primary-700 hover:font-medium transition-all duration-200 ease-in-out group flex items-center">
                          <span className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-slate-500 to-slate-700 opacity-0 left-0 group-hover:opacity-100 group-hover:relative group-hover:mr-2 transition-all duration-300"></span>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Subscribe Section - Separated Visually with card design */}
          <div className="mt-20 pt-16 border-t border-slate-900/10">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden">
              <div className="p-8 lg:p-12 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center relative z-10">
                  <div>
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-700 backdrop-blur-sm animate-pulse-slow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      STAY UPDATED
                    </div>
                    <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-900">Join our newsletter</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600 max-w-xl">
                      Get the latest updates on new facilities, special offers, and sports events delivered right to your inbox. 
                      No spam, just the good stuff.
                    </p>
                  </div>
                  
                  <div className="mt-8 lg:mt-0">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex flex-col sm:flex-row max-w-lg gap-3">
                        <div className="relative flex-grow">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <input
                            id="email-address-footer-enhanced"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                            className="block w-full border-0 py-3.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm rounded-lg shadow-sm ring-1 ring-inset ring-slate-300 transition duration-150 ease-in-out"
                            placeholder="Enter your email"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting || isSubmitted}
                          className={`${
                            isSubmitted 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800'
                          } text-white py-3.5 px-5 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 whitespace-nowrap font-medium relative overflow-hidden`}
                        >
                          {isSubmitting ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : isSubmitted ? (
                            <>
                              <svg className="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Subscribed!
                            </>
                          ) : (
                            'Subscribe'
                          )}
                          {!isSubmitting && !isSubmitted && (
                            <span className="absolute inset-0 h-full w-full bg-white/[0.08] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-slate-500">
                        By subscribing, you agree to our{' '}
                        <a href="#" className="text-primary-600 hover:text-primary-500 hover:underline">Privacy Policy</a> and{' '}
                        <a href="#" className="text-primary-600 hover:text-primary-500 hover:underline">Terms of Service</a>.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download App Section */}
        <div className="bg-gradient-to-r from-primary-600/95 to-primary-800 relative overflow-hidden">
          {/* Decorative patterns */}
          <div className="absolute inset-0 bg-sports-pattern opacity-10"></div>
          
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 relative z-10">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <span className="block">Ready to book on the go?</span>
                  <span className="block mt-1 text-white/80 text-2xl">Our mobile app is coming soon!</span>
                </h2>
                <p className="mt-4 text-lg text-white/70">
                  Join our waitlist to be the first to know when our mobile app is available. Book facilities, manage reservations, and connect with trainers—all from your phone!
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" className="inline-flex items-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-primary-700 shadow-sm hover:bg-white/90 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.24 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.33-1.94 4.23-3.74 4.25z"></path>
                    </svg>
                    iOS App (Coming Soon)
                  </button>
                  <button type="button" className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.37 20.3C2.83 18.37 2.56 16.35 2.56 14.3c0-2.06.27-4.08.81-6.08.94.26 1.8.7 2.55 1.33.56.47 1.02 1.05 1.34 1.7.95-.94 2.23-1.5 3.63-1.5 1.4 0 2.68.56 3.62 1.5.33-.66.79-1.24 1.35-1.7.76-.63 1.62-1.07 2.56-1.33.54 2 .81 4.02.81 6.08 0 2.05-.27 4.07-.81 6 0 0-7.25 3.5-14.62 0h-.03zm0 0zm7.16-13.96c3.21 0 5.83 2.58 5.85 5.77 0 3.18-2.64 5.77-5.85 5.77-3.22 0-5.85-2.58-5.85-5.77.02-3.19 2.64-5.77 5.85-5.77zm0 2.58c-1.78 0-3.23 1.41-3.24 3.19 0 1.77 1.46 3.22 3.24 3.22 1.76 0 3.24-1.45 3.24-3.22-.01-1.78-1.48-3.22-3.24-3.19z"></path>
                    </svg>
                    Android App (Coming Soon)
                  </button>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80" alt="Mobile app preview" className="w-full max-w-xs mx-auto rounded-2xl shadow-2xl lg:max-w-md transform rotate-3 hover:rotate-0 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Darker Background */}
        <div className="bg-slate-900 py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm leading-5 text-slate-400">
                © {currentYear} SportsBookSL Technologies (Pvt) Ltd. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-slate-400 hover:text-slate-300 transition-colors duration-200">
                  Accessibility
                </a>
                <a href="#" className="text-sm text-slate-400 hover:text-slate-300 transition-colors duration-200">
                  Refund Policy
                </a>
                <a href="#" className="text-sm text-slate-400 hover:text-slate-300 transition-colors duration-200">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
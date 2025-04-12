'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'Trainers', href: '/trainers' },
  { name: 'Financial Aid', href: '/financial-aid' },
  { name: 'Donations', href: '/donations' },
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scrolling position to change header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <Disclosure 
      as="nav" 
      className={`fixed w-full z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" className="flex items-center">
                    <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-600' : 'text-white'} transition-colors duration-200`}>
                      SportsBookSL
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                        isScrolled 
                          ? 'text-gray-500 hover:text-primary-600 hover:border-primary-300' 
                          : 'text-white hover:text-white/80'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
                {isLoggedIn ? (
                  <div className="flex items-center gap-4">
                    <Link 
                      href="/bookings" 
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isScrolled ? 'text-gray-500 hover:text-primary-600' : 'text-white hover:text-white/80'
                      }`}
                    >
                      My Bookings
                    </Link>
                    
                    <div className="relative">
                      <button 
                        type="button"
                        className={`flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </button>
                    </div>
                    
                    <button
                      className={`rounded-md px-3.5 py-2 text-sm font-semibold shadow-sm transition-colors duration-200 ${
                        isScrolled 
                          ? 'bg-white text-primary-600 hover:bg-gray-100 border border-primary-600' 
                          : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                      }`}
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link 
                      href="/login"
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isScrolled ? 'text-gray-500 hover:text-primary-600' : 'text-white hover:text-white/80'
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={`rounded-md px-3.5 py-2 text-sm font-semibold shadow-sm transition-colors duration-200 ${
                        isScrolled 
                          ? 'bg-primary-600 text-white hover:bg-primary-700' 
                          : 'bg-white text-primary-600 hover:bg-gray-100'
                      }`}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
              
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className={`inline-flex items-center justify-center rounded-md p-2 ${
                  isScrolled 
                    ? 'text-gray-400 hover:bg-gray-100 hover:text-gray-500' 
                    : 'text-white hover:bg-white/10 hover:text-white/80'
                  } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500`}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className={`sm:hidden ${isScrolled ? 'bg-white' : 'bg-primary-900'}`}>
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={`block py-2 pl-3 pr-4 text-base font-medium ${
                      isScrolled 
                        ? 'text-gray-600 hover:bg-gray-50 hover:text-primary-600' 
                        : 'text-white hover:bg-primary-800'
                    }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className={`border-t ${isScrolled ? 'border-gray-200' : 'border-primary-800'} pb-3 pt-4`}>
                {isLoggedIn ? (
                  <div>
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className={`text-base font-medium ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Tom Cook</div>
                        <div className={`text-sm ${isScrolled ? 'text-gray-500' : 'text-primary-200'}`}>tom@example.com</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Disclosure.Button
                        as="a"
                        href="/profile"
                        className={`block px-4 py-2 text-base font-medium ${
                          isScrolled 
                            ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' 
                            : 'text-white hover:bg-primary-800'
                        }`}
                      >
                        Your Profile
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="/bookings"
                        className={`block px-4 py-2 text-base font-medium ${
                          isScrolled 
                            ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' 
                            : 'text-white hover:bg-primary-800'
                        }`}
                      >
                        My Bookings
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className={`block px-4 py-2 text-base font-medium ${
                          isScrolled 
                            ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' 
                            : 'text-white hover:bg-primary-800'
                        }`}
                        onClick={() => setIsLoggedIn(false)}
                      >
                        Sign out
                      </Disclosure.Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col px-4 space-y-3">
                    <Link
                      href="/login"
                      className={`text-base font-medium ${isScrolled ? 'text-gray-600' : 'text-white'}`}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={`inline-flex justify-center rounded-md px-3.5 py-2 text-sm font-semibold shadow-sm ${
                        isScrolled 
                          ? 'bg-primary-600 text-white hover:bg-primary-700' 
                          : 'bg-white text-primary-600 hover:bg-gray-100'
                      }`}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
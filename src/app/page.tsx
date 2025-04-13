import Hero from '../components/home/Hero';
import FeaturedFacilities from '../components/home/FeaturedFacilities';
import SportCategories from '../components/home/SportCategories';
import TestimonialSlider from '../components/home/TestimonialSlider';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <SportCategories />
      <FeaturedFacilities />
      
      {/* Weather Integration Highlight - Enhanced Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-sky-100 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-equipment-pattern opacity-40"></div>
        
        {/* Animated cloud icons */}
        <div className="absolute top-10 left-10 text-blue-200 opacity-30 animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 text-blue-200 opacity-30 animate-float animation-delay-1000">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        
        {/* Animated sun */}
        <div className="absolute top-20 right-20 text-yellow-300 opacity-20 animate-pulse-slow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              SMART FEATURE
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">Smart Weather Integration</h2>
            <div className="flex justify-center mt-4">
              <div className="w-20 h-1 bg-blue-500 rounded"></div>
            </div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Never waste a trip to an outdoor facility during bad weather. Our platform intelligently recommends facilities based on real-time conditions.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-x-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="max-w-md mx-auto md:mx-0 space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg animate-bounce-subtle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Real-Time Weather Analysis</h3>
                  </div>
                  <p className="text-gray-600">
                    Our platform continuously monitors weather conditions at all outdoor facilities, ensuring you're never caught in unexpected rain or extreme heat.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-105 ml-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg animate-bounce-subtle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Suitability Scoring</h3>
                  </div>
                  <p className="text-gray-600">
                    Each facility receives a dynamic suitability score based on current weather conditions, helping you make informed booking decisions.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg animate-bounce-subtle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Smart Alternatives</h3>
                  </div>
                  <p className="text-gray-600">
                    When weather affects your planned facility, we automatically suggest suitable indoor alternatives nearby, so your training never stops.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden shine-effect">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl text-gray-800">Cricket Ground - Colombo</h3>
                    <span className="bg-yellow-100 text-yellow-800 font-medium px-3 py-1 rounded-full text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Moderate Suitability
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <div className="flex items-center">
                    <svg className="h-16 w-16 text-white mr-6 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                    </svg>
                    <div>
                      <p className="text-3xl font-bold">26°C</p>
                      <p className="text-white/80">Partly Cloudy</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-medium">Wind: 15 km/h</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <p className="font-medium">Chance of Rain: 30%</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    <h4 className="font-semibold text-lg text-gray-800">Alternative Indoor Facilities:</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 border border-green-200 bg-green-50 rounded-lg flex items-center justify-between transform transition-all duration-300 hover:shadow-md hover:scale-102 cursor-pointer">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-800">Colombo Indoor Cricket Arena</span>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Available
                      </span>
                    </div>
                    <div className="p-4 border border-green-200 bg-green-50 rounded-lg flex items-center justify-between transform transition-all duration-300 hover:shadow-md hover:scale-102 cursor-pointer">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-800">National Sports Complex</span>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Available
                      </span>
                    </div>
                  </div>
                  
                  <button className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Alternative Facility
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expanded Features Section - Enhanced */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Geometric pattern background */}
        <div className="absolute inset-0 bg-equipment-pattern opacity-30"></div>
        
        {/* Decorative blobs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 inline-block mb-4">KEY FEATURES</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose SportsBookSL?</h2>
            <div className="flex justify-center mt-4 mb-4">
              <div className="w-20 h-1 bg-primary-600 rounded"></div>
            </div>
            <p className="text-lg text-gray-600 mx-auto">
              Our platform offers a comprehensive solution for all your sports facility needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 - Facility Discovery */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-100 rounded-2xl blur opacity-30 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.02] relative">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary-800 transition-colors duration-300">Facility Discovery</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Find the perfect sports facility with advanced search and filtering options</p>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-primary-600 font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    Explore feature
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Feature 2 - Real-Time Booking */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-200 to-secondary-100 rounded-2xl blur opacity-30 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.02] relative">
                <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary-200 transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-600 group-hover:text-secondary-700 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-secondary-800 transition-colors duration-300">Real-Time Booking</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Book facilities instantly with our real-time availability calendar</p>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-secondary-600 font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    Explore feature
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Feature 3 - Transportation */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-100 rounded-2xl blur opacity-30 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.02] relative">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-800 transition-colors duration-300">Transportation</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Coordinated transportation to and from facilities, always on time</p>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-blue-600 font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    Explore feature
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Feature 4 - Equipment */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-100 rounded-2xl blur opacity-30 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.02] relative">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-800 transition-colors duration-300">Equipment Rental</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Rent quality sports equipment alongside your facility booking</p>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-purple-600 font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    Explore feature
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Support & Donations Section - Enhanced */}
      <section className="py-24 bg-gradient-to-r from-primary-50 to-purple-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-sports-dots opacity-40"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 inline-block mb-4">TALENT SUPPORT</span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Supporting Talented Athletes</h2>
            <div className="flex justify-center mt-4 mb-4">
              <div className="w-20 h-1 bg-primary-600 rounded"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe financial constraints should never limit sporting talent. Our platform connects promising athletes with sponsors.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-primary-100 rounded-bl-full opacity-50"></div>
                  <div className="flex">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mr-5 animate-bounce-subtle">
                      <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="relative">
                      <h3 className="font-bold text-xl mb-2 text-gray-800">Financial Aid Program</h3>
                      <p className="text-gray-600">
                        Talented athletes can apply for sponsored facility access based on merit. Our program assesses achievements and potential to allocate resources where they'll make the biggest impact.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden ml-6">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-primary-100 rounded-bl-full opacity-50"></div>
                  <div className="flex">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mr-5 animate-bounce-subtle">
                      <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="relative">
                      <h3 className="font-bold text-xl mb-2 text-gray-800">Donation Portal</h3>
                      <p className="text-gray-600">
                        Sponsors can browse athlete profiles and provide direct support with full transparency. Our platform ensures 100% of donations reach talented athletes needing assistance.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-primary-100 rounded-bl-full opacity-50"></div>
                  <div className="flex">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mr-5 animate-bounce-subtle">
                      <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="relative">
                      <h3 className="font-bold text-xl mb-2 text-gray-800">Transparent Impact</h3>
                      <p className="text-gray-600">
                        Track how your donation helps athletes achieve their goals with detailed progress reports and achievement tracking. See the direct impact of your contribution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button className="bg-primary-600 text-white hover:bg-primary-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Support an Athlete
                </button>
                <button className="bg-white text-primary-600 hover:bg-primary-50 border border-primary-200 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Apply for Support
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden shine-effect">
                <div className="p-6 border-b relative overflow-hidden bg-gradient-to-r from-primary-50 to-purple-50">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-primary-200 rounded-bl-full opacity-20"></div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Featured Athletes Seeking Support</h3>
                  <p className="text-gray-600">Meet talented athletes who need your support to continue their journey</p>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Athlete Card 1 */}
                  <div className="flex p-4 border rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.01]">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80")' }}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">Malith Jayawardene</h4>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Cricket</span>
                      </div>
                      <p className="text-sm text-gray-500">Age 17 | National Youth Player</p>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-primary-600 h-2.5 rounded-full w-3/5 relative">
                            <div className="absolute inset-0 bg-white/20 overflow-hidden rounded-full shine-effect"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="font-medium text-gray-700">Rs. 30,000 raised</span>
                          <span className="text-gray-500">Rs. 50,000 goal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Athlete Card 2 */}
                  <div className="flex p-4 border rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.01]">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80")' }}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">Tharushi Silva</h4>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Swimming</span>
                      </div>
                      <p className="text-sm text-gray-500">Age 15 | Junior Champion</p>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-primary-600 h-2.5 rounded-full w-2/5 relative">
                            <div className="absolute inset-0 bg-white/20 overflow-hidden rounded-full shine-effect"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="font-medium text-gray-700">Rs. 20,000 raised</span>
                          <span className="text-gray-500">Rs. 45,000 goal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Athlete Card 3 */}
                  <div className="flex p-4 border rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.01]">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80")' }}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">Raj Patel</h4>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Basketball</span>
                      </div>
                      <p className="text-sm text-gray-500">Age 16 | School Team Captain</p>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-primary-600 h-2.5 rounded-full w-1/5 relative">
                            <div className="absolute inset-0 bg-white/20 overflow-hidden rounded-full shine-effect"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="font-medium text-gray-700">Rs. 10,000 raised</span>
                          <span className="text-gray-500">Rs. 40,000 goal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 text-center">
                  <a href="/donations" className="text-primary-600 font-medium hover:text-primary-800 flex items-center justify-center transition-all duration-300 hover:scale-105">
                    View all athletes needing support
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialSlider />
      
      {/* Enhanced Call to Action */}
      <section className="py-24 bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-sports-pattern opacity-10"></div>
        
        {/* Animated elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full opacity-5 animate-blob animation-delay-2000"></div>
        
        {/* Sports equipment outline decorations */}
        <div className="absolute top-20 right-20 w-20 h-20 border-2 border-white/10 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-white/10 rounded-full opacity-20"></div>
        <div className="absolute top-40 left-1/3 w-16 h-6 border-2 border-white/10 rounded-full opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-sm mb-6">
            GET STARTED TODAY
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in-down">Ready to elevate your sports experience?</h2>
          <div className="flex justify-center mb-8">
            <div className="w-20 h-1 bg-secondary-500 rounded"></div>
          </div>
          
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-12">
            Join SportsBookSL today and connect with the best sports facilities across Sri Lanka. Book facilities, coordinate transportation, find equipment, and support talented athletes all on one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Facility
              <div className="absolute inset-0 w-full h-full rounded-xl border-2 border-white scale-105 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
            </button>
            
            <button className="bg-transparent hover:bg-primary-600 border-2 border-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Learn More
              <div className="absolute inset-0 w-full h-full rounded-xl border-2 border-white scale-105 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
            </button>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm">Real-time Availability</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm">Secure Payments</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm">Verified Facilities</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
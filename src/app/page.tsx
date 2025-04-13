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
      
      {/* Weather Integration Highlight - New Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-sky-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="max-w-md mx-auto md:mx-0">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Smart Weather Integration</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Never waste a trip to an outdoor facility during bad weather. Our platform provides:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Real-time weather forecasts for all training locations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Facility suitability scores based on current conditions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Smart indoor alternatives during adverse weather</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Cricket Ground - Colombo</h3>
                  <span className="text-yellow-600 font-medium">Moderate Suitability</span>
                </div>
                <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-12 w-12 text-blue-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                    </svg>
                    <div>
                      <p className="text-xl font-bold">26°C</p>
                      <p className="text-sm text-gray-500">Partly Cloudy</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Wind: 15 km/h</p>
                    <p className="text-sm font-medium">Chance of Rain: 30%</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Alternative Indoor Facilities:</p>
                  <div className="space-y-2">
                    <div className="p-3 border border-green-200 bg-green-50 rounded flex items-center justify-between">
                      <span>Colombo Indoor Cricket Arena</span>
                      <span className="text-green-600 font-medium">Available</span>
                    </div>
                    <div className="p-3 border border-green-200 bg-green-50 rounded flex items-center justify-between">
                      <span>National Sports Complex</span>
                      <span className="text-green-600 font-medium">Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expanded Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Why Choose SportsBookSL?</h2>
          <p className="text-lg text-center mx-auto max-w-2xl mb-12 text-gray-600">
            Our platform offers a comprehensive solution for all your sports facility needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Facility Discovery</h3>
              <p className="text-gray-600">Find the perfect sports facility with advanced search and filtering options</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Booking</h3>
              <p className="text-gray-600">Book facilities instantly with our real-time availability calendar</p>
            </div>
            
            {/* Feature 3 - Transportation */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transportation</h3>
              <p className="text-gray-600">Coordinated transportation to and from facilities, always on time</p>
            </div>
            
            {/* Feature 4 - Equipment */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipment Rental</h3>
              <p className="text-gray-600">Rent quality sports equipment alongside your facility booking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Support & Donations Section - New */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Supporting Talented Athletes</h2>
              <p className="text-lg mb-6">
                We believe financial constraints should never limit sporting talent. Our platform connects promising athletes with sponsors through:
              </p>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Financial Aid Program</h3>
                    <p className="text-gray-600">Talented athletes can apply for sponsored facility access</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Donation Portal</h3>
                    <p className="text-gray-600">Sponsors can browse athlete profiles and provide direct support</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Transparent Impact</h3>
                    <p className="text-gray-600">Track how your donation helps athletes achieve their goals</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="bg-primary-600 text-white hover:bg-primary-700 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Support an Athlete
                </button>
                <button className="ml-4 text-primary-600 hover:text-primary-800 font-semibold py-3 px-6 transition-colors">
                  Apply for Support
                </button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-bold mb-2">Featured Athletes Seeking Support</h3>
                  <p className="text-gray-600">Meet talented athletes who need your support to continue their journey</p>
                </div>
                <div className="p-6 space-y-4">
                  {/* Athlete Card 1 */}
                  <div className="flex p-4 border rounded-lg hover:bg-gray-50">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <h4 className="font-semibold">Malith Jayawardene</h4>
                      <p className="text-sm text-gray-500">Cricket | Age 17</p>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-600 h-2 rounded-full w-3/5"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Rs. 30,000 raised</span>
                          <span>Rs. 50,000 goal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Athlete Card 2 */}
                  <div className="flex p-4 border rounded-lg hover:bg-gray-50">
                    <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <h4 className="font-semibold">Tharushi Silva</h4>
                      <p className="text-sm text-gray-500">Swimming | Age 15</p>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-600 h-2 rounded-full w-2/5"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Rs. 20,000 raised</span>
                          <span>Rs. 45,000 goal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 text-center">
                  <a href="/donations" className="text-primary-600 font-medium hover:text-primary-800">
                    View all athletes needing support →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialSlider />
      
      {/* Enhanced Call to Action */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to elevate your sports experience?</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Join SportsBookSL today and connect with the best sports facilities across Sri Lanka
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
              Book a Facility
            </button>
            <button className="bg-transparent hover:bg-primary-600 border border-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
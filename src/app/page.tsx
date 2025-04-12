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
      <TestimonialSlider />
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Why Choose SportsBookSL?</h2>
          <p className="section-subtitle text-center mx-auto">
            Our platform offers a comprehensive solution for all your sports facility needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Feature 1 */}
            <div className="card text-center p-8">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Discovery</h3>
              <p className="text-gray-600">Find the perfect sports facility with our advanced search and filtering options</p>
            </div>
            
            {/* Feature 2 */}
            <div className="card text-center p-8">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Booking</h3>
              <p className="text-gray-600">Book facilities instantly with our real-time availability calendar</p>
            </div>
            
            {/* Feature 3 */}
            <div className="card text-center p-8">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Program</h3>
              <p className="text-gray-600">Financial assistance for talented athletes to access quality training facilities</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
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
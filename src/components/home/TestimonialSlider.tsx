'use client';

import { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    id: 1,
    content: "SportsBookSL has transformed how our cricket team practices. We used to spend hours calling different venues to check availability, but now we can see everything at a glance and book instantly. The platform has saved us valuable time that we can now spend on actual training.",
    author: "Sanjay Perera",
    role: "Captain, Colombo Cricket Club",
    imageUrl: "/images/testimonialSlider/photo-1599566150163-29194dcaad36.jpg",
  },
  {
    id: 2,
    content: "As a swimming coach, I love how easy it is to find and book pool time for my students. The platform is intuitive and the booking system is reliable. I can now focus on my students' technique rather than administrative tasks. Highly recommended for all sports professionals!",
    author: "Amali Fernando",
    role: "National Swimming Coach",
    imageUrl: "/images/testimonialSlider/photo-1494790108377-be9c29b29330.jpg",
  },
  {
    id: 3,
    content: "The financial aid program on SportsBookSL has been a game-changer for our school's athletics program. We've been able to access quality training facilities that were previously out of our budget. Our students now have the opportunity to train in professional environments.",
    author: "Ravi Gunawardena",
    role: "Sports Director, National School",
    imageUrl: "/images/testimonialSlider/photo-1507003211169-0a1dd7228f2d.jpg",
  },
  {
    id: 4,
    content: "Finding badminton courts used to be such a hassle, but with SportsBookSL, I can book courts near me with just a few clicks. The rating system helps me choose quality facilities, and I appreciate being able to see actual photos before booking.",
    author: "Priyanka Jayawardene",
    role: "Amateur Badminton Player",
    imageUrl: "/images/testimonialSlider/photo-1580489944761-15a19d654956.jpg",
  },
  {
    id: 5,
    content: "As a facility owner, SportsBookSL has helped us increase our court bookings by over 40%. The platform makes our tennis facilities visible to a wider audience, and the booking management system is straightforward and reliable.",
    author: "Malik Rahman",
    role: "Owner, Kandy Tennis Club",
    imageUrl: "/images/testimonialSlider/photo-1472099645785-5658abf4ff4e.jpg",
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);
  
  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);
  
  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  // Handle transition end
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with the CSS transition duration
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  
  const getSlideClass = (index: number) => {
    if (index === currentIndex) {
      return 'opacity-100 translate-x-0 z-20';
    }
    
    // Previous slide
    if (
      (index === currentIndex - 1) || 
      (currentIndex === 0 && index === testimonials.length - 1)
    ) {
      return `opacity-0 -translate-x-full z-10 ${direction === 'left' && isTransitioning ? 'transition-transform duration-500' : ''}`;
    }
    
    // Next slide
    if (
      (index === currentIndex + 1) || 
      (currentIndex === testimonials.length - 1 && index === 0)
    ) {
      return `opacity-0 translate-x-full z-10 ${direction === 'right' && isTransitioning ? 'transition-transform duration-500' : ''}`;
    }
    
    return 'opacity-0 translate-x-full z-0';
  };
  
  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 to-primary-700 relative overflow-hidden">
      {/* Sports-themed background elements */}
      <div className="absolute inset-0 bg-sports-pattern opacity-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white rounded-full opacity-5"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white rounded-full opacity-5"></div>
      
      {/* Sports equipment outline decorations */}
      <div className="absolute top-20 right-20 w-20 h-20 border-2 border-white/20 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-40 w-16 h-16 border-2 border-white/20 rounded-full opacity-20 animate-float animation-delay-2000"></div>
      <div className="absolute top-40 left-96 w-24 h-8 border-2 border-white/20 rounded-full opacity-20 animate-float animation-delay-1000"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white inline-block mb-4 backdrop-blur-sm">TESTIMONIALS</span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What our users say
          </h2>
          <div className="flex justify-center mt-4 mb-6">
            <div className="w-20 h-1 bg-secondary-500 rounded"></div>
          </div>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-white/80">
            Hear from athletes, coaches, and facility owners who are transforming Sri Lanka's sports scene
          </p>
        </div>
        
        <div className="mt-12 relative">
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 md:-left-6">
            <button 
              onClick={prevSlide}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 transform hover:scale-110 shadow-lg"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 md:-right-6">
            <button 
              onClick={nextSlide}
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 transform hover:scale-110 shadow-lg"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Testimonial Slider */}
          <div className="relative h-[420px] md:h-[380px] mx-auto max-w-4xl">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${getSlideClass(index)}`}
              >
                <div className="h-full flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Image Column (hidden on mobile) */}
                  <div className="hidden md:block md:w-2/5 h-full bg-primary-100 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center animate-ken-burns"
                      style={{ backgroundImage: `url(${testimonial.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-300/80 to-transparent" />
                    
                    {/* Sport-themed decorative elements */}
                    <div className="absolute top-4 left-4 w-16 h-16 border-2 border-primary-300 rounded-full opacity-20"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-primary-300 rounded-full opacity-20"></div>
                    <div className="absolute top-1/3 right-1/3 w-16 h-4 border-2 border-primary-300 rounded-full opacity-20"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center">
                    {/* Quote mark */}
                    <div className="relative mb-6">
                      <svg className="h-12 w-12 text-primary-200 absolute -top-4 -left-2" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <div className="h-1 w-16 bg-primary-500 rounded-full ml-10 mb-4"></div>
                    </div>
                    
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                    
                    {/* Small profile image (mobile only) */}
                    <div className="md:hidden mt-6 mb-3 flex justify-center">
                      <div className="h-16 w-16 rounded-full overflow-hidden ring-4 ring-primary-100">
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.author}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-8 flex items-center">
                      <div className="mr-4 hidden md:block">
                        <div className="h-12 w-12 rounded-full overflow-hidden ring-4 ring-primary-100">
                          <img
                            src={testimonial.imageUrl}
                            alt={testimonial.author}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-primary-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center space-x-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setDirection(index > currentIndex ? 'right' : 'left');
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }}
                className={`h-3 transition-all duration-300 rounded-full ${
                  currentIndex === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/70 w-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decoration - stylized sports court lines */}
      <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden opacity-10">
        <div className="w-full h-px bg-white"></div>
        <div className="absolute bottom-12 left-1/2 w-24 h-24 border-4 border-white rounded-full transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-px h-24 bg-white"></div>
        <div className="absolute bottom-0 right-1/4 w-px h-24 bg-white"></div>
      </div>
    </section>
  );
}
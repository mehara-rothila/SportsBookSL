
import Hero from '../components/home/Hero';
import FeaturedFacilities from '../components/home/FeaturedFacilities';
import SportCategories from '../components/home/SportCategories';
import TestimonialSlider from '../components/home/TestimonialSlider';

export default function Home() {
  return (
    // FIX: Added the missing opening '<' bracket here
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-primary-800 to-purple-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-5xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-5xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-5xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Floating sports equipment silhouettes */}
        <div className="absolute top-20 right-20 text-white/10 animate-float">
          <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.5 0c-6.621 0-12 5.379-12 12s5.379 12 12 12 12-5.379 12-12-5.379-12-12-12zm-2 20c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 2c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm-2-4c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 left-10 text-white/10 animate-float animation-delay-2000">
          <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.949 10.112c-.522-4.569-4.691-7.892-9.327-7.892-3.363 0-6.419 1.741-8.109 4.582-.316.532-.102 1.209.475 1.461.288.126.609.111.872-.051.39-.239.566-.722.42-1.121.126-.433.288-.847.5-1.241 1.324-2.472 3.988-4.013 6.842-4.013 3.458 0 6.519 2.219 7.508 5.376-2.289.446-4.416 1.584-6.071 3.287l-3.422-3.199c-.257-.24-.662-.223-.917.037l-7.124 7.214c-.255.259-.249.673.012.932l5.424 5.358c.259.255.674.249.932-.012l7.214-7.124c.26-.257.277-.66.037-.917l-3.414-3.427c1.369-1.209 3.077-1.996 4.922-2.245.645 1.722.749 3.576.357 5.337-.116.521.154 1.045.629 1.235.517.208 1.131.003 1.389-.492.9-1.734 1.234-3.595 1.151-5.186z"/>
          </svg>
        </div>

        {/* Content container */}
        <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-5xl mx-auto text-center">
            {/* Enhanced headline with gradient text */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-down">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200">
                Book Sports Facilities
              </span>
              <br />
              <span className="text-white">
                Across Sri Lanka
              </span>
            </h1>

            {/* Improved subheadline */}
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
              Discover and book the best sports facilities, equipment, and trainers for your next training session or match.
            </p>

                      {/* Enhanced search box with glass effect */}
                      <div className="relative max-w-3xl mx-auto mb-12 rounded-2xl bg-white/10 backdrop-blur-md p-2 border border-white/20 shadow-2xl transform hover:scale-[1.01] transition-all duration-300 animate-fade-in-up animation-delay-500">
              <div className="flex flex-col md:flex-row gap-2">
                {/* ... other input ... */}
                <div className="md:w-48">
                  <select
                    // FIX: Added defaultValue prop here
                    defaultValue=""
                    className="block w-full bg-white/10 backdrop-blur-md border-0 px-3 py-4 rounded-xl text-white appearance-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all duration-300"
                  >
                    {/* FIX: Removed 'selected' attribute from this option */}
                    <option value="" disabled className="text-gray-800">Sport Type</option>
                    <option value="cricket" className="text-gray-800">Cricket</option>
                    <option value="tennis" className="text-gray-800">Tennis</option>
                    <option value="swimming" className="text-gray-800">Swimming</option>
                    <option value="basketball" className="text-gray-800">Basketball</option>
                    <option value="football" className="text-gray-800">Football</option>
                  </select>
                </div>
                {/* ... search button ... */}
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-700">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Real-time Availability
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant Booking
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                Weather Integration
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium flex items-center">
                <svg className="w-4 h-4 mr-2 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Financial Aid
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <a href="#sport-categories" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-colors duration-300 hover:bg-white/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Wave overlay for transition to next section */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#F9FAFB" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Sport Categories Section - Reimagined */}
      <section id="sport-categories" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-sports-pattern opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced header with animated accent */}
          <div className="text-center mb-16 relative">
            <div className="inline-block mb-3">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500/10 to-primary-500/10 text-primary-700 backdrop-blur-sm animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                EXPLORE BY CATEGORY
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Perfect Sport</span>
            </h2>

            {/* Animated bar */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-1 bg-primary-200 rounded-l-full"></div>
              <div className="w-10 h-1 bg-primary-400 animate-pulse-slow"></div>
              <div className="w-16 h-1 bg-primary-600 rounded-r-full"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're into team sports or individual athletics, find and book the perfect facilities for your passion
            </p>
          </div>

          {/* Enhanced sport categories grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {/* Cricket */}
            <div className="group relative h-60 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-primary-700 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Sports equipment illustration overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 text-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.511 21.83c-.297.014-.579-.145-.747-.414-.525-.842-1.162-1.862-1.971-3.151l-1.01-1.619-1.585 1.005c-1.233.779-2.129 1.346-2.917 1.834-.361.224-.831.163-1.131-.135-.298-.295-.35-.754-.153-1.125.483-.908 1.104-2.063 1.979-3.688l1.026-1.936-1.911-1.02c-1.639-.873-2.718-1.452-3.55-1.895-.37-.198-.561-.613-.481-1.013.08-.403.381-.714.778-.8 1.057-.235 2.369-.527 4.231-.941l2.195-.487.49-2.215c.409-1.828.706-3.115.965-4.148.117-.458.537-.77 1.023-.779.481-.009.92.288 1.052.74.285 1.055.636 2.36 1.133 4.201l.579 2.166 2.153-.583c1.837-.5 3.143-.856 4.223-1.143.476-.124.964.138 1.127.592.162.453-.034.962-.452 1.176-.888.456-1.982 1.015-3.547 1.817l-1.838.94.933 1.84c.792 1.563 1.345 2.661 1.797 3.549.2.395.125.866-.19 1.178-.316.311-.784.411-1.182.218-.877-.424-1.957-.944-3.522-1.698l-1.83-.883-.882 1.83c-.747 1.566-1.266 2.668-1.688 3.541z"/>
                </svg>
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-1">Cricket</h3>
                <p className="text-white/80 text-sm mb-4 max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Book professional cricket grounds and practice nets across Sri Lanka
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-white bg-white/20 px-2.5 py-1 rounded-full">150+ Facilities</span>
                  <span className="text-white text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
                  </span>
                </div>
              </div>
              <a href="/facilities?sport=cricket" className="absolute inset-0 z-10" aria-label="Explore Cricket Facilities"></a>
            </div>

            {/* Swimming */}
            <div className="group relative h-60 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-700 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600965962323-6364f9754910?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Sports equipment illustration overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 text-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 6c0-1.505.78-3.08 2-4 .5-.4 1.5-.4 2 0 1.22.92 2 2.495 2 4v12c0 1.505-.78 3.08-2 4-.5.4-1.5.4-2 0-1.22-.92-2-2.495-2-4V6zm2 0c0 .828.672 1.5 1.5 1.5S7 6.828 7 6c0-.828-.672-1.5-1.5-1.5S4 5.172 4 6zm0 12c0 .828.672 1.5 1.5 1.5S7 18.828 7 18c0-.828-.672-1.5-1.5-1.5S4 17.172 4 18zm9-12c0-1.505.78-3.08 2-4 .5-.4 1.5-.4 2 0 1.22.92 2 2.495 2 4v12c0 1.505-.78 3.08-2 4-.5.4-1.5.4-2 0-1.22-.92-2-2.495-2-4V6zm2 0c0 .828.672 1.5 1.5 1.5S18 6.828 18 6c0-.828-.672-1.5-1.5-1.5S15 5.172 15 6zm0 12c0 .828.672 1.5 1.5 1.5S18 18.828 18 18c0-.828-.672-1.5-1.5-1.5S15 17.172 15 18zM7 7h8c.552 0 1 .448 1 1v8c0 .552-.448 1-1 1H7c-.552 0-1-.448-1-1V8c0-.552.448-1 1-1z"/>
                </svg>
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-1">Swimming</h3>
                <p className="text-white/80 text-sm mb-4 max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Access premium swimming pools and aquatic centers for training and recreation
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-white bg-white/20 px-2.5 py-1 rounded-full">90+ Facilities</span>
                  <span className="text-white text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
                  </span>
                </div>
              </div>
              <a href="/facilities?sport=swimming" className="absolute inset-0 z-10" aria-label="Explore Swimming Facilities"></a>
            </div>

            {/* Football */}
            <div className="group relative h-60 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-700 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1508098682722-e99c643e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Sports equipment illustration overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 text-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 3.3l1.35-.95c1.82.56 3.37 1.76 4.38 3.34l-.39 1.34-1.35.46L13 6.7V5.3zm-3.35-.95L11 5.3v1.4L7.01 9.49l-1.35-.46-.39-1.34c1.01-1.57 2.56-2.77 4.38-3.34zM4.56 9.88l.39-1.34 1.35.46 1.97 3.46-1.4 1.08-.98.1c-.82-1.37-1.3-2.94-1.33-4.76zm3.49 8.72c-1.33-.09-2.43-1.05-2.99-2.27l.98-.1 1.4-1.08 3.35 1.69.08 1.42-.89 1c-.56-.21-1.17-.4-1.93-.66zm3.95.8l.89-1-.08-1.42 3.35-1.69 1.4 1.08.98.1c-.56 1.22-1.65 2.18-2.99 2.27-.76.26-1.37.45-1.93.66zm6.04-4.4l-1.4-1.08 1.97-3.46 1.35-.46.39 1.34c-.03 1.82-.51 3.39-1.33 4.76l-.98-.1z"/>
                </svg>
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-1">Football</h3>
                <p className="text-white/80 text-sm mb-4 max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Book full-size football pitches and training grounds for matches and practice
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-white bg-white/20 px-2.5 py-1 rounded-full">120+ Facilities</span>
                  <span className="text-white text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
                  </span>
                </div>
              </div>
              <a href="/facilities?sport=football" className="absolute inset-0 z-10" aria-label="Explore Football Facilities"></a>
            </div>

            {/* Tennis */}
            <div className="group relative h-60 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 to-orange-700 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Sports equipment illustration overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 text-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.52 2.49c-2.34-2.34-6.14-2.34-8.48 0-2.34 2.34-2.34 6.14 0 8.48 2.34 2.34 6.14 2.34 8.48 0s2.34-6.14 0-8.48zM5.01 22.99l12.98-12.98c-2.1 1.44-4.99 1.25-6.89-.64-1.9-1.9-2.08-4.78-.64-6.89L7 5.01v17.98h-1.99z"/>
                </svg>
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-1">Tennis</h3>
                <p className="text-white/80 text-sm mb-4 max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Reserve quality tennis courts with various surfaces for practice and matches
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-white bg-white/20 px-2.5 py-1 rounded-full">85+ Facilities</span>
                  <span className="text-white text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
                  </span>
                </div>
              </div>
              <a href="/facilities?sport=tennis" className="absolute inset-0 z-10" aria-label="Explore Tennis Facilities"></a>
            </div>

            {/* Basketball */}
            <div className="group relative h-60 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-red-700 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518063319789-7217e6706b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Sports equipment illustration overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 text-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                </svg>
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-1">Basketball</h3>
                <p className="text-white/80 text-sm mb-4 max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Book indoor and outdoor basketball courts with professional equipment
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-white bg-white/20 px-2.5 py-1 rounded-full">75+ Facilities</span>
                  <span className="text-white text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
                  </span>
                </div>
              </div>
              <a href="/facilities?sport=basketball" className="absolute inset-0 z-10" aria-label="Explore Basketball Facilities"></a>
            </div>

            {/* Badminton */}
            <div className="group relative h-60 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Sports equipment illustration overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 text-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.79 13.29l-3.08-3.08a1 1 0 0 1 0-1.42l8.5-8.5a1 1 0 0 1 1.42 0l3.08 3.08a1 1 0 0 1 0 1.42l-8.5 8.5a1 1 0 0 1-1.42 0zm9.21-9.21l-1.42-1.42-8.5 8.5 1.42 1.42 8.5-8.5zM4.21 21.79l-2-2a1 1 0 0 1 0-1.41L13.5 7.09l2 2-11.29 11.29a1 1 0 0 1-1.41 0zM19.5 2.5l2 2-16 16-2-2 16-16z"/>
                </svg>
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-1">Badminton</h3>
                <p className="text-white/80 text-sm mb-4 max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Reserve professional badminton courts for singles or doubles matches
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-white bg-white/20 px-2.5 py-1 rounded-full">65+ Facilities</span>
                  <span className="text-white text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
                  </span>
                </div>
              </div>
              <a href="/facilities?sport=badminton" className="absolute inset-0 z-10" aria-label="Explore Badminton Facilities"></a>
            </div>

            {/* Athletics */}
            <div className="group relative h-60 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534860741060-ee15f0438609?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Sports equipment illustration overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 text-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                </svg>
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-1">Athletics</h3>
                <p className="text-white/80 text-sm mb-4 max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Access professional running tracks and athletic fields for training
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-white bg-white/20 px-2.5 py-1 rounded-full">45+ Facilities</span>
                  <span className="text-white text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">Explore</span>
                  </span>
                </div>
              </div>
              <a href="/facilities?sport=athletics" className="absolute inset-0 z-10" aria-label="Explore Athletics Facilities"></a>
            </div>

            {/* View All Card */}
            <div className="group relative h-60 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary-700 to-indigo-800 transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
              <div className="absolute inset-0 bg-sports-pattern opacity-5"></div>

              {/* Animated sports equipment illustrations */}
              <div className="absolute top-6 right-6 w-12 h-12 text-white/10 animate-float">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                </svg>
              </div>
              <div className="absolute bottom-6 left-6 w-14 h-14 text-white/10 animate-float animation-delay-2000">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.52 2.49c-2.34-2.34-6.14-2.34-8.48 0-2.34 2.34-2.34 6.14 0 8.48 2.34 2.34 6.14 2.34 8.48 0s2.34-6.14 0-8.48zM5.01 22.99l12.98-12.98c-2.1 1.44-4.99 1.25-6.89-.64-1.9-1.9-2.08-4.78-.64-6.89L7 5.01v17.98h-1.99z"/>
                </svg>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-white/5 animate-pulse-slow">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.79 13.29l-3.08-3.08a1 1 0 0 1 0-1.42l8.5-8.5a1 1 0 0 1 1.42 0l3.08 3.08a1 1 0 0 1 0 1.42l-8.5 8.5a1 1 0 0 1-1.42 0zm9.21-9.21l-1.42-1.42-8.5 8.5 1.42 1.42 8.5-8.5zM4.21 21.79l-2-2a1 1 0 0 1 0-1.41L13.5 7.09l2 2-11.29 11.29a1 1 0 0 1-1.41 0zM19.5 2.5l2 2-16 16-2-2 16-16z"/>
                </svg>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Explore All Sports</h3>
                <p className="text-white/70 text-sm max-w-xs mb-6">
                  Discover all 20+ sports categories and find the perfect facilities for your passion
                </p>
                <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/30 text-white text-sm font-medium bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  View All Categories
                </span>
              </div>
              <a href="/facilities" className="absolute inset-0 z-10" aria-label="View All Sports Categories"></a>
            </div>
          </div>

          {/* Bottom call-to-action */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">Can't find your favorite sport? We're constantly adding new facilities.</p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105">
              Request a New Sport Category
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Curvy separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#F0F7FF" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,122.7C672,96,768,64,864,74.7C960,85,1056,139,1152,144C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Featured Facilities Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-sports-dots opacity-5"></div>
        <div className="absolute -left-40 top-1/4 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -right-40 bottom-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced header with animation */}
          <div className="text-center mb-16 relative">
            <div className="inline-block mb-3">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-indigo-700 backdrop-blur-sm animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                TOP-RATED VENUES
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Featured</span> Sports Facilities
            </h2>

            {/* Animated bar */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-1 bg-indigo-200 rounded-l-full"></div>
              <div className="w-10 h-1 bg-indigo-400 animate-pulse-slow"></div>
              <div className="w-16 h-1 bg-indigo-600 rounded-r-full"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium sports facilities across Sri Lanka
            </p>
          </div>

          {/* Enhanced filter tabs */}
          <div className="mb-10">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <span className="relative z-10">All Facilities</span>
                <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </button>
              <button className="group relative px-6 py-3 rounded-full bg-white text-gray-700 font-medium border border-gray-200 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-indigo-200 hover:text-indigo-700">
                <span className="relative z-10">Cricket</span>
                <span className="absolute inset-0 rounded-full bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <button className="group relative px-6 py-3 rounded-full bg-white text-gray-700 font-medium border border-gray-200 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-indigo-200 hover:text-indigo-700">
                <span className="relative z-10">Swimming</span>
                <span className="absolute inset-0 rounded-full bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <button className="group relative px-6 py-3 rounded-full bg-white text-gray-700 font-medium border border-gray-200 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-indigo-200 hover:text-indigo-700">
                <span className="relative z-10">Football</span>
                <span className="absolute inset-0 rounded-full bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <button className="group relative px-6 py-3 rounded-full bg-white text-gray-700 font-medium border border-gray-200 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-indigo-200 hover:text-indigo-700">
                <span className="relative z-10">Tennis</span>
                <span className="absolute inset-0 rounded-full bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <button className="group relative px-6 py-3 rounded-full bg-white text-gray-700 font-medium border border-gray-200 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-indigo-200 hover:text-indigo-700">
                <span className="relative z-10">Basketball</span>
                <span className="absolute inset-0 rounded-full bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="relative">
                <select className="appearance-none pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm">
                  <option>Any Location</option>
                  <option>Colombo</option>
                  <option>Kandy</option>
                  <option>Galle</option>
                  <option>Negombo</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select className="appearance-none pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm">
                  <option>Sort: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                  <option>Most Popular</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced facility cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Facility Card 1 */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80"
                  alt="Premadasa Cricket Stadium"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Weather badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">27°C | Sunny</span>
                </div>

                {/* Favorite button */}
                <button className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md transform transition-transform duration-300 hover:scale-110 hover:bg-white group-hover:translate-y-0 translate-y-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Sport type badge */}
                <div className="absolute bottom-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  Cricket
                </div>
              </div>

              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">Premadasa Cricket Stadium</h3>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-700">4.9</span>
                    <span className="ml-1 text-xs text-gray-500">(128)</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Colombo</span>
                  <span className="mx-2">•</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-green-600 font-medium">Available Today</span>
                </div>

                {/* Facility features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Floodlights
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Equipment Rental
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Coaches
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Starting from</span>
                    <p className="text-lg font-bold text-primary-600">Rs. 15,000<span className="text-sm font-normal text-gray-500">/hr</span></p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
                    Book Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Facility Card 2 */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600965962323-6364f9754910?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80"
                  alt="SSC Swimming Pool"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Weather badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">Indoor</span>
                </div>

                {/* Favorite button */}
                <button className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md transform transition-transform duration-300 hover:scale-110 hover:bg-white group-hover:translate-y-0 translate-y-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Sport type badge */}
                <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  Swimming
                </div>
              </div>

              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">SSC Swimming Pool</h3>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-700">4.8</span>
                    <span className="ml-1 text-xs text-gray-500">(95)</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Colombo</span>
                  <span className="mx-2">•</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-amber-600 font-medium">Limited Slots Today</span>
                </div>

                {/* Facility features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Olympic Size
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Equipment Rental
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Heated
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Trainers
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Starting from</span>
                    <p className="text-lg font-bold text-primary-600">Rs. 5,000<span className="text-sm font-normal text-gray-500">/hr</span></p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
                    Book Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Facility Card 3 */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80"
                  alt="Royal Tennis Club"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Weather badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">25°C | Cloudy</span>
                </div>

                {/* Favorite button */}
                <button className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md transform transition-transform duration-300 hover:scale-110 hover:bg-white group-hover:translate-y-0 translate-y-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Sport type badge */}
                <div className="absolute bottom-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  Tennis
                </div>
              </div>

              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">Royal Tennis Club</h3>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-700">4.7</span>
                    <span className="ml-1 text-xs text-gray-500">(76)</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Colombo</span>
                  <span className="mx-2">•</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-green-600 font-medium">Available Today</span>
                </div>

                {/* Facility features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Clay Court
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Equipment Rental
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Coaches
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Starting from</span>
                    <p className="text-lg font-bold text-primary-600">Rs. 7,500<span className="text-sm font-normal text-gray-500">/hr</span></p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
                    Book Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* See all facilities button */}
          <div className="mt-12 text-center">
            <a href="/facilities" className="inline-flex items-center px-8 py-3 rounded-xl shadow-lg text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 font-medium transform transition-all duration-300 hover:scale-105">
              Explore All Facilities
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Curvy separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#F3F4F6" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,144C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Weather Integration Highlight - Enhanced Section */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-sports-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        {/* Animated weather icons */}
        <div className="absolute top-20 left-20 text-blue-300 opacity-20 animate-float">
          <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-20 text-yellow-300 opacity-20 animate-float animation-delay-2000">
          <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div className="absolute top-40 right-1/3 text-blue-200 opacity-10 animate-float animation-delay-4000">
          <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 18.067V19a2 2 0 01-2 2h-2a2 2 0 01-2-2v-.933A7.002 7.002 0 014 12a7 7 0 0111.95-4.95A5.002 5.002 0 0123 12a5.002 5.002 0 01-5 5c-.178 0-.352-.012-.523-.035A6.967 6.967 0 0113 18.067z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced header with animation */}
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                SMART WEATHER INTEGRATION
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Never Let <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Weather</span> Disrupt Your Game
            </h2>

            {/* Animated bar */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-1 bg-blue-200 rounded-l-full"></div>
              <div className="w-10 h-1 bg-blue-400 animate-pulse-slow"></div>
              <div className="w-16 h-1 bg-blue-600 rounded-r-full"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform intelligently monitors weather conditions and provides real-time recommendations to ensure your sports activities are never interrupted
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-blue-50">
                  <div className="flex items-start">
                    <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 mr-6 transform transition-transform duration-500 group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Weather Monitoring</h3>
                      <p className="text-gray-600">
                        Our system continuously monitors weather conditions at all outdoor facilities, ensuring you're informed about changes that might affect your game.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-blue-50 ml-6">
                  <div className="flex items-start">
                    <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 mr-6 transform transition-transform duration-500 group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Dynamic Suitability Scoring</h3>
                      <p className="text-gray-600">
                        Each outdoor facility receives a real-time suitability score based on current and forecasted weather conditions for informed booking decisions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-blue-50">
                  <div className="flex items-start">
                    <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100 text-purple-600 mr-6 transform transition-transform duration-500 group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Intelligent Alternatives</h3>
                      <p className="text-gray-600">
                        When weather affects your planned activity, our system automatically suggests nearby indoor alternatives with similar facilities and availability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.01]">
                {/* Weather widget header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#weather-pattern)" />
                    </svg>
                    <defs>
                      <pattern id="weather-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="white" />
                      </pattern>
                    </defs>
                  </div>

                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h3 className="font-bold text-xl mb-1">Premadasa Cricket Stadium</h3>
                      <p className="text-blue-100 text-sm">Colombo, Sri Lanka • Cricket Ground</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-xs font-semibold shadow-md">
                      75% Suitable
                    </div>
                  </div>

                  <div className="flex items-center mt-6 relative z-10">
                    <div className="w-16 h-16 mr-4">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zM7 13.5C7 12.12 8.12 11 9.5 11s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S7 14.88 7 13.5zM12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm9 2c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">29°C</span>
                        <span className="ml-2 text-blue-100">Feels like 31°C</span>
                      </div>
                      <p className="text-lg">Partly Cloudy</p>
                    </div>
                  </div>
                </div>

                {/* Weather details */}
                <div className="p-6 bg-gradient-to-b from-blue-50 to-transparent">
                  <div className="grid grid-cols-4 gap-2 mb-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Wind</p>
                      <div className="flex items-center justify-center h-8 mb-1">
                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-800">15 km/h</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Humidity</p>
                      <div className="flex items-center justify-center h-8 mb-1">
                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-800">75%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Rain</p>
                      <div className="flex items-center justify-center h-8 mb-1">
                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-800">30%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">UV Index</p>
                      <div className="flex items-center justify-center h-8 mb-1">
                        <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <p className="font-medium text-gray-800">7/10</p>
                    </div>
                  </div>

                  {/* Weather forecast */}
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <svg className="h-4 w-4 mr-1.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    5-Day Forecast
                  </h4>

                  <div className="grid grid-cols-5 gap-2 mb-6">
                    <div className="text-center bg-white rounded-lg shadow-sm p-2 cursor-pointer transform transition hover:shadow-md hover:scale-105">
                      <p className="text-xs font-medium text-gray-700 mb-1">Today</p>
                      <div className="w-8 h-8 mx-auto my-1">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-gray-800">29°</p>
                    </div>
                    <div className="text-center bg-white rounded-lg shadow-sm p-2 cursor-pointer transform transition hover:shadow-md hover:scale-105">
                      <p className="text-xs font-medium text-gray-700 mb-1">Tue</p>
                      <div className="w-8 h-8 mx-auto my-1">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-gray-800">27°</p>
                    </div>
                    <div className="text-center bg-white rounded-lg shadow-sm p-2 cursor-pointer transform transition hover:shadow-md hover:scale-105">
                      <p className="text-xs font-medium text-gray-700 mb-1">Wed</p>
                      <div className="w-8 h-8 mx-auto my-1">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-gray-800">30°</p>
                    </div>
                    <div className="text-center bg-white rounded-lg shadow-sm p-2 cursor-pointer transform transition hover:shadow-md hover:scale-105">
                      <p className="text-xs font-medium text-gray-700 mb-1">Thu</p>
                      <div className="w-8 h-8 mx-auto my-1">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-gray-800">31°</p>
                    </div>
                    <div className="text-center bg-white rounded-lg shadow-sm p-2 cursor-pointer transform transition hover:shadow-md hover:scale-105">
                      <p className="text-xs font-medium text-gray-700 mb-1">Fri</p>
                      <div className="w-8 h-8 mx-auto my-1">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 16l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-gray-800">25°</p>
                    </div>
                  </div>

                  {/* Indoor alternatives section */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <svg className="h-4 w-4 mr-1.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Recommended Indoor Alternatives
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-blue-50 hover:shadow-md transition-shadow duration-300 cursor-pointer transform transition hover:scale-[1.01]">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Colombo Indoor Cricket Arena</h5>
                            <p className="text-xs text-gray-500">2.5 km away • Cricket</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Available</span>
                          <svg className="h-5 w-5 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-blue-50 hover:shadow-md transition-shadow duration-300 cursor-pointer transform transition hover:scale-[1.01]">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">National Indoor Sports Complex</h5>
                            <p className="text-xs text-gray-500">5.1 km away • Multi-sport</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Available</span>
                          <svg className="h-5 w-5 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-300 hover:shadow-lg flex items-center justify-center">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book Alternative Facility
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curvy separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#F8FAFC" fillOpacity="1" d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,149.3C840,149,960,171,1080,170.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Talent Support & Donations Section - Enhanced */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-purple-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-sports-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced header with animation */}
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-500/10 to-purple-500/10 text-purple-700 backdrop-blur-sm animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ATHLETE SUPPORT PROGRAM
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Supporting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Talented Athletes</span>
            </h2>

            {/* Animated bar */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-1 bg-purple-200 rounded-l-full"></div>
              <div className="w-10 h-1 bg-purple-400 animate-pulse-slow"></div>
              <div className="w-16 h-1 bg-purple-600 rounded-r-full"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe financial constraints should never limit sporting talent. Our platform connects promising athletes with sponsors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-purple-50">
                  <div className="flex items-start">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mr-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Aid Program</h3>
                      <p className="text-gray-600">
                        Talented athletes can apply for sponsored facility access based on merit. Our program assesses achievements and potential to allocate resources where they'll make the biggest impact.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-purple-50 ml-6">
                  <div className="flex items-start">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mr-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Donation Portal</h3>
                      <p className="text-gray-600">
                        Sponsors can browse athlete profiles and provide direct support with full transparency. Our platform ensures 100% of donations reach talented athletes needing assistance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-purple-50">
                  <div className="flex items-start">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mr-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Transparent Impact</h3>
                      <p className="text-gray-600">
                        Track how your donation helps athletes achieve their goals with detailed progress reports and achievement tracking. See the direct impact of your contribution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-primary-600 text-white font-medium shadow-lg hover:from-purple-700 hover:to-primary-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Support an Athlete
                </button>
                <button className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-purple-700 font-medium shadow-md border border-purple-100 hover:bg-purple-50 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Apply for Support
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] border border-purple-100">
                <div className="p-6 relative bg-gradient-to-r from-purple-50 to-primary-50 border-b border-purple-100">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 rounded-bl-full opacity-20"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Featured Athletes Seeking Support
                  </h3>
                  <p className="text-gray-600 text-sm">Meet talented athletes who need your support to continue their journey</p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Athlete Card 1 */}
                  <div className="group flex p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.01] cursor-pointer">
                    <div className="w-16 h-16 rounded-full mr-4 overflow-hidden shadow-md ring-2 ring-purple-200 flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                        alt="Athlete"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Malith Jayawardene</h4>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium shadow-sm">Cricket</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Age 17 • National Youth Player</p>
                      <div className="relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-purple-600 rounded-full" style={{ width: '60%' }}>
                          <div className="absolute inset-0 bg-white/20 overflow-hidden rounded-full shine-effect"></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-gray-700">Rs. 30,000 raised</span>
                        <span className="text-gray-500">Rs. 50,000 goal</span>
                      </div>
                    </div>
                  </div>

                  {/* Athlete Card 2 */}
                  <div className="group flex p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.01] cursor-pointer">
                    <div className="w-16 h-16 rounded-full mr-4 overflow-hidden shadow-md ring-2 ring-purple-200 flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                        alt="Athlete"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Tharushi Silva</h4>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium shadow-sm">Swimming</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Age 15 • Junior Champion</p>
                      <div className="relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-purple-600 rounded-full" style={{ width: '40%' }}>
                          <div className="absolute inset-0 bg-white/20 overflow-hidden rounded-full shine-effect"></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-gray-700">Rs. 20,000 raised</span>
                        <span className="text-gray-500">Rs. 45,000 goal</span>
                      </div>
                    </div>
                  </div>

                  {/* Athlete Card 3 */}
                  <div className="group flex p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-md transform hover:scale-[1.01] cursor-pointer">
                    <div className="w-16 h-16 rounded-full mr-4 overflow-hidden shadow-md ring-2 ring-purple-200 flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                        alt="Athlete"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">Raj Patel</h4>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium shadow-sm">Basketball</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Age 16 • School Team Captain</p>
                      <div className="relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-purple-600 rounded-full" style={{ width: '20%' }}>
                          <div className="absolute inset-0 bg-white/20 overflow-hidden rounded-full shine-effect"></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-gray-700">Rs. 10,000 raised</span>
                        <span className="text-gray-500">Rs. 40,000 goal</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                  <a href="/donations" className="inline-flex items-center text-sm font-medium text-purple-700 hover:text-purple-800 transition-colors duration-300 group">
                    View all athletes needing support
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curvy separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#E0F2FE" fillOpacity="1" d="M0,192L48,202.7C96,213,192,235,288,224C384,213,480,171,576,165.3C672,160,768,192,864,197.3C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-sports-pattern opacity-5"></div>
        <div className="absolute top-40 left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced header with animation */}
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-indigo-700 backdrop-blur-sm animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                SUCCESS STORIES
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Users Say</span>
            </h2>

            {/* Animated bar */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-1 bg-blue-200 rounded-l-full"></div>
              <div className="w-10 h-1 bg-blue-400 animate-pulse-slow"></div>
              <div className="w-16 h-1 bg-blue-600 rounded-r-full"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from athletes, coaches, and facility owners who have transformed their sporting experience with SportsBookSL
            </p>
          </div>

          {/* Enhanced testimonials carousel */}
          <div className="relative overflow-hidden py-10">
            <div className="max-w-5xl mx-auto">
              {/* Testimonial slides */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-50 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 h-14 w-14 rounded-full overflow-hidden shadow-md border-2 border-blue-200">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                        alt="User"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-900">Roshan Perera</h4>
                      <p className="text-sm text-gray-500">National Cricket Player</p>
                    </div>
                  </div>

                  <div className="mb-5 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-gray-700 italic mb-6">
                    "SportsBookSL revolutionized my training schedule. I can book facilities, equipment, and even transportation in one place. The weather alerts have saved me countless wasted trips to outdoor venues!"
                  </blockquote>

                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    User since January 2025
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-50 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 h-14 w-14 rounded-full overflow-hidden shadow-md border-2 border-blue-200">
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                        alt="User"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-900">Amali Fernando</h4>
                      <p className="text-sm text-gray-500">Swimming Coach</p>
                    </div>
                  </div>

                  <div className="mb-5 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-gray-700 italic mb-6">
                    "As a coach, managing facility bookings for my team was always a hassle. SportsBookSL simplified everything - from scheduling to equipment rentals. The donation platform has also helped my talented athletes secure financial support!"
                  </blockquote>

                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    User since February 2025
                  </div>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-center mt-12 space-x-3">
                <button className="h-2.5 w-2.5 rounded-full bg-blue-600 focus:outline-none"></button>
                <button className="h-2.5 w-2.5 rounded-full bg-blue-200 focus:outline-none hover:bg-blue-400 transition-colors duration-300"></button>
                <button className="h-2.5 w-2.5 rounded-full bg-blue-200 focus:outline-none hover:bg-blue-400 transition-colors duration-300"></button>
                <button className="h-2.5 w-2.5 rounded-full bg-blue-200 focus:outline-none hover:bg-blue-400 transition-colors duration-300"></button>
              </div>
            </div>
          </div>
        </div>

        {/* Curvy separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#111827" fillOpacity="0.9" d="M0,224L40,234.7C80,245,160,267,240,261.3C320,256,400,224,480,197.3C560,171,640,149,720,165.3C800,181,880,235,960,234.7C1040,235,1120,181,1200,170.7C1280,160,1360,192,1400,208L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-sports-pattern opacity-5"></div>

        {/* Glowing orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-5xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-5xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-5xl opacity-5 animate-pulse-slow"></div>

        {/* Sports equipment outline decorations */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-white/5 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-white/5 rounded-full opacity-30"></div>
        <div className="absolute top-40 left-1/3 w-16 h-16 border-2 border-white/5 rounded-full opacity-40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 text-blue-300 backdrop-blur-sm mb-8 animate-pulse-slow">
              GET STARTED TODAY
            </span>

            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight animate-fade-in-down">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Ready to elevate</span>
              <br />
              <span className="text-white">your sports experience?</span>
            </h2>

            <p className="text-xl text-blue-100/90 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
              Join SportsBookSL today and connect with the best sports facilities across Sri Lanka. Book facilities, coordinate transportation, find equipment, and support talented athletes all on one platform.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up animation-delay-500">
              <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:shadow-xl hover:scale-105">
                <span className="relative z-10">Book a Facility Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
              </button>

              <button className="group relative overflow-hidden rounded-xl bg-transparent border-2 border-white/30 backdrop-blur-sm px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:border-white/50 hover:shadow-xl hover:scale-105">
                <span className="relative z-10">Explore Features</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-700">
              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-blue-200">300+ Facilities</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-blue-200">10,000+ Users</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-blue-200">20+ Sports</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-blue-200">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div> // This closes the root div from line 8
  );
}

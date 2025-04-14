import Link from 'next/link';

interface SportType {
  name: string;
}

interface FacilityProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  sportTypes: SportType[];
  imageUrl: string;
  price: string;
  isAvailableNow?: boolean;
  distance?: string;
  indoor?: boolean;
}

export default function FacilityCard({
  id,
  name,
  location,
  rating,
  reviewCount,
  sportTypes,
  imageUrl,
  price,
  isAvailableNow = true,
  distance,
  indoor,
}: FacilityProps) {
  return (
    <Link href={`/facilities/${id}`} className="block group">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-2px]">
        {/* Image container with overlay */}
        <div className="relative h-56 overflow-hidden">
          {/* Main image with zoom effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          {/* Status badge - conditionally shown */}
          {isAvailableNow && (
            <div className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              Available Now
            </div>
          )}
          
          {/* Indoor/Outdoor badge - conditionally shown */}
          {(indoor !== undefined) && (
            <div className="absolute top-4 right-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-gray-700 shadow-sm">
              {indoor ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Indoor
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 17.657l-.707.707M18.364 5.636l-.707.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Outdoor
                </>
              )}
            </div>
          )}
          
          {/* Sport tags positioned at the bottom */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {sportTypes.map((sport) => (
              <span 
                key={sport.name} 
                className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-white/80 backdrop-blur-sm text-primary-700 shadow-sm border border-primary-100"
              >
                {sport.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-5">
          {/* Heading and rating */}
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{name}</h3>
            <div className="flex items-center">
              <div className="flex items-center bg-amber-50 rounded-lg px-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
              </div>
            </div>
          </div>
          
          {/* Review count */}
          <div className="mt-1 text-xs text-gray-500">
            {reviewCount} reviews
          </div>
          
          {/* Location with icon */}
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{location}</span>
            
            {/* Distance if provided */}
            {distance && (
              <span className="inline-flex items-center ml-3 text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {distance} away
              </span>
            )}
          </div>
          
          {/* Price and CTA */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Starting from</span>
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-gray-900">{price}</span>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg group-hover:shadow-md transition-all duration-300">
              <div className="relative overflow-hidden rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors duration-300">
                <div className="px-4 py-2">
                  <span className="text-sm font-medium text-primary-700 group-hover:text-primary-800 transition-colors duration-300">
                    Book now
                  </span>
                </div>
                {/* Animated underline effect */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
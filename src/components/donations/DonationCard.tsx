// src/components/donations/DonationCard.tsx

import Link from 'next/link';

interface DonationCardProps {
  athleteId: string;
  name: string;
  age: number;
  sport: string;
  goal: number;
  raised: number;
  image: string;
  achievements: string[];
  story: string;
  location: string;
}

export default function DonationCard({
  athleteId,
  name,
  age,
  sport,
  goal,
  raised,
  image,
  achievements,
  story,
  location
}: DonationCardProps) {
  // Calculate percentage raised
  const percentRaised = Math.min(Math.round((raised / goal) * 100), 100);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold">{name}, {age}</h3>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {sport}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-4 flex-1">
          <p className="text-gray-700 line-clamp-3 text-sm">{story}</p>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>Rs. {raised.toLocaleString()} raised</span>
            <span>Goal: Rs. {goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full" 
              style={{ width: `${percentRaised}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-900 uppercase mb-2">Achievements</h4>
          <div className="flex flex-wrap gap-1">
            {achievements.map((achievement, index) => (
              <span 
                key={index}
                className="inline-block text-xs px-2 py-1 rounded bg-primary-50 text-primary-700"
              >
                {achievement}
              </span>
            ))}
          </div>
        </div>
        
        <Link
          href={`/donations/${athleteId}`}
          className="w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
        >
          Support {name}
        </Link>
      </div>
    </div>
  );
}
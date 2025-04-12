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
}: FacilityProps) {
  return (
    <Link
      href={`/facilities/${id}`}
      className="group"
    >
      <div className="card overflow-hidden transition-all hover:shadow">
        <div className="aspect-h-2 aspect-w-3 h-48 overflow-hidden rounded-t-lg bg-gray-200">
          <div 
            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="mt-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <span className="ml-1 text-sm text-gray-600">{rating} ({reviewCount} reviews)</span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {location}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sportTypes.map((sport) => (
              <span key={sport.name} className="inline-block rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800">
                {sport.name}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">{price}</span>
            <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700">
              Book now
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
interface User {
    name: string;
    avatar: string;
  }
  
  interface Review {
    id: string;
    user: User;
    rating: number;
    date: string;
    content: string;
  }
  
  interface ReviewListProps {
    reviews: Review[];
  }
  
  export default function ReviewList({ reviews }: ReviewListProps) {
    // Format date
    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    // Generate stars for rating
    const renderStars = (rating: number) => {
      return (
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${i < rating ? 'text-amber-500' : 'text-gray-300'}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      );
    };
    
    if (reviews.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={review.user.avatar}
                  alt={review.user.name}
                />
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium text-gray-900">{review.user.name}</h4>
                  <span className="mx-2 text-gray-300">•</span>
                  <time className="text-sm text-gray-500" dateTime={review.date}>
                    {formatDate(review.date)}
                  </time>
                </div>
                <div className="mt-1">
                  {renderStars(review.rating)}
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <p>{review.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
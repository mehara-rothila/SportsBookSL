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
  tags?: string[]; // Optional tags to highlight aspects of the review
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
            className={`h-5 w-5 ${
              i < Math.floor(rating) 
                ? 'text-amber-500' 
                : i < rating 
                  ? 'text-amber-500' // For half stars, still fully colored for now
                  : 'text-gray-200'
            } transition-colors duration-300`}
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
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews yet</h3>
        <p className="text-gray-500 max-w-md mx-auto">Be the first to share your experience with this facility.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div 
          key={review.id} 
          className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full object-cover border-2 border-gray-100 group-hover:border-primary-100 transition-colors duration-300"
                src={review.user.avatar}
                alt={review.user.name}
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex flex-wrap items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">{review.user.name}</h4>
                  <div className="flex items-center mt-1">
                    {renderStars(review.rating)}
                    <time className="ml-2 text-sm text-gray-500" dateTime={review.date}>
                      {formatDate(review.date)}
                    </time>
                  </div>
                </div>
                
                {/* Animated indicator for new reviews - only for the first review or can be controlled by a "new" flag */}
                {index === 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 mr-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    New
                  </span>
                )}
              </div>
              
              <div className="mt-3 prose prose-sm max-w-none text-gray-700">
                <p className="leading-relaxed">{review.content}</p>
              </div>
              
              {/* Optional tag section */}
              {review.tags && review.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {review.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Action buttons */}
              <div className="mt-4 flex items-center gap-4 pt-2 border-t border-gray-100">
                <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  Helpful
                </button>
                <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Load more button - optional */}
      {reviews.length >= 5 && (
        <div className="text-center pt-4">
          <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200">
            Load more reviews
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
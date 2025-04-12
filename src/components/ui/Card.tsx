import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md'
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg shadow-even';
  
  const hoverClasses = hover ? 'transition-all hover:shadow-md' : '';
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const cardClasses = `${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`;
  
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}

// Card components
export function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`py-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
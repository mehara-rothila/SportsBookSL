import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outlined' | 'elevated' | 'glass' | 'gradient';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md',
  variant = 'default',
  rounded = 'lg',
  border = true,
  shadow = 'md'
}: CardProps) {
  // Padding classes
  const paddingClasses = {
    none: '',
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  // Rounded corner classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };
  
  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-md',
    xl: 'shadow-lg',
  };
  
  // Hover effect classes
  const hoverClasses = hover 
    ? variant === 'glass' 
      ? 'transition-all duration-300 hover:shadow-md hover:bg-white/15'
      : 'transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]'
    : '';
  
  // Border classes
  const borderClasses = border 
    ? variant === 'outlined' 
      ? 'border border-gray-300' 
      : variant === 'glass'
        ? 'border border-white/20'
        : 'border border-gray-200/80'
    : '';
  
  // Variant-specific styles
  let variantClasses = '';
  
  switch (variant) {
    case 'default':
      variantClasses = 'bg-white';
      break;
    case 'outlined':
      variantClasses = 'bg-white';
      break;
    case 'elevated':
      variantClasses = 'bg-white';
      break;
    case 'glass':
      variantClasses = 'bg-white/10 backdrop-blur-md';
      break;
    case 'gradient':
      variantClasses = 'bg-gradient-to-br from-primary-50 to-secondary-50';
      break;
    default:
      variantClasses = 'bg-white';
  }
  
  const cardClasses = `
    ${variantClasses} 
    ${paddingClasses[padding]} 
    ${roundedClasses[rounded]} 
    ${shadowClasses[shadow]} 
    ${hoverClasses} 
    ${borderClasses} 
    ${className}
  `;
  
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}

// Sub-components for the Card
interface CardComponentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ 
  children, 
  className = '' 
}: CardComponentProps) {
  return (
    <div className={`space-y-2 mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className = '' 
}: CardComponentProps) {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 leading-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ 
  children, 
  className = '' 
}: CardComponentProps) {
  return (
    <p className={`text-sm text-gray-500 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ 
  children, 
  className = '' 
}: CardComponentProps) {
  return (
    <div className={`py-2 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ 
  children, 
  className = '' 
}: CardComponentProps) {
  return (
    <div className={`flex items-center justify-between mt-4 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function CardImage({ 
  src, 
  alt = '', 
  className = '',
  position = 'top'
}: { 
  src: string;
  alt?: string;
  className?: string;
  position?: 'top' | 'bottom' | 'background';
}) {
  if (position === 'background') {
    return (
      <div 
        className={`absolute inset-0 bg-cover bg-center z-0 ${className}`} 
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
    );
  }
  
  const positionClass = position === 'top' 
    ? 'rounded-t-inherit -mx-6 -mt-6 mb-6' 
    : 'rounded-b-inherit -mx-6 -mb-6 mt-6';
  
  return (
    <div className={`overflow-hidden ${positionClass} ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

export function CardDivider({ className = '' }: { className?: string }) {
  return <div className={`border-t border-gray-200 my-4 ${className}`} />;
}

// Card Badge component for labels, status indicators, etc.
export function CardBadge({
  children,
  variant = 'default',
  className = ''
}: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
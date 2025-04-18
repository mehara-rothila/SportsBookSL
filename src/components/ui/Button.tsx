import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'gradient' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  href,
  leftIcon,
  rightIcon,
  rounded = 'md',
  elevation = 'sm',
  ...props
}: ButtonProps) {
  // Base classes that are common to all button variants
  const baseClasses = 'group relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed';
  
  // Size configurations
  const sizeClasses = {
    xs: 'text-xs h-7 px-2.5',
    sm: 'text-sm h-8 px-3',
    md: 'text-sm h-10 px-4',
    lg: 'text-base h-11 px-5',
    xl: 'text-base h-12 px-6',
  };
  
  // Rounded corner configurations
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  
  // Shadow/elevation configurations
  const elevationClasses = {
    none: '',
    sm: 'shadow-sm hover:shadow',
    md: 'shadow hover:shadow-md',
    lg: 'shadow-md hover:shadow-lg',
  };
  
  // Variant-specific styling
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 border border-transparent',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500 border border-transparent',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 bg-transparent',
    text: 'text-primary-600 hover:text-primary-700 focus:ring-primary-500 border-0 bg-transparent hover:bg-primary-50 shadow-none',
    gradient: 'border border-transparent bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white focus:ring-primary-500',
    glass: 'border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 focus:ring-white/50',
  };
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${elevationClasses[elevation]} ${widthClass} ${className}`;
  
  // Loading spinner component
  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  
  // Button content with loading state and icons
  const buttonContent = (
    <>
      {/* Hover overlay effect for primary, secondary, and gradient variants */}
      {['primary', 'secondary', 'gradient'].includes(variant) && (
        <span className="absolute inset-0 overflow-hidden rounded-inherit">
          <span className="absolute inset-0 bg-white/[0.08] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </span>
      )}
      
      {isLoading ? <LoadingSpinner /> : leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span className={`${isLoading ? 'opacity-80' : ''}`}>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2 group-hover:translate-x-0.5 transition-transform duration-200">{rightIcon}</span>}
      
      {/* Text and outline variant hover line animation */}
      {['text', 'outline'].includes(variant) && (
        <span className="absolute bottom-0 left-0 h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      )}
    </>
  );
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button className={buttonClasses} disabled={isLoading || props.disabled} {...props}>
      {buttonContent}
    </button>
  );
}
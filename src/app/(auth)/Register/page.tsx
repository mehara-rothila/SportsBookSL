'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'athlete',
    phoneNumber: '',
    acceptTerms: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData({ ...formData, [name]: val });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }
    
    if (!formData.acceptTerms) {
      setError('You must accept the terms and conditions');
      setIsLoading(false);
      return;
    }
    
    try {
      // This would be an API call in a real application
      console.log('Register with:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always succeed
      window.location.href = '/';
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const userTypes = [
    { id: 'athlete', name: 'Athlete/User' },
    { id: 'facility-owner', name: 'Facility Owner' },
    { id: 'trainer', name: 'Sports Trainer/Coach' },
  ];
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-1 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className="input-field"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone-number"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                required
                className="input-field"
                placeholder="+94 70 123 4567"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="user-type" className="block text-sm font-medium text-gray-700 mb-1">
                User Type
              </label>
              <select
                id="user-type"
                name="userType"
                className="input-field"
                value={formData.userType}
                onChange={handleInputChange}
              >
                {userTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field"
                placeholder="••••••••"
                minLength={8}
                value={formData.password}
                onChange={handleInputChange}
              />
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="input-field"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="accept-terms"
              name="acceptTerms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <Link href="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center btn-primary py-3 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
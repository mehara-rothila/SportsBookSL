// src/components/donations/DonationForm.tsx

'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface DonationFormProps {
  athleteId?: string;
  athleteName?: string;
  defaultAmount?: number;
}

const donationOptions = [
  { value: 1000, label: 'Rs. 1,000', description: 'Provides transportation for 1 week' },
  { value: 2500, label: 'Rs. 2,500', description: 'Covers facility access for 1 week' },
  { value: 5000, label: 'Rs. 5,000', description: 'Covers basic equipment rental' },
  { value: 10000, label: 'Rs. 10,000', description: 'Provides comprehensive training support' },
  { value: 'custom', label: 'Custom Amount', description: 'Choose your own amount' }
];

export default function DonationForm({ athleteId, athleteName, defaultAmount }: DonationFormProps) {
  const [selectedOption, setSelectedOption] = useState(donationOptions[2]); // Default to Rs. 5,000
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Calculate actual donation amount (either preset or custom)
  const donationAmount = selectedOption.value === 'custom' 
    ? parseInt(customAmount) || 0 
    : selectedOption.value;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would be an API call in a real application
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
    }, 1500);
  };
  
  if (isComplete) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Donation!</h2>
          <p className="text-gray-600 mb-6">
            Your generous contribution of <span className="font-medium">Rs. {donationAmount.toLocaleString()}</span> will make a real difference.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
            <h3 className="font-medium text-gray-900 mb-2">What Happens Next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>You'll receive a confirmation email with your donation receipt</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>The athlete will be notified of your support</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>You'll receive updates on how your donation is making a difference</span>
              </li>
            </ul>
          </div>
          
          <div className="flex space-x-4 justify-center">
            <button
              type="button"
              onClick={() => window.location.href = '/donations'}
              className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              See Other Athletes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsComplete(false);
                setDonorName('');
                setDonorEmail('');
                setMessage('');
                setIsAnonymous(false);
              }}
              className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Make Another Donation
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 text-white">
        <h2 className="text-xl font-semibold">Make a Donation</h2>
        <p className="text-primary-100 text-sm">Support talented athletes and help them access quality training facilities</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {athleteName && (
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">
              You're donating to support <span className="font-medium">{athleteName}</span>
            </p>
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Select Donation Amount</h3>
          
          <RadioGroup value={selectedOption} onChange={setSelectedOption}>
            <div className="space-y-3">
              {donationOptions.map((option) => (
                <RadioGroup.Option
                  key={option.value.toString()}
                  value={option}
                  className={({ active, checked }) =>
                    `${
                      active ? 'ring-2 ring-primary-300' : ''
                    } ${
                      checked ? 'bg-primary-50 border-primary-500' : 'bg-white'
                    } relative block cursor-pointer rounded-lg border px-6 py-4 focus:outline-none transition-all`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium ${checked ? 'text-primary-900' : 'text-gray-900'}`}
                            >
                              {option.label}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${checked ? 'text-primary-700' : 'text-gray-500'}`}
                            >
                              {option.description}
                            </RadioGroup.Description>
                          </div>
                        </div>
                        
                        {checked && (
                          <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-6 w-6 text-primary-600" />
                          </div>
                        )}
                      </div>
                      
                      {checked && option.value === 'custom' && (
                        <div className="mt-3 pl-4">
                          <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-500 sm:text-sm">Rs.</span>
                            </div>
                            <input
                              type="number"
                              name="customAmount"
                              id="customAmount"
                              className="block w-full rounded-md border-0 py-1.5 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                              placeholder="0.00"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              min="100"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Your Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="donor-name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="donor-name"
                  id="donor-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="John Doe"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required={!isAnonymous}
                  disabled={isAnonymous}
                />
              </div>
              
              <div>
                <label htmlFor="donor-email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="donor-email"
                  id="donor-email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="john@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="anonymous"
                name="anonymous"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Make this donation anonymous
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Your message of encouragement to the athlete..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Donation Summary</h3>
          
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Donation Amount</span>
            <span className="text-sm font-medium text-gray-900">
              Rs. {donationAmount.toLocaleString()}
            </span>
          </div>
          
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
            <span className="font-medium text-gray-900">Total</span>
            <span className="font-medium text-gray-900">
              Rs. {donationAmount.toLocaleString()}
            </span>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || (selectedOption.value === 'custom' && (!customAmount || parseInt(customAmount) < 100))}
          className={`w-full rounded-md py-3 px-4 text-white font-medium flex items-center justify-center transition-colors ${
            isLoading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>Complete Donation</>
          )}
        </button>
        
        <p className="mt-2 text-xs text-gray-500 text-center">
          By donating, you agree to our{' '}
          <a href="#" className="text-primary-600 hover:text-primary-500">
            Donation Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary-600 hover:text-primary-500">
            Privacy Policy
          </a>
        </p>
      </form>
    </div>
  );
}
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { InformationCircleIcon, PaperClipIcon, TrashIcon } from '@heroicons/react/24/outline';

// Define sports options
const sportOptions = [
  { id: 'cricket', name: 'Cricket' },
  { id: 'football', name: 'Football' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'swimming', name: 'Swimming' },
  { id: 'tennis', name: 'Tennis' },
  { id: 'badminton', name: 'Badminton' },
  { id: 'volleyball', name: 'Volleyball' },
  { id: 'athletics', name: 'Athletics' },
  { id: 'rugby', name: 'Rugby' },
  { id: 'hockey', name: 'Hockey' },
  { id: 'table-tennis', name: 'Table Tennis' },
  { id: 'other', name: 'Other' }
];

// Define level options
const levelOptions = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
  { id: 'professional', name: 'Professional' }
];

// Define facility types
const facilityTypes = [
  { id: 'cricket-ground', name: 'Cricket Ground' },
  { id: 'football-field', name: 'Football Field' },
  { id: 'basketball-court', name: 'Basketball Court' },
  { id: 'swimming-pool', name: 'Swimming Pool' },
  { id: 'tennis-court', name: 'Tennis Court' },
  { id: 'badminton-court', name: 'Badminton Court' },
  { id: 'athletics-track', name: 'Athletics Track' },
  { id: 'volleyball-court', name: 'Volleyball Court' },
  { id: 'indoor-gym', name: 'Indoor Gym' },
  { id: 'practice-nets', name: 'Practice Nets' },
  { id: 'table-tennis-table', name: 'Table Tennis Facilities' },
  { id: 'multi-purpose-hall', name: 'Multi-purpose Hall' }
];

interface FormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    postalCode: string;
  };
  sportsInfo: {
    primarySport: { id: string; name: string } | null;
    skillLevel: { id: string; name: string } | null;
    yearsExperience: string;
    currentAffiliation: string;
    achievements: string;
  };
  financialNeed: {
    description: string;
    requestedAmount: string;
    facilitiesNeeded: string[];
    monthlyUsage: string;
  };
  reference: {
    name: string;
    relationship: string;
    contactInfo: string;
    organizationName: string;
  };
  documents: File[];
  supportingInfo: {
    previousAid: string;
    otherPrograms: string;
    additionalInfo: string;
  };
  terms: boolean;
}

export default function FinancialAidApplicationPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Initial form state
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      postalCode: ''
    },
    sportsInfo: {
      primarySport: null,
      skillLevel: null,
      yearsExperience: '',
      currentAffiliation: '',
      achievements: ''
    },
    financialNeed: {
      description: '',
      requestedAmount: '',
      facilitiesNeeded: [],
      monthlyUsage: ''
    },
    reference: {
      name: '',
      relationship: '',
      contactInfo: '',
      organizationName: ''
    },
    documents: [],
    supportingInfo: {
      previousAid: '',
      otherPrograms: '',
      additionalInfo: ''
    },
    terms: false
  });
  
  // Validate the current step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      // Validate personal information
      if (!formData.personalInfo.fullName) {
        newErrors['fullName'] = 'Full name is required';
      }
      
      if (!formData.personalInfo.email) {
        newErrors['email'] = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
        newErrors['email'] = 'Email is invalid';
      }
      
      if (!formData.personalInfo.phone) {
        newErrors['phone'] = 'Phone number is required';
      }
      
      if (!formData.personalInfo.dateOfBirth) {
        newErrors['dateOfBirth'] = 'Date of birth is required';
      }
      
      if (!formData.personalInfo.address) {
        newErrors['address'] = 'Address is required';
      }
    } 
    else if (step === 2) {
      // Validate sports information
      if (!formData.sportsInfo.primarySport) {
        newErrors['primarySport'] = 'Primary sport is required';
      }
      
      if (!formData.sportsInfo.skillLevel) {
        newErrors['skillLevel'] = 'Skill level is required';
      }
      
      if (!formData.sportsInfo.yearsExperience) {
        newErrors['yearsExperience'] = 'Years of experience is required';
      }
      
      if (!formData.sportsInfo.achievements) {
        newErrors['achievements'] = 'Please provide information about your achievements';
      }
    } 
    else if (step === 3) {
      // Validate financial need
      if (!formData.financialNeed.description) {
        newErrors['needDescription'] = 'Please describe your financial need';
      }
      
      if (!formData.financialNeed.requestedAmount) {
        newErrors['requestedAmount'] = 'Requested amount is required';
      } else if (isNaN(Number(formData.financialNeed.requestedAmount))) {
        newErrors['requestedAmount'] = 'Requested amount must be a number';
      }
      
      if (formData.financialNeed.facilitiesNeeded.length === 0) {
        newErrors['facilitiesNeeded'] = 'Please select at least one facility type';
      }
      
      if (!formData.financialNeed.monthlyUsage) {
        newErrors['monthlyUsage'] = 'Please specify your expected monthly usage';
      }
    }
    else if (step === 4) {
      // Validate reference
      if (!formData.reference.name) {
        newErrors['referenceName'] = 'Reference name is required';
      }
      
      if (!formData.reference.relationship) {
        newErrors['referenceRelationship'] = 'Relationship to reference is required';
      }
      
      if (!formData.reference.contactInfo) {
        newErrors['referenceContact'] = 'Reference contact information is required';
      }
    }
    else if (step === 5) {
      // Nothing to validate for documents
    }
    else if (step === 6) {
      // Validate terms
      if (!formData.terms) {
        newErrors['terms'] = 'You must agree to the terms and conditions';
      }
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Move to the next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Move to the previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Parse nested object path (e.g., "personalInfo.fullName")
    const path = name.split('.');
    
    if (path.length === 2) {
      setFormData({
        ...formData,
        [path[0]]: {
          ...formData[path[0] as keyof FormData],
          [path[1]]: value
        }
      });
    }
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name === 'terms') {
      setFormData({
        ...formData,
        terms: checked
      });
    }
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        documents: [...formData.documents, ...newFiles]
      });
    }
  };
  
  // Remove a file
  const removeFile = (index: number) => {
    const updatedFiles = [...formData.documents];
    updatedFiles.splice(index, 1);
    setFormData({
      ...formData,
      documents: updatedFiles
    });
  };
  
  // Handle facility selection
  const toggleFacilitySelection = (facilityId: string) => {
    const facilities = [...formData.financialNeed.facilitiesNeeded];
    
    if (facilities.includes(facilityId)) {
      // Remove facility if already selected
      const index = facilities.indexOf(facilityId);
      facilities.splice(index, 1);
    } else {
      // Add facility if not selected
      facilities.push(facilityId);
    }
    
    setFormData({
      ...formData,
      financialNeed: {
        ...formData.financialNeed,
        facilitiesNeeded: facilities
      }
    });
  };
  
  // Format file size
  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} bytes`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      
      try {
        // In a real app, this would send the form data to the server
        console.log('Form data submitted:', formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setSubmitted(true);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error submitting form:', error);
        setFormErrors({
          submission: 'An error occurred while submitting your application. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Success message component
  if (submitted) {
    return (
      <div className="bg-gray-50 min-h-screen pt-16 pb-12 flex flex-col items-center">
        <div className="bg-white shadow rounded-lg max-w-3xl w-full p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckIcon className="h-8 w-8 text-green-600" aria-hidden="true" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Application Submitted!</h2>
            <p className="mt-3 text-lg text-gray-500">
              Thank you for your application. We'll review it and contact you soon.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Application Reference: <span className="font-medium">AID-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
            </p>
          </div>
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-900">What happens next?</h3>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-gray-500">
              <li>Our team will review your application and supporting documents within 7-10 business days.</li>
              <li>You'll receive an email with the status of your application.</li>
              <li>If approved, you'll receive instructions on how to access and use your financial aid.</li>
            </ul>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <Link
              href="/financial-aid"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Return to Financial Aid
            </Link>
            <Link
              href="/profile"
              className="text-sm font-semibold text-gray-900"
            >
              Go to your profile <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-700 px-6 py-8 text-white">
            <h1 className="text-2xl font-bold">Financial Aid Application</h1>
            <p className="mt-2 text-primary-100">
              Complete this form to apply for financial assistance to access sports facilities
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of 6
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round((currentStep / 6) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Form content */}
          <div className="px-6 py-8">
            {formErrors.submission && (
              <div className="mb-6 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Submission Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{formErrors.submission}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="personalInfo.fullName" className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="personalInfo.fullName"
                        id="personalInfo.fullName"
                        value={formData.personalInfo.fullName}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.fullName ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="personalInfo.email" className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="personalInfo.email"
                        id="personalInfo.email"
                        value={formData.personalInfo.email}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.email ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="personalInfo.phone" className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="personalInfo.phone"
                        id="personalInfo.phone"
                        value={formData.personalInfo.phone}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.phone ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="personalInfo.dateOfBirth" className="block text-sm font-medium text-gray-700">
                      Date of Birth *
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="personalInfo.dateOfBirth"
                        id="personalInfo.dateOfBirth"
                        value={formData.personalInfo.dateOfBirth}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.dateOfBirth ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.dateOfBirth}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <label htmlFor="personalInfo.address" className="block text-sm font-medium text-gray-700">
                      Address *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="personalInfo.address"
                        id="personalInfo.address"
                        value={formData.personalInfo.address}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.address ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.address && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="personalInfo.city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="personalInfo.city"
                        id="personalInfo.city"
                        value={formData.personalInfo.city}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="personalInfo.postalCode" className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="personalInfo.postalCode"
                        id="personalInfo.postalCode"
                        value={formData.personalInfo.postalCode}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-blue-50 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Privacy Notice</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>Your personal information will only be used for the purpose of evaluating your financial aid application and will be handled in accordance with our <Link href="/privacy" className="underline">Privacy Policy</Link>.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Sports Information */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Sports Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Sport *
                    </label>
                    <Listbox 
                      value={formData.sportsInfo.primarySport} 
                      onChange={(selected) => 
                        setFormData({
                          ...formData,
                          sportsInfo: {
                            ...formData.sportsInfo,
                            primarySport: selected
                          }
                        })
                      }
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className={`relative w-full cursor-default rounded-md border ${
                          formErrors.primarySport ? 'border-red-300' : 'border-gray-300'
                        } bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm`}>
                          <span className="block truncate">
                            {formData.sportsInfo.primarySport ? formData.sportsInfo.primarySport.name : 'Select a sport'}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {sportOptions.map((sport) => (
                              <Listbox.Option
                                key={sport.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                                  }`
                                }
                                value={sport}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {sport.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active ? 'text-primary-600' : 'text-primary-600'
                                        }`}
                                      >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    {formErrors.primarySport && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.primarySport}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skill Level *
                    </label>
                    <Listbox 
                      value={formData.sportsInfo.skillLevel} 
                      onChange={(selected) => 
                        setFormData({
                          ...formData,
                          sportsInfo: {
                            ...formData.sportsInfo,
                            skillLevel: selected
                          }
                        })
                      }
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className={`relative w-full cursor-default rounded-md border ${
                          formErrors.skillLevel ? 'border-red-300' : 'border-gray-300'
                        } bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm`}>
                          <span className="block truncate">
                            {formData.sportsInfo.skillLevel ? formData.sportsInfo.skillLevel.name : 'Select skill level'}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {levelOptions.map((level) => (
                              <Listbox.Option
                                key={level.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                                  }`
                                }
                                value={level}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {level.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active ? 'text-primary-600' : 'text-primary-600'
                                        }`}
                                      >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    {formErrors.skillLevel && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.skillLevel}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="sportsInfo.yearsExperience" className="block text-sm font-medium text-gray-700">
                      Years of Experience *
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="sportsInfo.yearsExperience"
                        id="sportsInfo.yearsExperience"
                        min="0"
                        max="99"
                        value={formData.sportsInfo.yearsExperience}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.yearsExperience ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.yearsExperience && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.yearsExperience}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="sportsInfo.currentAffiliation" className="block text-sm font-medium text-gray-700">
                      Current Team/Club/School (if any)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="sportsInfo.currentAffiliation"
                        id="sportsInfo.currentAffiliation"
                        value={formData.sportsInfo.currentAffiliation}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="sportsInfo.achievements" className="block text-sm font-medium text-gray-700">
                      Notable Achievements and Experience *
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      Describe your sports achievements, competitions, medals, records, recognitions, or any relevant experience.
                    </p>
                    <div className="mt-2">
                      <textarea
                        id="sportsInfo.achievements"
                        name="sportsInfo.achievements"
                        rows={4}
                        value={formData.sportsInfo.achievements}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.achievements ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.achievements && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.achievements}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Financial Need */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Need</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="financialNeed.description" className="block text-sm font-medium text-gray-700">
                      Please describe your financial need and how this assistance would help your athletic development *
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      Explain your current financial situation and how financial aid would impact your sports career.
                    </p>
                    <div className="mt-2">
                      <textarea
                        id="financialNeed.description"
                        name="financialNeed.description"
                        rows={5}
                        value={formData.financialNeed.description}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.needDescription ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.needDescription && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.needDescription}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="financialNeed.requestedAmount" className="block text-sm font-medium text-gray-700">
                      Requested Financial Aid Amount (LKR) *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">Rs.</span>
                      </div>
                      <input
                        type="text"
                        name="financialNeed.requestedAmount"
                        id="financialNeed.requestedAmount"
                        value={formData.financialNeed.requestedAmount}
                        onChange={handleInputChange}
                        className={`focus:ring-primary-500 focus:border-primary-500 block w-full pl-12 sm:text-sm border-gray-300 rounded-md ${
                          formErrors.requestedAmount ? 'border-red-300' : ''
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                    {formErrors.requestedAmount && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.requestedAmount}</p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Enter the approximate amount you are requesting for facility access over a 6-month period.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What types of facilities do you need access to? (Select all that apply) *
                    </label>
                    {formErrors.facilitiesNeeded && (
                      <p className="mb-2 text-sm text-red-600">{formErrors.facilitiesNeeded}</p>
                    )}
                    <div className="mt-1 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
                      {facilityTypes.map((facility) => (
                        <div key={facility.id} className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={facility.id}
                              name={facility.id}
                              type="checkbox"
                              checked={formData.financialNeed.facilitiesNeeded.includes(facility.id)}
                              onChange={() => toggleFacilitySelection(facility.id)}
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={facility.id} className="font-medium text-gray-700">
                              {facility.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="financialNeed.monthlyUsage" className="block text-sm font-medium text-gray-700">
                      How often do you plan to use the facilities? *
                    </label>
                    <select
                      id="financialNeed.monthlyUsage"
                      name="financialNeed.monthlyUsage"
                      value={formData.financialNeed.monthlyUsage}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                        formErrors.monthlyUsage ? 'border-red-300' : ''
                      }`}
                    >
                      <option value="">Select frequency</option>
                      <option value="daily">Daily (5-7 times per week)</option>
                      <option value="frequently">Frequently (3-4 times per week)</option>
                      <option value="regularly">Regularly (1-2 times per week)</option>
                      <option value="occasionally">Occasionally (2-3 times per month)</option>
                    </select>
                    {formErrors.monthlyUsage && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.monthlyUsage}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Reference */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Reference Information</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Please provide a reference (coach, sports teacher, or mentor) who can vouch for your sports abilities and financial need.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="reference.name" className="block text-sm font-medium text-gray-700">
                      Reference Name *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="reference.name"
                        id="reference.name"
                        value={formData.reference.name}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.referenceName ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.referenceName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.referenceName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="reference.relationship" className="block text-sm font-medium text-gray-700">
                      Relationship to Reference *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="reference.relationship"
                        id="reference.relationship"
                        placeholder="Coach, Teacher, etc."
                        value={formData.reference.relationship}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.referenceRelationship ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.referenceRelationship && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.referenceRelationship}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="reference.contactInfo" className="block text-sm font-medium text-gray-700">
                      Reference Contact Information (Email or Phone) *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="reference.contactInfo"
                        id="reference.contactInfo"
                        value={formData.reference.contactInfo}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                          formErrors.referenceContact ? 'border-red-300' : ''
                        }`}
                      />
                      {formErrors.referenceContact && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.referenceContact}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="reference.organizationName" className="block text-sm font-medium text-gray-700">
                      Organization/School/Club (if applicable)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="reference.organizationName"
                        id="reference.organizationName"
                        value={formData.reference.organizationName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-yellow-50 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <InformationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>We may contact your reference to verify your sports credentials and financial need. Please ensure the information provided is accurate and that your reference is aware they may be contacted.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 5: Supporting Documents */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Supporting Documents</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Please upload any supporting documents such as certificates, awards, recommendation letters, or income proof that may help with your application.
                </p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Documents</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            ref={fileInputRef}
                            className="sr-only"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, PNG, JPG, DOC, DOCX up to 10MB each
                      </p>
                    </div>
                  </div>
                </div>
                
                {formData.documents.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Documents</h4>
                    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                      {formData.documents.map((file, index) => (
                        <li
                          key={index}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0 flex items-center">
                            <span className="text-gray-500 text-xs mr-4">{formatFileSize(file.size)}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-8">
                  <h3 className="text-md font-medium text-gray-900 mb-3">Additional Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="supportingInfo.previousAid" className="block text-sm font-medium text-gray-700">
                        Have you received any sports-related financial aid before? If yes, please provide details.
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="supportingInfo.previousAid"
                          name="supportingInfo.previousAid"
                          rows={2}
                          value={formData.supportingInfo.previousAid}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="supportingInfo.otherPrograms" className="block text-sm font-medium text-gray-700">
                        Are you currently receiving support from any other programs or organizations?
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="supportingInfo.otherPrograms"
                          name="supportingInfo.otherPrograms"
                          rows={2}
                          value={formData.supportingInfo.otherPrograms}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="supportingInfo.additionalInfo" className="block text-sm font-medium text-gray-700">
                        Any additional information you would like to share with the review committee?
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="supportingInfo.additionalInfo"
                          name="supportingInfo.additionalInfo"
                          rows={3}
                          value={formData.supportingInfo.additionalInfo}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 6: Review and Submit */}
            {currentStep === 6 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review and Submit</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Please review your application details before submitting. You can go back to previous steps to make changes if needed.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Full name</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.personalInfo.fullName}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Email address</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.personalInfo.email}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.personalInfo.phone}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.personalInfo.dateOfBirth}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Address</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {formData.personalInfo.address}
                            {formData.personalInfo.city && `, ${formData.personalInfo.city}`}
                            {formData.personalInfo.postalCode && `, ${formData.personalInfo.postalCode}`}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Sports Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Primary sport</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.sportsInfo.primarySport?.name}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Skill level</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.sportsInfo.skillLevel?.name}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Years of experience</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.sportsInfo.yearsExperience}</dd>
                        </div>
                        {formData.sportsInfo.currentAffiliation && (
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Current affiliation</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.sportsInfo.currentAffiliation}</dd>
                          </div>
                        )}
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Achievements</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line">{formData.sportsInfo.achievements}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Financial Need</h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Requested amount</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Rs. {Number(formData.financialNeed.requestedAmount).toLocaleString('en-LK')}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Facility usage</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.financialNeed.monthlyUsage}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Facilities needed</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex flex-wrap gap-2">
                              {formData.financialNeed.facilitiesNeeded.map((facilityId) => {
                                const facility = facilityTypes.find(f => f.id === facilityId);
                                return facility ? (
                                  <span 
                                    key={facilityId}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {facility.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Description</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line">{formData.financialNeed.description}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Reference</h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Name</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.reference.name}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Relationship</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.reference.relationship}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Contact</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.reference.contactInfo}</dd>
                        </div>
                        {formData.reference.organizationName && (
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Organization</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formData.reference.organizationName}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Documents</h3>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      {formData.documents.length > 0 ? (
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {formData.documents.map((file, index) => (
                            <li
                              key={index}
                              className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                            >
                              <div className="w-0 flex-1 flex items-center">
                                <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <span className="font-medium text-gray-500">{formatFileSize(file.size)}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No documents uploaded.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          checked={formData.terms}
                          onChange={handleCheckboxChange}
                          className={`focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded ${
                            formErrors.terms ? 'border-red-300' : ''
                          }`}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className={`font-medium ${formErrors.terms ? 'text-red-600' : 'text-gray-700'}`}>
                          Terms and Conditions *
                        </label>
                        <p className="text-gray-500">
                          I certify that all information provided is accurate and complete. I understand that providing false information may result in disqualification from financial assistance programs. I agree to the{' '}
                          <Link href="/terms" className="text-primary-600 hover:text-primary-500">
                            Terms and Conditions
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
                            Privacy Policy
                          </Link>.
                        </p>
                        {formErrors.terms && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.terms}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Next
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FinancialAidApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    sport: '',
    level: 'beginner',
    yearsOfExperience: '',
    currentAffiliation: '',
    achievements: '',
    financialNeed: '',
    requestedFacilityTypes: [] as string[],
    referenceName: '',
    referenceContact: '',
    referenceRelationship: '',
    supportingDocuments: [] as File[],
    agree: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const sportOptions = [
    { value: '', label: 'Select a sport' },
    { value: 'cricket', label: 'Cricket' },
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'badminton', label: 'Badminton' },
    { value: 'athletics', label: 'Athletics' },
    { value: 'volleyball', label: 'Volleyball' },
    { value: 'other', label: 'Other' },
  ];
  
  const levelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'professional', label: 'Professional' },
  ];
  
  const facilityTypeOptions = [
    { id: 'cricket-ground', label: 'Cricket Ground' },
    { id: 'football-field', label: 'Football Field' },
    { id: 'basketball-court', label: 'Basketball Court' },
    { id: 'swimming-pool', label: 'Swimming Pool' },
    { id: 'tennis-court', label: 'Tennis Court' },
    { id: 'badminton-court', label: 'Badminton Court' },
    { id: 'athletics-track', label: 'Athletics Track' },
    { id: 'volleyball-court', label: 'Volleyball Court' },
    { id: 'gym', label: 'Gym Facilities' },
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleFacilityTypeChange = (facilityId: string) => {
    const currentSelection = [...formData.requestedFacilityTypes];
    
    if (currentSelection.includes(facilityId)) {
      setFormData({
        ...formData,
        requestedFacilityTypes: currentSelection.filter(id => id !== facilityId)
      });
    } else {
      setFormData({
        ...formData,
        requestedFacilityTypes: [...currentSelection, facilityId]
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        supportingDocuments: [...formData.supportingDocuments, ...newFiles]
      });
    }
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = [...formData.supportingDocuments];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, supportingDocuments: updatedFiles });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    
    // Basic validation
    if (formData.requestedFacilityTypes.length === 0) {
      setError('Please select at least one facility type');
      setIsLoading(false);
      return;
    }
    
    if (!formData.agree) {
      setError('You must agree to the terms and conditions');
      setIsLoading(false);
      return;
    }
    
    try {
      // This would be an API call in a real application
      console.log('Application data:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed
      setSuccessMessage('Your application has been submitted successfully! We will review your application and get back to you soon.');
      
      // Reset form after successful submission
      setFormData({
        ...formData,
        sport: '',
        level: 'beginner',
        yearsOfExperience: '',
        currentAffiliation: '',
        achievements: '',
        financialNeed: '',
        requestedFacilityTypes: [],
        referenceName: '',
        referenceContact: '',
        referenceRelationship: '',
        supportingDocuments: [],
        agree: false,
      });
      
      // Scroll to top to show success message
      window.scrollTo(0, 0);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-primary-700 px-6 py-8 text-white">
            <h1 className="text-2xl font-bold">Financial Aid Application</h1>
            <p className="mt-2 text-primary-100">
              Apply for financial assistance to access quality sports facilities
            </p>
          </div>
          
          <div className="px-6 py-8">
            {successMessage && (
              <div className="mb-6 rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Success</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>{successMessage}</p>
                    </div>
                    <div className="mt-4">
                      <div className="-mx-2 -my-1.5 flex">
                        <Link
                          href="/financial-aid"
                          className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                        >
                          Return to Financial Aid
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mb-6 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="full-name"
                        name="fullName"
                        className="input-field"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="input-field"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        id="phone-number"
                        name="phoneNumber"
                        className="input-field"
                        required
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700">
                      Date of Birth *
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        id="date-of-birth"
                        name="dateOfBirth"
                        className="input-field"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="input-field"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sports Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Sports Information</h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
                      Primary Sport *
                    </label>
                    <div className="mt-1">
                      <select
                        id="sport"
                        name="sport"
                        className="input-field"
                        required
                        value={formData.sport}
                        onChange={handleInputChange}
                      >
                        {sportOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                      Skill Level *
                    </label>
                    <div className="mt-1">
                      <select
                        id="level"
                        name="level"
                        className="input-field"
                        required
                        value={formData.level}
                        onChange={handleInputChange}
                      >
                        {levelOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="years-of-experience" className="block text-sm font-medium text-gray-700">
                      Years of Experience *
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="years-of-experience"
                        name="yearsOfExperience"
                        className="input-field"
                        required
                        min="0"
                        max="50"
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="current-affiliation" className="block text-sm font-medium text-gray-700">
                      Current Team/Club/School (if any)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="current-affiliation"
                        name="currentAffiliation"
                        className="input-field"
                        value={formData.currentAffiliation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="achievements" className="block text-sm font-medium text-gray-700">
                      Notable Achievements *
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="achievements"
                        name="achievements"
                        rows={3}
                        className="input-field"
                        placeholder="List your sports achievements, medals, records, recognitions..."
                        required
                        value={formData.achievements}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Financial Need */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Financial Need</h2>
                <div>
                  <label htmlFor="financial-need" className="block text-sm font-medium text-gray-700">
                    Please describe your financial need and how this assistance would help your athletic development *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="financial-need"
                      name="financialNeed"
                      rows={4}
                      className="input-field"
                      required
                      value={formData.financialNeed}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              {/* Facility Requirements */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Facility Requirements</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What types of facilities do you need access to? (Select all that apply) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    {facilityTypeOptions.map((facility) => (
                      <div key={facility.id} className="flex items-center">
                        <input
                          id={facility.id}
                          name="requestedFacilityTypes"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          checked={formData.requestedFacilityTypes.includes(facility.id)}
                          onChange={() => handleFacilityTypeChange(facility.id)}
                        />
                        <label htmlFor={facility.id} className="ml-3 text-sm text-gray-700">
                          {facility.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* References */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Reference</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Please provide a reference (coach, sports teacher, or mentor) who can vouch for your sports abilities and financial need.
                </p>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="reference-name" className="block text-sm font-medium text-gray-700">
                      Reference Name *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="reference-name"
                        name="referenceName"
                        className="input-field"
                        required
                        value={formData.referenceName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="reference-contact" className="block text-sm font-medium text-gray-700">
                      Reference Contact (Email or Phone) *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="reference-contact"
                        name="referenceContact"
                        className="input-field"
                        required
                        value={formData.referenceContact}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="reference-relationship" className="block text-sm font-medium text-gray-700">
                      Relationship to Reference *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="reference-relationship"
                        name="referenceRelationship"
                        className="input-field"
                        placeholder="Coach, Teacher, etc."
                        required
                        value={formData.referenceRelationship}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Supporting Documents */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Supporting Documents</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Please upload any supporting documents such as certificates, awards, or recommendation letters.
                </p>
                
                <div className="mt-1">
                  <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Documents
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    onChange={handleFileChange}
                  />
                </div>
                
                {formData.supportingDocuments.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents:</h3>
                    <ul className="space-y-2">
                      {formData.supportingDocuments.map((file, index) => (
                        <li key={index} className="flex items-center justify-between py-2 px-3 text-sm bg-gray-50 rounded-md">
                          <span className="truncate max-w-xs">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Agreement */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agree"
                      name="agree"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={formData.agree}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agree" className="font-medium text-gray-700">
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
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Link
                  href="/financial-aid"
                  className="btn-outline mr-4"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className={`btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
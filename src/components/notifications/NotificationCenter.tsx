// src/components/notifications/NotificationCenter.tsx

'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import { 
  CalendarIcon, 
  TruckIcon, 
  CloudIcon, 
  CurrencyDollarIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';

// Mock notification data
const mockNotifications = [
  {
    id: 'notif-1',
    type: 'booking',
    title: 'Upcoming Booking Reminder',
    message: 'Your booking at Premadasa Cricket Stadium is tomorrow at 2:00 PM.',
    time: '1 hour ago',
    isRead: false,
    href: '/bookings/booking-12345'
  },
  {
    id: 'notif-2',
    type: 'transportation',
    title: 'Transportation Confirmed',
    message: 'Your transportation to SSC Swimming Pool has been confirmed. Driver will arrive at 7:30 AM.',
    time: '3 hours ago',
    isRead: false,
    href: '/bookings/transport-67890'
  },
  {
    id: 'notif-3',
    type: 'weather',
    title: 'Weather Alert',
    message: 'Rain expected at Beddagana Tennis Courts tomorrow. Consider checking indoor alternatives.',
    time: '5 hours ago',
    isRead: true,
    href: '/facilities/beddagana-tennis'
  },
  {
    id: 'notif-4',
    type: 'donation',
    title: 'Donation Update',
    message: 'Amali Fernando has achieved 70% of her funding goal. See her progress!',
    time: 'Yesterday',
    isRead: true,
    href: '/donations/athlete-2'
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'System Maintenance',
    message: 'SportsBookSL will be undergoing maintenance on April 20 from 2:00 AM to 4:00 AM.',
    time: '2 days ago',
    isRead: true,
    href: '/announcements'
  },
  {
    id: 'notif-6',
    type: 'booking',
    title: 'Booking Confirmation',
    message: 'Your booking at Kurunegala Swimming Complex has been confirmed.',
    time: '3 days ago',
    isRead: true,
    href: '/bookings/booking-54321'
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(notif => !notif.isRead).length;
  
  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };
  
  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.notification-center')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CalendarIcon className="h-6 w-6 text-blue-500" />;
      case 'transportation':
        return <TruckIcon className="h-6 w-6 text-green-500" />;
      case 'weather':
        return <CloudIcon className="h-6 w-6 text-purple-500" />;
      case 'donation':
        return <CurrencyDollarIcon className="h-6 w-6 text-amber-500" />;
      case 'system':
        return <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />;
      default:
        return <CheckCircleIcon className="h-6 w-6 text-gray-500" />;
    }
  };
  
  return (
    <div className="notification-center relative">
      <button
        type="button"
        className="relative p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-xs font-medium text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="notification-panel absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg overflow-hidden z-50 max-h-[80vh] flex flex-col">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                type="button"
                className="text-sm text-primary-600 hover:text-primary-700"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="overflow-y-auto flex-grow">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="text-gray-500">No notifications</p>
              </div>
            ) : (
              <ul role="list" className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li key={notification.id} className={`relative ${notification.isRead ? '' : 'bg-blue-50'}`}>
                    <a 
                      href={notification.href}
                      className="block px-4 py-4 hover:bg-gray-50"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </a>
                    <button
                      type="button"
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <span className="sr-only">Dismiss notification</span>
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
            <a href="/notifications" className="text-sm text-primary-600 hover:text-primary-700">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
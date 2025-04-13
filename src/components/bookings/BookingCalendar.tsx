'use client';

import { useState, useEffect, useMemo } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, getDay, isToday, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns'; // Added startOfDay

// Types (remain the same)
type BookingSlot = {
  time: string;
  available: boolean;
};

type DateAvailability = {
  date: Date; // Store as Date object for easier comparison
  slots: BookingSlot[];
};

interface BookingCalendarProps {
  availableDates?: DateAvailability[]; // Expecting Date objects now
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  selectedDate?: Date | null; // Allow null for initial state
  selectedTime?: string;
  minDate?: Date;
  maxDate?: Date;
}

// Helper for class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function BookingCalendar({
  availableDates = [],
  onDateSelect,
  onTimeSelect,
  selectedDate = null,
  selectedTime = '',
  minDate = startOfDay(new Date()), // Use startOfDay for comparisons
  maxDate = addMonths(new Date(), 3)
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate || new Date())); // Start with selected month or current
  
  // Memoize available dates map for performance
  const availabilityMap = useMemo(() => {
    const map = new Map<string, { hasSlots: boolean; slots: BookingSlot[] }>();
    availableDates.forEach(d => {
      const dateKey = format(d.date, 'yyyy-MM-dd');
      const hasAvailableSlots = d.slots.some(slot => slot.available);
      map.set(dateKey, { hasSlots: hasAvailableSlots, slots: d.slots });
    });
    return map;
  }, [availableDates]);

  // Generate days for the calendar grid
  const daysInGrid = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfDay(subMonths(monthStart, 0)); // Adjust if showing previous month days needed
    const endDate = startOfDay(addMonths(monthEnd, 0));   // Adjust if showing next month days needed

    // Simplified: Only show days of the current month for clarity
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Add padding for start day alignment
    const startDayOfWeek = getDay(monthStart); // 0 = Sunday, 6 = Saturday
    const paddingDays = Array(startDayOfWeek).fill(null);

    return [...paddingDays, ...days];
  }, [currentMonth]);

  // Get available time slots for the selected date
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return availabilityMap.get(dateKey)?.slots || [];
  }, [selectedDate, availabilityMap]);

  // Navigation handlers
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Check if a date is disabled
  const isDateDisabled = (date: Date | null): boolean => {
    if (!date) return true; // Null dates (padding) are disabled
    const dateKey = format(date, 'yyyy-MM-dd');
    const today = startOfDay(new Date());
    return isBefore(date, minDate && startOfDay(minDate)) ||
           isAfter(date, maxDate && startOfDay(maxDate)) ||
           !availabilityMap.has(dateKey) ||
           !availabilityMap.get(dateKey)?.hasSlots;
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    // Enhanced container with shadow and border
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/75">
      {/* Enhanced Calendar header */}
      <div className="p-5 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 transition-colors duration-150"
            aria-label="Previous month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900 tracking-wide">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 transition-colors duration-150"
            aria-label="Next month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Calendar grid */}
      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {dayNames.map((day) => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {daysInGrid.map((day, index) => {
            const isPadding = day === null;
            const isDisabled = isDateDisabled(day);
            const isSelected = !isPadding && selectedDate ? isSameDay(day, selectedDate) : false;
            const isCurrentMonthDay = !isPadding && isSameMonth(day, currentMonth); // Ensure it's current month
            const isTodayFlag = !isPadding && isToday(day);

            return (
              <div key={isPadding ? `pad-${index}` : day.toISOString()} className="aspect-square flex items-center justify-center">
                {!isPadding && isCurrentMonthDay ? (
                  <button
                    type="button"
                    onClick={() => !isDisabled && onDateSelect(day)}
                    disabled={isDisabled}
                    className={classNames(
                      'relative h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-400',
                      isSelected ? 'bg-primary-600 text-white font-semibold shadow-md scale-105' : '',
                      !isSelected && !isDisabled ? 'text-gray-800 hover:bg-primary-100 hover:text-primary-700' : '',
                      !isSelected && isDisabled ? 'text-gray-300 cursor-not-allowed' : '',
                      isTodayFlag && !isSelected ? 'font-bold border-2 border-primary-500' : '',
                      !isTodayFlag && !isSelected && !isDisabled ? 'border border-transparent' : '' // Base border for alignment if needed
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                    {/* Availability Indicator */}
                    {!isDisabled && !isSelected && (
                       <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-sm"></span>
                    )}
                  </button>
                ) : (
                  // Render empty div for padding or days outside current month
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Time slots section */}
      {selectedDate && (
        <div className="border-t border-gray-200 p-5 bg-gray-50/70 animate-fade-in">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            Available Times for {format(selectedDate, 'MMM d, yyyy')}
          </h3>
          {availableTimeSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => slot.available && onTimeSelect(slot.time)}
                  className={classNames(
                    'py-2.5 px-3 text-sm font-medium rounded-lg border transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-400',
                    !slot.available
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through opacity-70'
                      : selectedTime === slot.time
                        ? 'bg-primary-600 text-white border-primary-700 shadow-md scale-105 font-semibold'
                        : 'bg-white text-primary-700 border-primary-300 hover:bg-primary-50 hover:border-primary-500 hover:shadow-sm'
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm py-4">
              No available time slots for this date.
            </p>
          )}
        </div>
      )}

      {/* Enhanced Selection Summary */}
      {selectedDate && selectedTime && (
        <div className="border-t-2 border-primary-200 p-4 bg-gradient-to-r from-primary-50 to-blue-50">
          <div className="text-center">
            <p className="text-sm font-medium text-primary-800">Your selection:</p>
            <p className="font-semibold text-gray-900 mt-1">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              <span className="mx-2 text-gray-400">|</span>
              {selectedTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking, clearBooking } from '../Store/Reducer/bookingSlice';

export const useBookingPersistence = () => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking?.booking);

  // Save booking data to localStorage whenever it changes
  useEffect(() => {
    if (booking && Object.keys(booking).length > 0) {
      localStorage.setItem('booking_data', JSON.stringify(booking));
    }
  }, [booking]);

  // Load booking data from localStorage on mount
  useEffect(() => {
    const savedBooking = localStorage.getItem('booking_data');
    if (savedBooking) {
      try {
        const parsedBooking = JSON.parse(savedBooking);
        dispatch(updateBooking(parsedBooking));
      } catch (error) {
        console.error('Error parsing saved booking data:', error);
        localStorage.removeItem('booking_data');
      }
    }
  }, [dispatch]);

  // Clear booking data from localStorage
  const clearBookingData = () => {
    localStorage.removeItem('booking_data');
    dispatch(clearBooking());
  };

  return { clearBookingData };
}; 
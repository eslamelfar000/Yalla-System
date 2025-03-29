export const Events = [
  // Generate 5 events per day from March 29 to April 4, 2025
  ...Array.from({ length: 7 * 20 }, (_, index) => {
    const day = 29 + Math.floor(index / 5); // Days from March 29 to April 4
    const hour = (index % 10) + 9; // Start from 8 AM, shift every event per hour
    return {
      id: (index + 1).toString(),
      title: `Event ${index + 1}`,
      start: `2025-03-${day.toString().padStart(2, "0")}T${hour.toString().padStart(2, "0")}:00:00`,
      end: `2025-03-${day.toString().padStart(2, "0")}T${(hour + 1).toString().padStart(2, "0")}:30:00`,
      status: index % 8 === 0 ? "booked" : "open", // Alternate between booked and open
    };
  }),
];

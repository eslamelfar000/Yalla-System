export const Events = Array.from({ length: 100 }, (_, index) => {
  const baseDate = new Date(); // Get current date in user's local time
  baseDate.setFullYear(2025, 2, 29); // Start from March 29, 2025

  const dayOffset = Math.floor(index / 5); // Ensures at least 5 events per day
  baseDate.setDate(baseDate.getDate() + dayOffset); // Increment day

  const startHour = 9 + (index % 6); // Events between 9 AM and 2 PM
  const startDateTime = new Date(baseDate);
  startDateTime.setHours(startHour, 0, 0, 0); // Set local time properly

  const endDateTime = new Date(startDateTime);
  endDateTime.setHours(startHour + 1); // 1-hour duration

  return {
    id: (index + 1).toString(),
    title: `Event ${index + 1}`,
    start: startDateTime.toISOString(), // Convert to ISO format
    end: endDateTime.toISOString(),
    status: index % 4 === 0 ? "booked" : "open", // 25% booked, rest open
  };
});

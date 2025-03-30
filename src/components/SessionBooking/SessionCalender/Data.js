export const Events = Array.from({ length: 30 }, (_, index) => {
  const day = 29 + (index % 7); // Cycles through March 29 - April 4
  const hour = 9 + (index % 6); // Events between 9 AM and 2 PM

  return {
    id: (index + 1).toString(),
    title: `Event ${index + 1}`,
    start: `2025-03-${day.toString().padStart(2, "0")}T${hour.toString().padStart(2, "0")}:00:00`,
    end: `2025-03-${day.toString().padStart(2, "0")}T${(hour + 1).toString().padStart(2, "0")}:00:00`,
    status: index % 4 === 0 ? "booked" : "open", // 25% of events are "booked"
  };
});

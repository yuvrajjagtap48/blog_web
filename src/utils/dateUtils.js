// Utility function to format date as "9 Feb 2026" (no leading zero for day)
export const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate(); // No leading zero
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};
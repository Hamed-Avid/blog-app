export default function generatePagination(
  currentPage: number,
  totalPages: number,
) {
  
  // Display all pages if the total number of pages is 7 or less.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Define the start and end ellipsis pages
  const startPages = [1, 2, 3];
  const endPages = [totalPages - 2, totalPages - 1, totalPages];

  // Handle the first three pages case
  if (currentPage <= 3) {
    return [...startPages, "...", totalPages - 1, totalPages];
  }

  // Handle the last three pages case
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", ...endPages];
  }

  // Handle the middle pages case
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

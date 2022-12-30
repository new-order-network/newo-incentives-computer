function calculateDaysBetweenDates(begin, end) {
  const beginDate = new Date(begin);
  const endDate = new Date(end);
  const difference = endDate.getTime() - beginDate.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24));
}

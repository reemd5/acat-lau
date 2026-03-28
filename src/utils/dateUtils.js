import { differenceInDays, format, formatDistanceToNow } from "date-fns";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const diffDays = differenceInDays(new Date(), date);

  if (diffDays > 7) {
    return format(date, "MMMM dd, yyyy");
  }

  return formatDistanceToNow(date, { addSuffix: true });
};
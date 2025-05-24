import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatINR = (num: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(num);
};

export const handleAPIError = (error: any) => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.error ?? "Something went wrong");
  }
  throw new Error("Something went wrong");
};

export const capitalizeString = (str: string): string => {
  if (!str) return str;

  // Split the string into words
  const words = str.split(" ");

  // Capitalize first letter of each word and lowercase the rest
  const capitalizedWords = words.map((word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words back together
  return capitalizedWords.join(" ");
};

export const getInitials = (name: string): string => {
  if (!name) return "";

  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
};

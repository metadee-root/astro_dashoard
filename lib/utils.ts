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

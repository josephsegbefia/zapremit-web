import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-Us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function calcRateAdjustment(rate: string, percent: number) {
  const rateFloat = parseFloat(rate);
  // const percentFloat = parseFloat(percent);

  const percentAdjustment = rateFloat * percent;
  return rateFloat - percentAdjustment;
}

export function calcTransferProfit() {}

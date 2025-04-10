import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
// src/lib/utils.js
export function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
}
export function isObjectNotEmpty(obj) {
  return obj && Object.keys(obj).length > 0;
}

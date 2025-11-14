import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseName(
  first_name: string,
  middle_name: string,
  last_name: string,
  suffix: string
) {
  let full_name = `${first_name} ${middle_name
    .charAt(0)
    .toUpperCase()}. ${last_name} ${suffix}`;
  full_name = full_name.trim().replace(/\s+/g, " ");
  return full_name;
}
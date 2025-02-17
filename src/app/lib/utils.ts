import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pick<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

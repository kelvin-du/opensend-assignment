import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This function `cx` takes any number of class values as arguments, merges them using `clsx`,
 * and then further merges them using `twMerge` to handle Tailwind CSS class conflicts.
 */
export const cx = (...classes: ClassValue[]) => twMerge(clsx(classes));
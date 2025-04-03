import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string) => {
	const normalizedTechName = techName.replace(/[.]/g, "").toLowerCase();

	

	return techMap[normalizedTechName] ? `${techMap[normalizedTechName]} colored` : "devicon-devicon-plain";
};

 export const getTimeStamp = (date: Date): string => {
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
	const units = [
	  { label: "year", seconds: 31536000 },
	  { label: "month", seconds: 2592000 },
	  { label: "week", seconds: 604800 },
	  { label: "day", seconds: 86400 },
	  { label: "hour", seconds: 3600 },
	  { label: "minute", seconds: 60 },
	  { label: "second", seconds: 1 },
	];
  
	for (const unit of units) {
	  const count = Math.floor(seconds / unit.seconds);
	  if (count >= 1) {
		return `${count} ${unit.label}${count > 1 ? "s" : ""} ago`;
	  }
	}
  
	return "Just now"; // For cases where the time difference is less than 1 second
  };
  
//   // Example usage:
//   console.log(getTimeStamp(new Date(Date.now() - 5000)));        // "5 seconds ago"
//   console.log(getTimeStamp(new Date(Date.now() - 60000)));       // "1 minute ago"
//   console.log(getTimeStamp(new Date(Date.now() - 3600000)));     // "1 hour ago"
//   console.log(getTimeStamp(new Date(Date.now() - 86400000 * 3)));// "3 days ago"
//   console.log(getTimeStamp(new Date(Date.now() - 31536000000))); // "1 year ago"
  
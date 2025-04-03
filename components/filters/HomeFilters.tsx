"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Key } from "lucide-react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

const filters = [
	{ name: "React", value: "react" },
	{ name: "JavaScript", value: "javascript" },
	// { name: "Unanswered", value: "unanswered" },
	// { name: "Recommended", value: "recommended" },
];
const HomeFilters = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const filterParams = searchParams.get("filter");
	const [active, setActive] = useState(filterParams || "");

	const handleTypeClick = (filter: string) => {
		let newUrl = "";
		if (filter === active) {
			setActive("");

			newUrl = removeKeysFromUrlQuery({
				params: searchParams.toString(),
				keysToRemove: ["filter"],
			});
		} else {
			setActive(filter);

			newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "filter",
				value: filter.toLowerCase(),
			});
		}
		router.push(newUrl, { scroll: false });
	};
	return (
		<div className="mt-10 hidden fex-wrap gap-3 sm:flex">
			{filters.map((filter) => (
				<Button
					key={filter.name}
					className={cn(
						"body-medium rounded-lg px-6 py-3 capitalize shadow-none transition-colors",
						active === filter.value
							? "bg-orange-500 text-[#B65C30] hover:bg-orange-600 dark:bg-[#3f3b38] dark:text-[#E49658] dark:hover:bg-[#504a46]"
							: "bg-gray-200 text-[#E49658] hover:bg-orange-400 dark:bg-[#2e2b28] dark:text-[#E49658] dark:hover:bg-[#3f3b38]"
					)}
					onClick={() => handleTypeClick(filter.value)}
				>
					{filter.name}
				</Button>
			))}
		</div>
	);
};

export default HomeFilters;

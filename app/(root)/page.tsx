// import { auth } from "@/auth"; just for checking the authentication

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/filters/HomeFilters";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";
// import handleError from "@/lib/handlers/error";
// import { NotFoundError, ValidationError } from "@/lib/http-errors";
// import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import React from "react";

const questions = [
	{
		_id: "1",
		title: "How to learn React?",
		description: "I want to learn React, can anyone help me?",
		tags: [
			{ _id: "1", name: "React" },
			{ _id: "2", name: "JavaScript" },
		],
		author: {
			_id: "1",
			name: "John Doe",
			image: "https://cdn-icons-png.flaticon.com/128/1077/1077012.png",
		},
		upVotes: 10,
		answers: 5,
		views: 100,
		createdAt: new Date(),
	},
	{
		_id: "2",
		title: "How to learn JavaScript?",
		description: "I want to learn React, can anyone help me?",
		tags: [
			{ _id: "1", name: "React" },
			{ _id: "2", name: "JavaScript" },
			{ _id: "3", name: "NextJs" },
		],
		author: {
			_id: "1",
			name: "John Doe",
			image: "https://cdn-icons-png.flaticon.com/128/1077/1077012.png",
		},
		upVotes: 10,
		answers: 5,
		views: 100,
		createdAt: new Date("2023-09-23"),
	},
];

// const test = async () => {
// 	try {
// 		throw new ValidationError({
// 			title: ["Required"],
// 			tags: ['"JavaScript" is not a valid tag'],
// 		});
// 	} catch (error) {
// 		return handleError(error);
// 	}
// };
interface SearchParams {
	searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
	// const result = await test();
	// console.log(result);
	const { query = "", filter = "" } = await searchParams;
	const filteredQuestions = questions.filter((question) => {
		const matchesQuery = question.title
			.toLowerCase()
			.includes(query.toLowerCase());
		const matchFilter = filter
			? question.tags[0].name.toLowerCase() === filter.toLowerCase()
			: true;
		return matchesQuery && matchFilter;
	});
	// const session = await auth();
	// console.log(session);

	return (
		<>
			<section className="flex w-full  flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
				<h1 className="h1-bold text-dark100_light900">All Questions</h1>
				<Button
					className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
					asChild
				>
					<Link href={ROUTES.ASK_QUESTION}>Ask a question</Link>
				</Button>
			</section>
			<section className="mt-11">
				<LocalSearch
					route="/"
					imgSrc="/icons/search.svg"
					placeholder="Search questions..."
					otherClasses="flex-1"
				/>
			</section>
			<HomeFilters />
			<div className="mt-10 flex w-full flex-col gap-6">
				{filteredQuestions.map((question) => (
					<QuestionCard key={question._id} question={question} />
				))}
			</div>
		</>
	);
};

export default Home;

"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuestionForm = () => {
	const form = useForm({
		resolver: zodResolver(AskQuestionSchema),
		defaultValues: {
			title: "",
			content: "",
			tags: [],
		},
	});

	const handleCreatedQuestion = () => {
		console.log(handleCreatedQuestion);
	};
	return (
		<Form {...form}>
			<form
				className="flex w-full flex-col gap-10"
				onSubmit={form.handleSubmit(handleCreatedQuestion)}
			>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem className="flex-col flex w-full">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Question Title <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<input className="paragraph-regular min-h-[56px] border light-border-2 text-dark300_light700 no-focus bg-light-100 dark:bg-dark-input text-dark-700 dark:text-light-100" />
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Be specific and imagine you are asking a question to another
								person.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex-col flex w-full">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Detailed explanation of your problem
								<span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>Editor</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Introduce the problem and expand on what you have put in the
								title.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="flex-col flex w-full gap-3">
							<FormLabel className="paragraph-semibold text-dark400_light800">
								Tags <span className="text-primary-500">*</span>
							</FormLabel>
							<FormControl>
								<div>
									<Input
										className="paragraph-regular min-h-[56px] border light-border-2 text-dark300_light700 no-focus bg-light-100 dark:bg-dark-input text-dark-700 dark:text-light-100"
										placeholder="Add Tags..."
										{...field}
									/>
									<h3>Tags</h3>
								</div>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Add up to 3 tags to describe what your question is about. You
								need to press enter to add a tag.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="mt-16 flex justify-end">
					<Button
						type="submit"
						className="primary-gradient w-fit !text-light-900"
					>
						Ask Question
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default QuestionForm;

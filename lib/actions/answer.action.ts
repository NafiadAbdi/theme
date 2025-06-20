"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { after } from "next/server";

import { Question, Vote } from "@/database";
import Answer, { IAnswerDoc } from "@/database/answer.model";

import action from "../handlers/action";
import handleError from "../handlers/error";

// import { createInteraction } from "./interaction.action";
import { ActionResponse, ErrorResponse } from "@/types/global";
import ROUTES from "@/constants/route";
import { AnswerServerSchema } from "../validations";

export async function createAnswer(
	params: CreateAnswerParams
): Promise<ActionResponse<IAnswerDoc>> {
	const validationResult = await action({
		params,
		schema: AnswerServerSchema,
		authorize: true,
	});

	if (validationResult instanceof Error) {
		return handleError(validationResult) as ErrorResponse;
	}

	const { content, questionId } = validationResult.params!;
	const userId = validationResult.session?.user?.id;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// check if the question exists
		const question = await Question.findById(questionId);
		if (!question) throw new Error("Question not found");

		const [newAnswer] = await Answer.create(
			[
				{
					author: userId,
					question: questionId,
					content,
				},
			],
			{ session }
		);

		if (!newAnswer) throw new Error("Failed to create the answer");

		// update the question answers count
		question.answers += 1;
		await question.save({ session });

		// log the interaction
		// after(async () => {
		// 	await createInteraction({
		// 		action: "post",
		// 		actionId: newAnswer._id.toString(),
		// 		actionTarget: "answer",
		// 		authorId: userId as string,
		// 	});
		// });

		await session.commitTransaction();

		revalidatePath(ROUTES.QUESTION(questionId));

		return { success: true, data: JSON.parse(JSON.stringify(newAnswer)) };
	} catch (error) {
		await session.abortTransaction();
		return handleError(error) as ErrorResponse;
	} finally {
		await session.endSession();
	}
}

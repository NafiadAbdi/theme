import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/route";
import { redirect } from "next/navigation";
import React from "react";

const AskAQuestion = async () => {
	const session = await auth();
	if (!session) return redirect(ROUTES.SIGN_IN);
	return (
		<div>
			<h1 className="h1-bold text-dark100_light900"> Ask question </h1>
			<div className="mt-9">
				<QuestionForm />
			</div>
		</div>
	);
};

export default AskAQuestion;

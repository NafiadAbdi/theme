import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestion } from "@/lib/actions/question.action";
import ROUTES from "@/constants/route";
import { RouteParams } from "@/types/global";

const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect("/sign-in");

  const { data: question, success } = await getQuestion({ questionId: id });
  if (!success) return notFound();

  if (!question) return notFound();

  if (question.author.toString() !== session?.user?.id)
    redirect(ROUTES.QUESTION(id));

  // Map IQuestionDoc to Question type expected by QuestionForm
  const mappedQuestion = {
    _id: question._id ? question._id.toString() : "",
    title: question.title,
    content: question.content,
    tags: Array.isArray(question.tags)
      ? question.tags.map((tag: any) =>
          typeof tag === "object" && tag !== null && "name" in tag
            ? tag
            : { _id: tag.toString(), name: "" }
        )
      : [],
    views: question.views,
    upVotes: question.upvotes, // map upvotes to upVotes
    downVotes: question.downvotes,
    answers: question.answers,
    author:
      typeof question.author === "object" && question.author !== null
        ? {
            _id: question.author._id,
            name: (question.author as any).name || "",
            image: (question.author as any).image || "",
          }
        : { _id: question.author.toString(), name: "", image: "" },
  };

  return (
    <main>
      <QuestionForm question={mappedQuestion} isEdit />
    </main>
  );
};

export default EditQuestion;
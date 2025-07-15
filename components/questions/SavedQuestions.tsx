"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { use, useState } from "react";

import { toast } from "sonner";
import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { ActionResponse } from "@/types/global";

const SaveQuestion = ({
	questionId,
	hasSavedQuestionPromise,
}: {
	questionId: string;
	hasSavedQuestionPromise: Promise<ActionResponse<{ saved: boolean }>>;
}) => {
	const session = useSession();
	const userId = session?.data?.user?.id;

	const { data } = use(hasSavedQuestionPromise);
	const { saved: hasSaved } = data || {};

	const [isLoading, setIsLoading] = useState(false);

	const handleSave = async () => {
		if (isLoading) return;

		if (!userId) {
			return toast({
				title: "You need to be logged in to save a question",
				variant: "destructive",
			});
		}

		setIsLoading(true);

		try {
			const { success, data, error } = await toggleSaveQuestion({ questionId });

			if (!success) {
				throw new Error(error?.message || "An error occurred");
			}

			const saved = data?.saved;

			if (typeof saved !== "boolean") {
				toast({
					title: "Unexpected response",
					description: "Could not determine saved state",
					variant: "destructive",
				});
				return;
			}

			toast({
				title: saved
					? "Question saved successfully"
					: "Question unsaved successfully",
				description: "Your changes have been recorded.",
			});
		} catch (error) {
			toast({
				title: "Error",
				description:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Image
			src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
			width={18}
			height={18}
			alt="save"
			className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
			aria-label="Save question"
			onClick={handleSave}
		/>
	);
};

export default SaveQuestion;

"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { formatNumber } from "@/lib/utils";
import { toast } from "sonner";
// import { getHasVoted, createVote } from "@/lib/actions/vote.action"; // Make sure this exists

interface Params {
	targetType: "question" | "answer";
	targetId: string;
	upvotes: number;
	downvotes: number;
}

const Votes = ({ upvotes, downvotes, targetId, targetType }: Params) => {
	const session = useSession();
	const userId = session.data?.user?.id;

	const [hasUpvoted, setHasUpvoted] = useState(false);
	const [hasDownvoted, setHasDownvoted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchVoteStatus = async () => {
			if (!userId) return;

			try {
				const result = await getHasVoted({ targetId, targetType });

				if (result.success) {
					setHasUpvoted(result.data.hasUpvoted);
					setHasDownvoted(result.data.hasDownvoted);
				}
			} catch (error) {
				console.error("Vote fetch error", error);
			}
		};

		fetchVoteStatus();
	}, [userId, targetId, targetType]);

	const handleVote = async (voteType: "upvote" | "downvote") => {
		if (!userId)
			return toast({
				title: "Please login to vote",
				description: "Only logged-in users can vote.",
			});

		setIsLoading(true);

		try {
			const result = await createVote({
				targetId,
				targetType,
				voteType,
			});

			if (!result.success) {
				return toast({
					title: "Failed to vote",
					description: result.error?.message,
					variant: "destructive",
				});
			}

			// Toggle state after successful vote
			if (voteType === "upvote") {
				setHasUpvoted((prev) => !prev);
				if (hasDownvoted) setHasDownvoted(false);
			} else {
				setHasDownvoted((prev) => !prev);
				if (hasUpvoted) setHasUpvoted(false);
			}

			toast({
				title: "Vote recorded",
				description: `Your ${voteType} has been registered.`,
			});
		} catch (error) {
			toast({
				title: "Error voting",
				description: "An unexpected error occurred.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex-center gap-2.5">
			<div className="flex-center gap-1.5">
				<Image
					src={hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
					width={18}
					height={18}
					alt="upvote"
					className={`cursor-pointer ${isLoading && "opacity-50"}`}
					onClick={() => !isLoading && handleVote("upvote")}
				/>
				<div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
					<p className="subtle-medium text-dark400_light900">
						{formatNumber(upvotes)}
					</p>
				</div>
			</div>

			<div className="flex-center gap-1.5">
				<Image
					src={hasDownvoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
					width={18}
					height={18}
					alt="downvote"
					className={`cursor-pointer ${isLoading && "opacity-50"}`}
					onClick={() => !isLoading && handleVote("downvote")}
				/>
				<div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
					<p className="subtle-medium text-dark400_light900">
						{formatNumber(downvotes)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Votes;

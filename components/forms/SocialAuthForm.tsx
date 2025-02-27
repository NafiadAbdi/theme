"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/route";

const SocialAuthForm = () => {
	const buttonClass =
		"background-dark400_light900 body-medium rounded-2 min-h-12 flex-1 px-4 py-3.5";

	const handleSignIn = async (provider: "github" | "google") => {
		try {
			await signIn(provider, {
				callbackUrl: ROUTES.HOME,
				redirect: false,
			});
		} catch (error) {
			console.error(error);
			toast.error("Sign-in Failed", {
				description:
					error instanceof Error
						? error.message
						: "An error occurred during sign-in",
				style: {
					background: "orange",
				},
			});
		}
	};

	return (
		<div className="mt-10 flex flex-wrap gap-2.5">
			<Button className={buttonClass} onClick={() => handleSignIn("github")}>
				<Image
					src="/icons/github.svg"
					alt="Github Logo"
					width={20}
					height={20}
					className="mr-2.5 object-contain"
				/>
				<span>Login with GitHub</span>
			</Button>
			<Button className={buttonClass} onClick={() => handleSignIn("google")}>
				<Image
					src="/icons/google.svg"
					alt="Google Logo"
					width={20}
					height={20}
					className="mr-2.5 object-contain"
				/>
				<span>Login with Google</span>
			</Button>
		</div>
	);
};

export default SocialAuthForm;

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";
import React from "react";

const Home = async() => {
	const session = await auth();
	console.log(session);
	return (
		<>
			{/* <h1 className="text-2xl font-bold">Welcome to the Next.js Theme</h1> */}
			<form className="px-10 pt-[100px]" action={async () =>{
				"use server"

				await signOut({redirectTo: ROUTES.SIGN_IN})
			}}>
				<Button type="submit" >Log Out</Button>
			</form>
		</>
	);
};

export default Home;

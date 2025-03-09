import { auth } from "@/auth";

import React from "react";

const Home = async () => {
	const session = await auth();
	console.log(session);
	return (
		<>
			<h1 className="text-2xl font-bold">Welcome to the Next.js Theme</h1>
		</>
	);
};

export default Home;

import LeftSidebar from "@/components/navigation/LeftSidebar";
import Navbar from "@/components/navigation/navbar/Navbar";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="background-light850_dark100 relative">
			<Navbar />

			<div className="flex">
				<LeftSidebar />

				<section className="flex min-h-screen flex-1 flex-col">
					<div>{children}</div>
				</section>
			</div>
		</main>
	);
};

export default RootLayout;

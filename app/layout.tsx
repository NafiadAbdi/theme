import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner"; // Correct import
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { auth } from "@/auth";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();

	return (
		<html lang="en" suppressHydrationWarning>
			<SessionProvider session={session}>
				<body
					className={`${geistSans.className} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						{/* Moved the Toaster inside the <body> to maintain valid HTML */}
						<Toaster position="top-center" />
					</ThemeProvider>
				</body>
			</SessionProvider>
		</html>
	);
};
export default RootLayout;

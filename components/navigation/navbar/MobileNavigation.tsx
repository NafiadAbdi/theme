import React from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/route";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";

const MobileNavigation = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Image
					src="/icons/hamburger.svg"
					width={36}
					height={36}
					alt="menu"
					className="invert-colors sm:hidden"
				/>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="background-light900_dark200 border-none"
			>
				<SheetTitle className="hidden">Navigation</SheetTitle>
				<Link href="/" className="flex items-center gap-1">
					<Image
						src="/images/site-logo.svg"
						height={23}
						width={23}
						alt="Logo"
					/>
					<p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
						Dev<span className="text-primary-500">Flow</span>
					</p>
				</Link>

				<div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-auto">
					<SheetClose asChild>
						<section className="flex h-full flex-col gap-6 pt-16">
							<NavLinks isMobileNav={true} />
						</section>
					</SheetClose>

					<div className="gap-3 flex flex-col mt-20">
						<SheetClose asChild>
							<Link href={ROUTES.SIGN_IN}>
								<Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
									<span className="primary-text-gradient">Log In</span>
								</Button>
							</Link>
						</SheetClose>
						<SheetClose asChild>
							<Link href={ROUTES.SIGN_UP}>
								<Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
									<span className="primary-text-gradient">Sign Up</span>
								</Button>
							</Link>
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNavigation;

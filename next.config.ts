import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: ["pino", "pino-pretty"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "static.vecteezy.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
			{
				protocol: "https",
				hostname: "www.gravatar.com",
				port: "",
			},
		],
	},
};

export default nextConfig;

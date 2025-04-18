import mongoose, { Mongoose } from "mongoose";
import logger from "./logger";

const MONGODB_URL = process.env.MONGODB_URL as string;
if (!MONGODB_URL) {
	throw new Error("MONGODB_URL is not defined");
}

interface MongooseCache {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

declare global {
	// eslint-disable-next-line no-var, no-unused-vars
	var mongoose: MongooseCache;
}
let cached = global.mongoose;
if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
	if (cached.conn) {
		logger.info("Using existing MongoDB connection"); // replace console.log with logger.info
		return cached.conn;
	}
	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URL, {
				dbName: "devflow",
			})
			.then((result) => {
				logger.info("Connected to MongoDB"); // replace console.log with logger.info
				return result;
			})
			.catch((error) => {
				logger.error("Error connecting to MongoDB", error); // replace with console.log  with logger.error
				throw error;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
};

export default dbConnect;

import { Schema, model, models, Types } from "mongoose";

export interface IQuestion {
	title: string;
	Content: string;
	tags: Types.ObjectId[];
	views: number;
	upvotes: number;
	downvotes: number;
	answers: number;
	author: Types.ObjectId;
}
const QuestionSchema = new Schema<IQuestion>(
	{
		title: { type: String, required: true },
		Content: { type: String, required: true },
		tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
		views: { type: Number, default: 0 },
		upvotes: { type: Number, default: 0 },
		downvotes: { type: Number, default: 0 },
		answers: { type: Number, default: 0 },
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);
const Question =
	models?.Question || model<IQuestion>("Question", QuestionSchema);
export default Question;

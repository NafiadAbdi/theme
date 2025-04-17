import { Schema, model, models, Types } from "mongoose";

export interface IAccount {
	userId: Types.ObjectId;
	name: string;
	image?: string;
	password?: string;
	provider: string;
	providerAccountId: string;
}
const AccountSchema = new Schema<IAccount>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		name: { type: String, required: true },
		image: { type: String },
		password: { type: String, required: true },
		provider: { type: String, required: true },
		providerAccountId: { type: String, required: true },
	},
	{ timestamps: true }
);
const Account = models?.Account || model<IAccount>("Account", AccountSchema);
export default Account;

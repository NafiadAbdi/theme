import { NextResponse } from "next/server";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import Account from "@/database/account.model";
import dbConnect from "@/lib/mongoose";

export async function POST(request: Request) {
    try {
        const { providerAccountId } = await request.json();

        await dbConnect();
        const validatedData = AccountSchema.partial().safeParse({ providerAccountId });

        if (!validatedData.success)
            throw new ValidationError(validatedData.error.flatten().fieldErrors);

        const account = await Account.findOne({ providerAccountId });
        if (!account) throw new NotFoundError("Account");

        return NextResponse.json(
            {
                success: true,
                data: account,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in /api/accounts/provider POST:", error);
        return handleError(error, "api") as APIErrorResponse;
    }
}

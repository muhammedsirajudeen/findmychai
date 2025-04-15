import { CustomRequest, withAuthentication } from "@/app/utils/decorators";
import { NextResponse } from "next/server";

export const GET = withAuthentication(async (request: CustomRequest) => {
    return NextResponse.json({ message: "Success", user: request.user }, { status: 200 });
});
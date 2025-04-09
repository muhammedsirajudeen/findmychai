import { AccessToken } from "@/app/dto/auth/AccessTokenDto"
import CustomError from "@/app/utils/CustomError"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        // console.log(await request.json())
        const requestBody = await request.json()
        console.log(requestBody)
        const accessToken = new AccessToken(requestBody)
        return NextResponse.json({ message: "Signed in successfully" })
    } catch (error) {
        console.log("[Error in Signin Controller]", error)
        if (error instanceof CustomError) {
            return NextResponse.json({ message: error.message }, { status: error.statusCode })
        }
        return NextResponse.json({ message: "Error in Signin Controller", error: error }, { status: 500 })
    }
}
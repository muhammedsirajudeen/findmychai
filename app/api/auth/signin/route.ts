//think about converting to trpc if u can nah that would be awesome i guess lets see
import 'reflect-metadata'
import { AccessToken } from "@/app/dto/auth/AccessTokenDto"
import UserService from "@/app/service/UserService"
import CustomError from "@/app/utils/CustomError"
import connectToMongo from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server"
import container from '@/app/core/ioc/config'
export async function POST(request: NextRequest) {
    try {
        connectToMongo()
        const requestBody = await request.json()
        const accessTokenDto = new AccessToken(requestBody)
        const userService: UserService = container.resolve('UserService')
        const user = await userService.createUserGivenAccessToken(accessTokenDto)
        console.log(user)
        return NextResponse.json({ message: "Signed in successfully", user: user }, { status: 200 })
    } catch (error) {
        console.log("[Error in Signin Controller]", error)
        if (error instanceof CustomError) {
            return NextResponse.json({ message: error.message }, { status: error.statusCode })
        }
        return NextResponse.json({ message: "Error in Signin Controller", error: error }, { status: 500 })
    }
}
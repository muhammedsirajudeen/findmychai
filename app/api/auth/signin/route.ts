import 'reflect-metadata'
import { AccessToken } from "@/app/dto/auth/AccessTokenDto"
import UserService from "@/app/service/UserService"
import { NextRequest, NextResponse } from "next/server"
import container from '@/app/core/ioc/config'
import { JWTHelper } from '@/app/utils/jwtHelper'
import env from '@/app/constant/env'
import ms from "ms"
import { withLoggingAndErrorHandling } from '@/app/utils/decorators'


export const POST = withLoggingAndErrorHandling(async function (request: NextRequest) {
    const requestBody = await request.json()
    const accessTokenDto = new AccessToken(requestBody)
    const userService: UserService = container.resolve('UserService')
    const user = await userService.createUserGivenAccessToken(accessTokenDto)
    const token = JWTHelper.sign({ ...user.toObject(), password: undefined }, { expiresIn: env.JWT_EXPIRES_IN as ms.StringValue })
    const response = NextResponse.json({ message: "Signed in successfully", user: user }, { status: 200 })
    response.cookies.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: ms(env.JWT_EXPIRES_IN as ms.StringValue),
    })
    return response
})
import { NextResponse } from "next/server"

export function GET() {
    try {
        return NextResponse.json({ message: "Signin GET API is working" })
    } catch (error) {
        console.log("[Error in Signin Controller]", error)
        return NextResponse.json({ message: "Error in Signin Controller", error: error }, { status: 500 })
    }
}
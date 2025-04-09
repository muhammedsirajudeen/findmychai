'use client'
import axiosInstance from "@/app/utils/axiosInstance";
import { Button } from "../ui/button";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function GoogleLogin() {
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log(tokenResponse)
            try {
                const response = await axiosInstance.post('/auth/signin', {
                    access_token: tokenResponse.access_token,
                })
                console.log(response.data)
                toast.success('Login successful');
            } catch (error) {
                const axiosError = error as AxiosError
                if (axiosError.status === 400) {
                    toast.error('Invalid credentials');
                }
            }
        },
    });
    return (
        <Button onClick={() => login()} className="w-full py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            Login with Google
        </Button>

    )
}
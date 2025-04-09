'use client'
import axiosInstance from "@/app/utils/axiosInstance";
import { Button } from "../ui/button";
import { useGoogleLogin } from '@react-oauth/google';
import { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import ToastStyles from "@/app/constant/ToastStyles";

export default function GoogleLogin() {
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log(tokenResponse)
            try {
                const response = await axiosInstance.post('/auth/signin', {
                    access_token: tokenResponse.access_token,
                })
                console.log(response.data)
                toast({ title: 'Login Successful', description: 'You have successfully logged in', className: ToastStyles.success })
            } catch (error) {
                const axiosError = error as AxiosError
                if (axiosError.status === 400) {
                    toast({ title: 'Login Failed', description: 'Invalid credentials', className: ToastStyles.error })
                } else {
                    toast({ title: 'Login Failed', description: 'Something went wrong', className: ToastStyles.error })
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
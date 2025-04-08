'use client'
import { Button } from "../ui/button";

export default function GoogleLogin() {
    const loginHandler = () => {
        // Implement Google login logic here
        alert("Implementation pending");
    }
    return (
        <Button onClick={loginHandler} className="w-full py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            Login with Google
        </Button>
    )
}
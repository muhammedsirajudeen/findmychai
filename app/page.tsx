import Image from "next/image"
import GoogleLogin from "@/components/auth/GoogleLogin"
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2 tracking-tight">Find My Chai</h1>
          <div className="h-1 w-24 bg-orange-300 mx-auto rounded-full mb-6"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-3">Find the best chai near you</h2>
        <p className="text-lg text-amber-700 mb-8">Your chai adventure starts here.</p>

        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image
            src="/placeholder.svg?height=192&width=192"
            alt="Chai cup illustration"
            width={192}
            height={192}
            className="object-contain"
          />
        </div>
        <GoogleLogin />

        <p className="mt-6 text-amber-600 text-sm">Discover and share your favorite chai spots around the world</p>
      </div>
    </div>
  )
}


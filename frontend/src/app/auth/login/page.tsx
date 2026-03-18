"use client"

import Button from "@/components/ui/Button"
import { googleLogin } from "@/services/auth.service"

export default function LoginPage() {

  return (

    <div className="flex flex-col items-center justify-center h-screen gap-6">

      <h1 className="text-3xl font-bold">
        Login
      </h1>

      <Button onClick={googleLogin}>
        Continue with Google
      </Button>

    </div>

  )

}
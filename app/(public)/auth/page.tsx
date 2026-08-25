import Image from "next/image"
import { LoginForm } from "./_components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <LoginForm />

        </div>
      </div>

      <div className="hidden items-center justify-center bg-primary lg:flex">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="https://supabase.gtgestao.cloud/storage/v1/object/public/avatar/Untitled%20folder/images.png"
            alt="Logo GT Gestão"
            width={1000}
            height={1000}
            className="size-25 rounded-lg object-cover"
          />
          <div className="text-white">
            <h2 className="text-2xl font-bold">GT Gestão</h2>
            <p className="text-lg">Sistema Principal GT</p>
          </div>
        </div>
      </div>
    </div>
  )
}

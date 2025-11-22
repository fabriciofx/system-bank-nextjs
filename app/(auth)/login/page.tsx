'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginForm from '@/src/components/login/LoginForm';
import { login } from '@/src/services/AuthService';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 min-h-screen">
      <div className="w-1/2 h-full">
        <div className="flex items-center justify-center gap-2 ml-40 mr-40 mt-20">
          <span className="text-[5vw] font-bold">SystemBank</span>
          <Image
            src="/logo.png"
            width="150"
            height="150"
            className="w-[5vw] h-auto"
            alt="SystemBank logo"
          />
        </div>
        <div className="mx-40 mt-32">
          <LoginForm login={login} router={router}></LoginForm>
        </div>
      </div>
    </div>
  );
}

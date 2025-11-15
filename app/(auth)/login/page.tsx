'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FormLogin from '@/src/components/login/FormLogin';
import { login } from '@/src/services/AuthService';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="container">
      <div className="form">
        <div className="logo">
          <span className="title">SystemBank</span>
          <Image
            src="/logo.png"
            width="150"
            height="150"
            alt="SystemBank logo"
          />
        </div>
        <div className="login-form">
          <FormLogin login={login} router={router}></FormLogin>
        </div>
      </div>
    </div>
  );
}

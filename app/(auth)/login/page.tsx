'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginForm from '@/src/components/login/LoginForm';
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
          <LoginForm login={login} router={router}></LoginForm>
        </div>
      </div>
    </div>
  );
}

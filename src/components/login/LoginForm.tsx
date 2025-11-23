import { Button, TextField } from '@mui/material';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';
import {
  CREDENTIALS_INVALIDAS,
  type Credentials
} from '../../models/Credentials';

type LoginFormProps = {
  login: (credentials: Credentials) => Promise<boolean>;
  router: AppRouterInstance;
};

export default function LoginForm({ login, router }: LoginFormProps) {
  const [credentials, setCredentials] = useState<Credentials>(
    CREDENTIALS_INVALIDAS
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const response = await login(credentials);
    if (response) {
      router.push('/clientes');
    }
  }

  return (
    <div className="flex flex-col mt-[5%] mx-[15%] mb-[15%]">
      <div className="mb-[20%]">
        <h1 className="text-[28px] font-bold mb-3">Login</h1>
        <p className="font-normal text-base text-[#737e88] mt-0">
          Faça login na área administrativa do sistema. Solicite um acesso à
          equipe técnica.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-10">
            <label
              htmlFor="username"
              className="font-semibold text-sm text-[#0b0c0d]"
            >
              E-mail ou Nome de Usuário
            </label>
            <TextField
              id="username"
              name="username"
              className="bg-white border border-solid p-4 rounded text-[18px] shadow-none"
              value={credentials.username}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </div>
          <div className="flex flex-col mb-10">
            <label
              htmlFor="password"
              className="font-semibold text-sm text-[#0b0c0d]"
            >
              Senha
            </label>
            <TextField
              type="password"
              id="password"
              name="password"
              className="bg-white border border-solid p-4 rounded text-[18px] shadow-none"
              value={credentials.password}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </div>
          <p className="font-semibold text-sm text-[#1a77f2] underline mt-3 mb-[52px]">
            Esqueci minha senha
          </p>
          <div className="flex justify-center">
            <Button type="submit" variant="contained">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

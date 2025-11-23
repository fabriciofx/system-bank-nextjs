import { Button, TextField } from '@mui/material';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';
import type { Credentials } from '../../models/Credentials';
import { ErrorMessage } from '../message/Message';

type LoginFormProps = {
  login: (credentials: Credentials) => Promise<boolean>;
  router: AppRouterInstance;
};

export default function LoginForm({ login, router }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const credentials: Credentials = {
      username: username,
      password: password
    };
    try {
      await login(credentials);
      router.push('/clientes');
    } catch (error) {
      await new ErrorMessage('Autenticação inválida', `${error}`).show();
      setUsername('');
      setPassword('');
    }
  }

  return (
    <div className="flex flex-col mb-8">
      <div className="mb-16">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-gray-500">
          Faça login na área administrativa do sistema. Solicite um acesso à
          equipe técnica.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-10">
            <label htmlFor="username" className="font-semibold text-sm">
              E-mail ou Nome de Usuário
            </label>
            <TextField
              id="username"
              name="username"
              className="bg-white border"
              variant="outlined"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="flex flex-col mb-10">
            <label htmlFor="password" className="font-semibold text-sm">
              Senha
            </label>
            <TextField
              type="password"
              id="password"
              name="password"
              className="bg-white border"
              variant="outlined"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-8">
            <a
              href="http://localhost:3000/recuperar-senha"
              className="text-blue-500 underline"
            >
              Esqueci minha senha
            </a>
          </div>
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

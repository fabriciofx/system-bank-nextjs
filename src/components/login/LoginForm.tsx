import { Button, TextField } from '@mui/material';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';
import {
  CREDENTIALS_INVALIDAS,
  type Credentials
} from '../../models/Credentials';
import styles from './LoginForm.module.css';

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
    <div className={styles.form_login}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>
          Faça login na área administrativa do sistema. Solicite um acesso à
          equipe técnica.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_input}>
            <label htmlFor="username" className={styles.label}>
              E-mail ou Nome de Usuário
            </label>
            <TextField
              id="username"
              name="username"
              className={styles.input}
              value={credentials.username}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </div>
          <div className={styles.form_input}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <TextField
              type="password"
              id="password"
              name="password"
              className={styles.input}
              value={credentials.password}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </div>
          <p className={styles.reset_password}>Esqueci minha senha</p>
          <Button type="submit" className={styles.entrar} variant="contained">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

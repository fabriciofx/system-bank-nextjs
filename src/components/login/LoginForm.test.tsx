import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { fakeLogin } from '../../services/FakeAuthService';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('deve autenticar o usuário', async () => {
    const fakeRouter = {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn()
    } as AppRouterInstance;
    const screen = await render(
      <LoginForm login={fakeLogin} router={fakeRouter} />
    );
    await vi.waitFor(async () => {
      await screen.getByLabelText(/e-mail ou nome de usuário/i).fill('teste');
      await screen.getByLabelText(/senha/i).fill('12345678');
      await screen.getByRole('button').click();
      expect(fakeRouter.push).toHaveBeenCalledWith('/clientes');
    });
  });
});

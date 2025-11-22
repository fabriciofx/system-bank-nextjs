'use server';

import { cookies } from 'next/headers';
import type { AuthTokens } from '../models/Auth';

export async function setAuthTokens(tokens: AuthTokens) {
  const cks = await cookies();
  cks.set('access_token', tokens.access, { httpOnly: true, path: '/' });
  cks.set('refresh_token', tokens.refresh, { httpOnly: true, path: '/' });
}

export async function clearAuthTokens() {
  const cks = await cookies();
  cks.delete('access_token');
  cks.delete('refresh_token');
}

'use server';

import { cookies } from 'next/headers';
import type { AuthTokens } from '../models/Auth';

export async function getAuthTokens(): Promise<AuthTokens> {
  const cks = await cookies();
  return {
    access: cks.get('access_token')?.value || '',
    refresh: cks.get('refresh_token')?.value || ''
  };
}

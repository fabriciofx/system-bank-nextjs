'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MuiThemeProvider from '@/src/theme/MuiThemeProvider';

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="pt-BR">
      <body>
        <MuiThemeProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}

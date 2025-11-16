import type { Metadata } from 'next';
import MuiThemeProvider from '@/src/theme/MuiThemeProvider';

export const metadata: Metadata = {
  title: 'SystemBank',
  description: 'Aplicação de exemplo de utilização do Next.JS'
};

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </body>
    </html>
  );
}

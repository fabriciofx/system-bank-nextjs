'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { useDeleteConta } from '@/src/hooks/useConta';
import ContasList from '../../src/components/conta/ContasList';
import Navbar from '../../src/components/navbar/Navbar';
import { usePagesContasClientes } from '../../src/hooks/useContasClientes';

export default function ContasPage() {
  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-extrabold mb-4">Listagem de contas</h1>
      <div className="flex justify-start items-start gap-4 mb-4">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/contas/nova"
        >
          Nova conta
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/contas/saque"
        >
          Saque
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/contas/deposito"
        >
          Depósito
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/contas/transferencia"
        >
          Transferência
        </Button>
      </div>
      <ContasList
        pages={usePagesContasClientes}
        remove={useDeleteConta}
        rowsPage={10}
      />
    </div>
  );
}

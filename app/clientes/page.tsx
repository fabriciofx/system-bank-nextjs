'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import ClientesList from '../../src/components/cliente/ClientesList';
import Navbar from '../../src/components/navbar/Navbar';
import {
  useDeleteCliente,
  usePagesClientes
} from '../../src/hooks/useClientes';

export default function ClientesPage() {
  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-extrabold mb-4">Listagem de clientes</h1>
      <div className="flex justify-start items-start gap-4 mb-4">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/clientes/novo"
        >
          Novo cliente
        </Button>
      </div>
      <ClientesList
        pages={usePagesClientes}
        remove={useDeleteCliente}
        rowsPage={10}
      />
    </div>
  );
}

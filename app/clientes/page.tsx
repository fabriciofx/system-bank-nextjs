'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import ClientesList from '../../src/components/cliente/ClientesList';
import Navbar from '../../src/components/navbar/Navbar';
import {
  useDeleteCliente,
  usePagesClientes
} from '../../src/hooks/useClientes';
import styles from './clientes.module.css';

export default function ClientesPage() {
  return (
    <div>
      <Navbar />
      <h1>Listagem de clientes</h1>
      <div className={styles.buttons_clientes}>
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

'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { useDeleteConta } from '@/src/hooks/useConta';
import ContasList from '../../src/components/conta/ContasList';
import Navbar from '../../src/components/navbar/Navbar';
import { usePagesContasClientes } from '../../src/hooks/useContasClientes';
import styles from './contas.module.css';

export default function ContasPage() {
  return (
    <div>
      <Navbar />
      <h1>Listagem de contas</h1>
      <div className={styles.buttons_conta}>
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

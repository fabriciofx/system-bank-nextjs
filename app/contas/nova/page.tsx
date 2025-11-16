'use client';

import { useCreateConta, useUpdateConta } from '@/src/hooks/useConta';
import FormConta from '../../../src/components/conta/FormConta';
import Navbar from '../../../src/components/navbar/Navbar';
import {
  clienteById,
  pagesClientes
} from '../../../src/services/ClienteService';
import { contaById } from '../../../src/services/ContaService';
import styles from './nova.module.css';

export default function NovaContaPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.box_com_titulo}>
        <div className={styles.box_conta}>
          <h1>Nova conta</h1>
          <FormConta
            create={useCreateConta}
            update={useUpdateConta}
            findById={contaById}
            pages={pagesClientes}
            clienteById={clienteById}
            buttonText="Criar"
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import FormConta from '../../../src/components/conta/FormConta';
import Navbar from '../../../src/components/navbar/Navbar';
import {
  clienteById,
  pagesClientes
} from '../../../src/services/ClienteService';
import {
  contaById,
  createConta,
  updateConta
} from '../../../src/services/ContaService';
import styles from './edit.module.css';

export default function EditContaPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.box_com_titulo}>
        <div className={styles.box_conta}>
          <h1>Alterando dados da conta</h1>
          <FormConta
            create={createConta}
            update={updateConta}
            findById={contaById}
            pages={pagesClientes}
            clienteById={clienteById}
            buttonText="Atualizar"
          />
        </div>
      </div>
    </div>
  );
}

import { useCreateCliente, useUpdateCliente } from '@/src/hooks/useClientes';
import ClienteForm from '../../../src/components/cliente/ClienteForm';
import Navbar from '../../../src/components/navbar/Navbar';
import { clienteById } from '../../../src/services/ClienteService';
import styles from './novo.module.css';

export default function NovoClientePage() {
  return (
    <div>
      <Navbar />
      <div className={styles.box_com_titulo}>
        <div className={styles.box_cliente}>
          <h1>Novo cliente</h1>
          <ClienteForm
            create={useCreateCliente}
            update={useUpdateCliente}
            findById={clienteById}
            buttonText="Cadastrar"
          />
        </div>
      </div>
    </div>
  );
}

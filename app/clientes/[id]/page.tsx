import FormCliente from '../../../src/components/cliente/FormCliente';
import Navbar from '../../../src/components/navbar/Navbar';
import {
  clienteById,
  createCliente,
  updateCliente
} from '../../../src/services/ClienteService';
import styles from './edit.module.css';

export default function EditClientePage() {
  return (
    <div>
      <Navbar />
      <div className={styles.box_com_titulo}>
        <div className={styles.box_cliente}>
          <h1>Alterando dados do cliente</h1>
          <FormCliente
            create={createCliente}
            update={updateCliente}
            findById={clienteById}
            buttonText="Atualizar"
          />
        </div>
      </div>
    </div>
  );
}

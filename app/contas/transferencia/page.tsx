'use client';

import { useTransferencia } from '@/src/hooks/useTransferencia';
import FormTransferencia from '../../../src/components/conta/FormTransferencia';
import Navbar from '../../../src/components/navbar/Navbar';
import styles from './transferencia.module.css';

export default function TransferenciaPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.box_com_titulo}>
        <div className={styles.box_conta}>
          <h1>Transferência</h1>
          <FormTransferencia transfere={useTransferencia} />
        </div>
      </div>
    </div>
  );
}

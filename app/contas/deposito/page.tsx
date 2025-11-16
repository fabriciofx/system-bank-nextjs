'use client';

import FormDeposito from '../../../src/components/conta/FormDeposito';
import Navbar from '../../../src/components/navbar/Navbar';
import styles from './deposito.module.css';

export default function DepositoPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.box_com_titulo}>
        <div className={styles.box_conta}>
          <h1>Depósito</h1>
          <FormDeposito />
        </div>
      </div>
    </div>
  );
}

'use client';

import FormSaque from '../../../src/components/conta/FormSaque';
import Navbar from '../../../src/components/navbar/Navbar';
import styles from './saque.module.css';

export default function SaquePage() {
  return (
    <div>
      <Navbar />
      <div className={styles.box_com_titulo}>
        <div className={styles.box_conta}>
          <h1>Saque</h1>
          <FormSaque />
        </div>
      </div>
    </div>
  );
}

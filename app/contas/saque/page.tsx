'use client';

import { useSaque } from '@/src/hooks/useSaque';
import SaqueForm from '../../../src/components/conta/SaqueForm';
import Navbar from '../../../src/components/navbar/Navbar';
import styles from './saque.module.css';

export default function SaquePage() {
  return (
    <div>
      <Navbar />
      <div className={styles.box_com_titulo}>
        <div className={styles.box_conta}>
          <h1>Saque</h1>
          <SaqueForm saca={useSaque} />
        </div>
      </div>
    </div>
  );
}

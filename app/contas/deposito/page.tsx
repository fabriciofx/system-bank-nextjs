'use client';

import { useDeposito } from '@/src/hooks/useDeposito';
import DepositoForm from '../../../src/components/conta/DepositoForm';
import Navbar from '../../../src/components/navbar/Navbar';

export default function DepositoPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start items-center">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-4xl font-extrabold mb-4">Depósito</h1>
          <DepositoForm deposita={useDeposito} />
        </div>
      </div>
    </div>
  );
}

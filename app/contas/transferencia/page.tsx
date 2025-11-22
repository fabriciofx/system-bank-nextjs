'use client';

import { useTransferencia } from '@/src/hooks/useTransferencia';
import TransferenciaForm from '../../../src/components/conta/TransferenciaForm';
import Navbar from '../../../src/components/navbar/Navbar';

export default function TransferenciaPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start items-center">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-4xl font-extrabold mb-4">Transferência</h1>
          <TransferenciaForm transfere={useTransferencia} />
        </div>
      </div>
    </div>
  );
}

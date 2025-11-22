'use client';

import { useSaque } from '@/src/hooks/useSaque';
import SaqueForm from '../../../src/components/conta/SaqueForm';
import Navbar from '../../../src/components/navbar/Navbar';

export default function SaquePage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start items-center">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-4xl font-extrabold mb-4">Saque</h1>
          <SaqueForm saca={useSaque} />
        </div>
      </div>
    </div>
  );
}

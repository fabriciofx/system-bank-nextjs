'use client';

import { useCreateConta, useUpdateConta } from '@/src/hooks/useConta';
import FormConta from '../../../src/components/conta/ContaForm';
import Navbar from '../../../src/components/navbar/Navbar';
import {
  clienteById,
  pagesClientes
} from '../../../src/services/ClienteService';
import { contaById } from '../../../src/services/ContaService';

export default function EditContaPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start items-center">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-4xl font-extrabold mb-4">
            Alterando dados da conta
          </h1>
          <FormConta
            create={useCreateConta}
            update={useUpdateConta}
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

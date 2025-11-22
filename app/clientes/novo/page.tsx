import { useCreateCliente, useUpdateCliente } from '@/src/hooks/useClientes';
import ClienteForm from '../../../src/components/cliente/ClienteForm';
import Navbar from '../../../src/components/navbar/Navbar';
import { clienteById } from '../../../src/services/ClienteService';

export default function NovoClientePage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start items-center">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-4xl font-extrabold mb-4">Novo cliente</h1>
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

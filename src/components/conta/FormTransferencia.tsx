'use client';

import { Button, TextField } from '@mui/material';
import type { UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Transferencia } from '@/src/models/Transferencia';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import { pagesClientes } from '../../services/ClienteService';
import { listContas } from '../../services/ContaService';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import styles from './FormConta.module.css';

type FormTransferenciaProps = {
  transfere: (options: {
    onSuccess: () => void;
    onError: (error: Error) => void;
  }) => UseMutationResult<void, Error, Transferencia, unknown>;
};

export default function FormTransferencia({
  transfere
}: FormTransferenciaProps) {
  const router = useRouter();
  const [cliente, setCliente] = useState<string>('');
  const [origem, setOrigem] = useState<string>('0');
  const [destino, setDestino] = useState<string>('0');
  const [valor, setValor] = useState<string>('0');
  const transf = transfere({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Transferência realizada com sucesso!'
      ).show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops...',
        `Erro ao transferir entre contas: ${error.message}`
      ).show()
  });

  function handleValor(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setValor(event.target.value);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const transferencia: Transferencia = {
      conta_origem: Number(origem),
      conta_destino: Number(destino),
      valor: Number(valor)
    };
    transf.mutate(transferencia);
    router.push('/contas');
  }

  async function clientes(page: number): Promise<Option[]> {
    try {
      const result = await pagesClientes(page, 5);
      const opts = result.items.map((client) => ({
        label: `${client.nome} (${client.cpf})`,
        value: String(client.id)
      }));
      return opts;
    } catch {
      return [];
    }
  }

  async function contas(): Promise<Option[]> {
    const contas = await listContas();
    const opts = contas
      .filter((conta) => conta.cliente === Number(cliente))
      .map((conta) => ({
        label: `${conta.numero} (${conta.agencia})`,
        value: String(conta.id)
      }));
    return opts;
  }

  return (
    <div>
      <form className={styles.form_conta} onSubmit={handleSubmit}>
        <InfiniteSelect
          label="Cliente"
          required
          value={cliente}
          options={clientes}
          onChange={(val) => setCliente(val)}
        />
        <InfiniteSelect
          label="Origem"
          required
          value={origem}
          options={contas}
          onChange={(val) => setOrigem(val)}
          key={`origem-${cliente}`}
        />
        <InfiniteSelect
          label="Destino"
          required
          options={contas}
          value={destino}
          onChange={(val) => setDestino(val)}
          key={`destino-${cliente}`}
        />
        <TextField
          label="Valor"
          name="valor"
          variant="filled"
          required
          onChange={handleValor}
        />
        <Button type="submit" variant="contained">
          Transferir
        </Button>
      </form>
    </div>
  );
}

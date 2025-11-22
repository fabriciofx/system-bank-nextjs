'use client';

import { Button, TextField } from '@mui/material';
import type { UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Saque } from '../../models/Saque';
import { pagesClientes } from '../../services/ClienteService';
import { listContas } from '../../services/ContaService';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import { ErrorMessage, SuccessMessage } from '../message/Message';

type SaqueFormProps = {
  saca: (options: {
    onSuccess: () => void;
    onError: (error: Error) => void;
  }) => UseMutationResult<void, Error, Saque, unknown>;
};

export default function SaqueForm({ saca }: SaqueFormProps) {
  const router = useRouter();
  const [cliente, setCliente] = useState<string>('0');
  const [conta, setConta] = useState<string>('0');
  const [valor, setValor] = useState<string>('0');
  const sacar = saca({
    onSuccess: async () =>
      await new SuccessMessage(
        'Sucesso!',
        'Saque realizado com sucesso!'
      ).show(),
    onError: async (error: Error) =>
      await new ErrorMessage(
        'Oops...',
        `Erro ao sacar da conta: ${error.message}`
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
    const saque: Saque = {
      conta: Number(conta),
      valor: Number(valor)
    };
    sacar.mutate(saque);
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
      <form className="flex flex-col gap-4 w-[600px]" onSubmit={handleSubmit}>
        <InfiniteSelect
          label="Cliente"
          required
          value={cliente}
          options={clientes}
          onChange={(val) => setCliente(val)}
        />
        <InfiniteSelect
          label="Conta"
          required
          value={conta}
          options={contas}
          onChange={(val) => setConta(val)}
          key={cliente}
        />
        <TextField
          label="Valor"
          name="valor"
          variant="filled"
          required
          onChange={handleValor}
        />
        <Button type="submit" variant="contained">
          Sacar
        </Button>
      </form>
    </div>
  );
}

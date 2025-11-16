'use client';

import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import type { Deposito } from '../../models/Deposito';
import { pagesClientes } from '../../services/ClienteService';
import { depositoConta, listContas } from '../../services/ContaService';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import styles from './FormConta.module.css';

export default function FormDeposito() {
  const router = useRouter();
  const [cliente, setCliente] = useState<string>('');
  const [conta, setConta] = useState<string>('0');
  const [valor, setValor] = useState<string>('0');

  function handleValor(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setValor(event.target.value);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      const deposito: Deposito = {
        conta: Number(conta),
        valor: Number(valor)
      };
      await depositoConta(deposito);
      await new SuccessMessage(
        'Sucesso!',
        'Depósito realizado com sucesso!'
      ).show();
      router.push('/contas');
    } catch (error) {
      await new ErrorMessage(
        'Oops...',
        `Erro ao depositar na conta: ${error}`
      ).show();
    }
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
          Depositar
        </Button>
      </form>
    </div>
  );
}

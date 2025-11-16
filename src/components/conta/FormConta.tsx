'use client';

import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ErrorMessage, SuccessMessage } from '../../components/message/Message';
import type { PageResult } from '../../core/PageResult';
import { CLIENTE_INVALIDO, type Cliente } from '../../models/Cliente';
import { CONTA_INVALIDA, type Conta } from '../../models/Conta';
import InfiniteSelect, { type Option } from '../infinite-select/InfiniteSelect';
import styles from './FormConta.module.css';

type FormContaProps = {
  create: (conta: Conta) => Promise<Conta>;
  update: (id: number, contaAtualizada: Conta) => Promise<Conta>;
  findById: (id: number) => Promise<Conta>;
  pages: (num: number, size: number) => Promise<PageResult<Cliente>>;
  clienteById: (id: number) => Promise<Cliente[]>;
  buttonText: string;
};

export default function FormConta({
  create,
  update,
  findById,
  pages,
  clienteById,
  buttonText
}: FormContaProps) {
  const router = useRouter();
  const { id } = useParams();
  const [conta, setConta] = useState<Conta>(CONTA_INVALIDA);
  const [cliente, setCliente] = useState<Cliente>(CLIENTE_INVALIDO);

  useEffect(() => {
    if (id) {
      (async () => {
        const contaEdit = await findById(Number(id));
        const result = await clienteById(contaEdit.cliente);
        setConta(contaEdit);
        setCliente(result[0]);
      })();
    }
  }, [findById, clienteById, id]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setConta({ ...conta, [name]: value });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      if (conta.id) {
        await update(conta.id, conta);
        await new SuccessMessage(
          'Sucesso!',
          'Conta atualizada com sucesso!'
        ).show();
      } else {
        const novaConta = await create(conta);
        if (novaConta.id === 0) {
          throw new Error('o identificador da conta não retornou');
        }
        await new SuccessMessage(
          'Sucesso!',
          'Conta cadastrada com sucesso!'
        ).show();
      }
      router.push('/contas');
    } catch (error) {
      await new ErrorMessage(
        'Oops...',
        `Erro ao cadastrar/atualizar a conta: ${error}`
      ).show();
    }
  }

  async function clientes(page: number): Promise<Option[]> {
    try {
      const result = await pages(page, 5);
      const opts = result.items.map((client) => ({
        label: `${client.nome} (${client.cpf})`,
        value: String(client.id)
      }));
      return opts;
    } catch {
      return [];
    }
  }

  return (
    <div>
      <form className={styles.form_conta} onSubmit={handleSubmit}>
        {cliente.id ? (
          <Select
            id="select"
            variant="filled"
            label="Cliente"
            required
            value={cliente.id}
            onChange={(val) => setConta({ ...conta, cliente: Number(val) })}
          >
            <MenuItem
              value={cliente.id}
            >{`${cliente.nome} (${cliente.cpf})`}</MenuItem>
          </Select>
        ) : (
          <InfiniteSelect
            label="Cliente"
            required
            options={clientes}
            value={conta.cliente ? String(conta.cliente) : ''}
            onChange={(val) => setConta({ ...conta, cliente: Number(val) })}
          />
        )}
        <TextField
          label="Número"
          name="numero"
          required
          value={conta.numero}
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          label="Agência"
          name="agencia"
          required
          value={conta.agencia}
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          label="Saldo"
          name="saldo"
          required
          value={conta.saldo}
          onChange={handleChange}
          variant="filled"
        />
        <Button type="submit" variant="contained">
          {buttonText}
        </Button>
      </form>
    </div>
  );
}

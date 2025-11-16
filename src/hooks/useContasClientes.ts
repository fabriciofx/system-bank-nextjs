import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Id } from '../models/Id';
import { pagesContasClientes } from '../services/ContaClienteService';
import { deleteConta } from '../services/ContaService';

export function usePagesContasClientes(num: number, size: number) {
  return useQuery({
    queryKey: ['pagesContasClientes', num, size],
    queryFn: async () => await pagesContasClientes(num, size),
    enabled: !!num && !!size,
    staleTime: Infinity
  });
}

export function useDeleteConta(options: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: Id) => await deleteConta(id.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['pagesContasClientes']
      });
      options.onSuccess();
    },
    onError: (error: Error) => {
      options.onError(error);
    }
  });
}

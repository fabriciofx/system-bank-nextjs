import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Id } from '../models/Id';
import { deleteConta } from '../services/ContaService';

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

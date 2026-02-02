import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { StorageService } from '@/shared/lib/storage';
import type { Guest, CreateGuestInput, UpdateGuestInput } from '../types';

const GUESTS_STORAGE_KEY = 'hotel_guests';
const GUESTS_QUERY_KEY = ['guests'];

const guestsStorage = new StorageService<Guest>(GUESTS_STORAGE_KEY);

/**
 * Hook para buscar todos os hóspedes.
 *
 * @returns Query result com array de hóspedes
 *
 * @example
 * ```typescript
 * const { data: guests, isLoading } = useGuests();
 * ```
 */
export function useGuests(): UseQueryResult<Guest[]> {
  return useQuery({
    queryKey: GUESTS_QUERY_KEY,
    queryFn: () => guestsStorage.getAll(),
  });
}

/**
 * Hook para buscar um hóspede específico pelo ID.
 *
 * @param id - ID do hóspede
 * @returns Query result com o hóspede ou undefined
 *
 * @example
 * ```typescript
 * const { data: guest } = useGuest('abc123');
 * ```
 */
export function useGuest(id: string): UseQueryResult<Guest | undefined> {
  return useQuery({
    queryKey: [...GUESTS_QUERY_KEY, id],
    queryFn: () => guestsStorage.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para criar um novo hóspede.
 *
 * @returns Mutation para criar hóspede
 *
 * @example
 * ```typescript
 * const createGuest = useCreateGuest();
 * createGuest.mutate({ firstName: 'João', ... });
 * ```
 */
export function useCreateGuest(): UseMutationResult<Guest, Error, CreateGuestInput> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGuestInput) => {
      // Remove formatação do CPF antes de salvar
      const cleanData = {
        ...data,
        cpf: data.cpf.replace(/\D/g, ''),
      };
      const guest = guestsStorage.create(cleanData);
      return Promise.resolve(guest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUESTS_QUERY_KEY });
    },
  });
}

interface UpdateGuestParams {
  id: string;
  data: UpdateGuestInput;
}

/**
 * Hook para atualizar um hóspede existente.
 *
 * @returns Mutation para atualizar hóspede
 *
 * @example
 * ```typescript
 * const updateGuest = useUpdateGuest();
 * updateGuest.mutate({ id: 'abc123', data: { email: 'novo@email.com' } });
 * ```
 */
export function useUpdateGuest(): UseMutationResult<Guest, Error, UpdateGuestParams> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateGuestParams) => {
      // Remove formatação do CPF se estiver sendo atualizado
      const cleanData = data.cpf
        ? { ...data, cpf: data.cpf.replace(/\D/g, '') }
        : data;
      const guest = guestsStorage.update(id, cleanData);
      return Promise.resolve(guest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUESTS_QUERY_KEY });
    },
  });
}

/**
 * Hook para deletar um hóspede.
 *
 * @returns Mutation para deletar hóspede
 *
 * @example
 * ```typescript
 * const deleteGuest = useDeleteGuest();
 * deleteGuest.mutate('abc123');
 * ```
 */
export function useDeleteGuest(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      guestsStorage.delete(id);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GUESTS_QUERY_KEY });
    },
  });
}

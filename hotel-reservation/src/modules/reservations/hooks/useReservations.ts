import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { StorageService } from '@/shared/lib/storage';
import type {
  Reservation,
  CreateReservationInput,
  UpdateReservationInput,
} from '../types';

const RESERVATIONS_STORAGE_KEY = 'hotel_reservations';
const RESERVATIONS_QUERY_KEY = ['reservations'];

const reservationsStorage = new StorageService<Reservation>(RESERVATIONS_STORAGE_KEY);

/**
 * Hook para buscar todas as reservas.
 *
 * @returns Query result com array de reservas
 *
 * @example
 * ```typescript
 * const { data: reservations, isLoading } = useReservations();
 * ```
 */
export function useReservations(): UseQueryResult<Reservation[]> {
  return useQuery({
    queryKey: RESERVATIONS_QUERY_KEY,
    queryFn: () => reservationsStorage.getAll(),
  });
}

/**
 * Hook para buscar uma reserva específica pelo ID.
 *
 * @param id - ID da reserva
 * @returns Query result com a reserva ou undefined
 *
 * @example
 * ```typescript
 * const { data: reservation } = useReservation('abc123');
 * ```
 */
export function useReservation(id: string): UseQueryResult<Reservation | undefined> {
  return useQuery({
    queryKey: [...RESERVATIONS_QUERY_KEY, id],
    queryFn: () => reservationsStorage.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para criar uma nova reserva.
 *
 * @returns Mutation para criar reserva
 *
 * @example
 * ```typescript
 * const createReservation = useCreateReservation();
 * createReservation.mutate({ roomId: '1', guestId: '1', ... });
 * ```
 */
export function useCreateReservation(): UseMutationResult<
  Reservation,
  Error,
  CreateReservationInput
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationInput) => {
      const reservation = reservationsStorage.create(data);
      return Promise.resolve(reservation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESERVATIONS_QUERY_KEY });
      // Também invalida quartos para atualizar disponibilidade
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}

interface UpdateReservationParams {
  id: string;
  data: UpdateReservationInput;
}

/**
 * Hook para atualizar uma reserva existente.
 *
 * @returns Mutation para atualizar reserva
 *
 * @example
 * ```typescript
 * const updateReservation = useUpdateReservation();
 * updateReservation.mutate({ id: 'abc123', data: { status: 'completed' } });
 * ```
 */
export function useUpdateReservation(): UseMutationResult<
  Reservation,
  Error,
  UpdateReservationParams
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateReservationParams) => {
      const reservation = reservationsStorage.update(id, data);
      return Promise.resolve(reservation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESERVATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}

/**
 * Hook para deletar uma reserva.
 *
 * @returns Mutation para deletar reserva
 *
 * @example
 * ```typescript
 * const deleteReservation = useDeleteReservation();
 * deleteReservation.mutate('abc123');
 * ```
 */
export function useDeleteReservation(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      reservationsStorage.delete(id);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESERVATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
}

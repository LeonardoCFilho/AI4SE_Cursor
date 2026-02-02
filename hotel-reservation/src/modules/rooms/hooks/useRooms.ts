import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { StorageService } from '@/shared/lib/storage';
import type { Room, CreateRoomInput, UpdateRoomInput } from '../types';

const ROOMS_STORAGE_KEY = 'hotel_rooms';
const ROOMS_QUERY_KEY = ['rooms'];

const roomsStorage = new StorageService<Room>(ROOMS_STORAGE_KEY);

/**
 * Hook para buscar todos os quartos.
 *
 * @returns Query result com array de quartos
 *
 * @example
 * ```typescript
 * const { data: rooms, isLoading } = useRooms();
 * ```
 */
export function useRooms(): UseQueryResult<Room[]> {
  return useQuery({
    queryKey: ROOMS_QUERY_KEY,
    queryFn: () => roomsStorage.getAll(),
  });
}

/**
 * Hook para buscar um quarto específico pelo ID.
 *
 * @param id - ID do quarto
 * @returns Query result com o quarto ou undefined
 *
 * @example
 * ```typescript
 * const { data: room } = useRoom('abc123');
 * ```
 */
export function useRoom(id: string): UseQueryResult<Room | undefined> {
  return useQuery({
    queryKey: [...ROOMS_QUERY_KEY, id],
    queryFn: () => roomsStorage.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook para criar um novo quarto.
 *
 * @returns Mutation para criar quarto
 *
 * @example
 * ```typescript
 * const createRoom = useCreateRoom();
 * createRoom.mutate({ number: '101', ... });
 * ```
 */
export function useCreateRoom(): UseMutationResult<Room, Error, CreateRoomInput> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoomInput) => {
      const room = roomsStorage.create(data);
      return Promise.resolve(room);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
  });
}

interface UpdateRoomParams {
  id: string;
  data: UpdateRoomInput;
}

/**
 * Hook para atualizar um quarto existente.
 *
 * @returns Mutation para atualizar quarto
 *
 * @example
 * ```typescript
 * const updateRoom = useUpdateRoom();
 * updateRoom.mutate({ id: 'abc123', data: { pricePerNight: 200 } });
 * ```
 */
export function useUpdateRoom(): UseMutationResult<Room, Error, UpdateRoomParams> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateRoomParams) => {
      const room = roomsStorage.update(id, data);
      return Promise.resolve(room);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
  });
}

/**
 * Hook para deletar um quarto.
 *
 * @returns Mutation para deletar quarto
 *
 * @example
 * ```typescript
 * const deleteRoom = useDeleteRoom();
 * deleteRoom.mutate('abc123');
 * ```
 */
export function useDeleteRoom(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      roomsStorage.delete(id);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
  });
}

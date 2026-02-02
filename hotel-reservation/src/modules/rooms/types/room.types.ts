/**
 * Tipos de quarto disponíveis no hotel.
 */
export type RoomType = 'basic' | 'modern' | 'luxury';

/**
 * Tipos de cama disponíveis.
 */
export type BedType = 'single' | 'king' | 'queen';

/**
 * Status de disponibilidade do quarto.
 */
export type RoomAvailability = 'occupied' | 'available' | 'maintenance' | 'cleaning';

/**
 * Representa um quarto do hotel.
 */
export interface Room {
  id: string;
  number: string;
  capacity: number;
  type: RoomType;
  pricePerNight: number;
  hasMinibar: boolean;
  hasBreakfast: boolean;
  hasAirConditioning: boolean;
  hasTV: boolean;
  beds: BedType[];
  availability: RoomAvailability;
}

/**
 * Dados para criação de um novo quarto (sem ID).
 */
export type CreateRoomInput = Omit<Room, 'id'>;

/**
 * Dados para atualização de um quarto.
 */
export type UpdateRoomInput = Partial<CreateRoomInput>;

/**
 * Labels para exibição dos tipos de quarto.
 */
export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  basic: 'Básico',
  modern: 'Moderno',
  luxury: 'Luxo',
};

/**
 * Labels para exibição dos tipos de cama.
 */
export const BED_TYPE_LABELS: Record<BedType, string> = {
  single: 'Solteiro',
  king: 'Casal King',
  queen: 'Casal Queen',
};

/**
 * Labels para exibição do status de disponibilidade.
 */
export const AVAILABILITY_LABELS: Record<RoomAvailability, string> = {
  occupied: 'Ocupado',
  available: 'Livre',
  maintenance: 'Manutenção',
  cleaning: 'Limpeza',
};

/**
 * Cores para os chips de disponibilidade.
 */
export const AVAILABILITY_COLORS: Record<
  RoomAvailability,
  'error' | 'success' | 'warning' | 'info'
> = {
  occupied: 'error',
  available: 'success',
  maintenance: 'warning',
  cleaning: 'info',
};

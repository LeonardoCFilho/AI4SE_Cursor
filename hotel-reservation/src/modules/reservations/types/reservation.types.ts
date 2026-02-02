/**
 * Status de uma reserva.
 */
export type ReservationStatus = 'active' | 'completed' | 'cancelled';

/**
 * Representa uma reserva do hotel.
 */
export interface Reservation {
  id: string;
  roomId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  status: ReservationStatus;
}

/**
 * Dados para criação de uma nova reserva (sem ID).
 */
export type CreateReservationInput = Omit<Reservation, 'id'>;

/**
 * Dados para atualização de uma reserva.
 */
export type UpdateReservationInput = Partial<CreateReservationInput>;

/**
 * Labels para exibição do status da reserva.
 */
export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  active: 'Ativa',
  completed: 'Concluída',
  cancelled: 'Cancelada',
};

/**
 * Cores para os chips de status da reserva.
 */
export const RESERVATION_STATUS_COLORS: Record<
  ReservationStatus,
  'success' | 'default' | 'error'
> = {
  active: 'success',
  completed: 'default',
  cancelled: 'error',
};

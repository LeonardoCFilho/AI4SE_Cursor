/**
 * Representa um hóspede do hotel.
 */
export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
}

/**
 * Dados para criação de um novo hóspede (sem ID).
 */
export type CreateGuestInput = Omit<Guest, 'id'>;

/**
 * Dados para atualização de um hóspede.
 */
export type UpdateGuestInput = Partial<CreateGuestInput>;

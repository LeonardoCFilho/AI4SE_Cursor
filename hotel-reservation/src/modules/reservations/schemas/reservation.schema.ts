import { z } from 'zod';

/**
 * Schema de validação para status da reserva.
 */
export const reservationStatusSchema = z.enum(['active', 'completed', 'cancelled'], {
  message: 'Selecione um status',
});

/**
 * Schema de validação para formulário de reserva.
 * Valida quarto, hóspede, datas e status.
 */
export const reservationFormSchema = z
  .object({
    roomId: z.string().min(1, 'Selecione um quarto'),
    guestId: z.string().min(1, 'Selecione um hóspede'),
    checkIn: z.string().min(1, 'Data de check-in é obrigatória'),
    checkOut: z.string().min(1, 'Data de check-out é obrigatória'),
    status: reservationStatusSchema,
  })
  .refine(
    (data) => {
      if (!data.checkIn || !data.checkOut) return true;
      return new Date(data.checkIn) < new Date(data.checkOut);
    },
    {
      message: 'Data de check-out deve ser posterior ao check-in',
      path: ['checkOut'],
    }
  );

/**
 * Tipo inferido do schema de formulário de reserva.
 */
export type ReservationFormData = z.infer<typeof reservationFormSchema>;

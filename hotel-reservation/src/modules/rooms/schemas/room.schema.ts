import { z } from 'zod';

/**
 * Schema de validação para tipo de quarto.
 */
export const roomTypeSchema = z.enum(['basic', 'modern', 'luxury'], {
  message: 'Selecione um tipo de quarto',
});

/**
 * Schema de validação para tipo de cama.
 */
export const bedTypeSchema = z.enum(['single', 'king', 'queen'], {
  message: 'Selecione um tipo de cama',
});

/**
 * Schema de validação para disponibilidade.
 */
export const availabilitySchema = z.enum(
  ['occupied', 'available', 'maintenance', 'cleaning'],
  {
    message: 'Selecione uma disponibilidade',
  }
);

const MIN_ROOM_NUMBER = 1;
const MAX_ROOM_CAPACITY = 10;
const MIN_PRICE = 0;

/**
 * Schema de validação para formulário de quarto.
 * Valida todos os campos obrigatórios com mensagens em português.
 */
export const roomFormSchema = z.object({
  number: z
    .string()
    .min(MIN_ROOM_NUMBER, 'Número do quarto é obrigatório')
    .regex(/^\d+$/, 'Número do quarto deve conter apenas dígitos'),
  capacity: z
    .number({ message: 'Capacidade deve ser um número' })
    .min(MIN_ROOM_NUMBER, 'Capacidade mínima é 1')
    .max(MAX_ROOM_CAPACITY, `Capacidade máxima é ${MAX_ROOM_CAPACITY}`),
  type: roomTypeSchema,
  pricePerNight: z
    .number({ message: 'Preço deve ser um número' })
    .min(MIN_PRICE, 'Preço não pode ser negativo'),
  hasMinibar: z.boolean(),
  hasBreakfast: z.boolean(),
  hasAirConditioning: z.boolean(),
  hasTV: z.boolean(),
  beds: z.array(bedTypeSchema).min(1, 'Selecione pelo menos uma cama'),
  availability: availabilitySchema,
});

/**
 * Tipo inferido do schema de formulário de quarto.
 */
export type RoomFormData = z.infer<typeof roomFormSchema>;

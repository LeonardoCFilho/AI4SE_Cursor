import { z } from 'zod';

const CPF_LENGTH = 11;
const MIN_NAME_LENGTH = 2;

/**
 * Valida se o CPF possui formato válido.
 * Verifica dígitos verificadores.
 *
 * @param cpf - CPF somente números
 * @returns true se válido
 */
function isValidCpf(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanCpf = cpf.replace(/\D/g, '');

  if (cleanCpf.length !== CPF_LENGTH) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanCpf)) return false;

  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(10))) return false;

  return true;
}

/**
 * Formata CPF para exibição (XXX.XXX.XXX-XX).
 *
 * @param cpf - CPF somente números
 * @returns CPF formatado
 */
export function formatCpf(cpf: string): string {
  const cleanCpf = cpf.replace(/\D/g, '');
  return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Schema de validação para formulário de hóspede.
 * Valida nome, sobrenome, CPF e email.
 */
export const guestFormSchema = z.object({
  firstName: z
    .string()
    .min(MIN_NAME_LENGTH, `Nome deve ter pelo menos ${MIN_NAME_LENGTH} caracteres`)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  lastName: z
    .string()
    .min(MIN_NAME_LENGTH, `Sobrenome deve ter pelo menos ${MIN_NAME_LENGTH} caracteres`)
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Sobrenome deve conter apenas letras'),
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .refine(
      (cpf) => isValidCpf(cpf),
      { message: 'CPF inválido' }
    ),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
});

/**
 * Tipo inferido do schema de formulário de hóspede.
 */
export type GuestFormData = z.infer<typeof guestFormSchema>;

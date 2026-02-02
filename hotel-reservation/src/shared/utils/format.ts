/**
 * Utilitários de formatação de dados.
 * Centraliza funções de formatação usadas em toda a aplicação.
 */

/** Tamanho do CPF sem formatação */
const CPF_LENGTH = 11;
/** Tamanho do CPF com formatação (XXX.XXX.XXX-XX) */
export const CPF_FORMATTED_LENGTH = 14;

/**
 * Formata CPF enquanto digita, aplicando máscara progressiva.
 *
 * @param value - Valor digitado (pode conter caracteres não numéricos)
 * @returns CPF com máscara parcial ou completa (XXX.XXX.XXX-XX)
 *
 * @example
 * ```typescript
 * maskCpf('123');       // '123'
 * maskCpf('12345678');  // '123.456.78'
 * maskCpf('12345678901'); // '123.456.789-01'
 * ```
 */
export function maskCpf(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const limited = cleaned.slice(0, CPF_LENGTH);

  if (limited.length <= 3) return limited;
  if (limited.length <= 6) return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  }
  return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
}

/**
 * Formata valor monetário em Real brasileiro (BRL).
 *
 * @param value - Valor numérico em reais
 * @returns String formatada com símbolo de moeda
 *
 * @example
 * ```typescript
 * formatCurrency(1234.56); // 'R$ 1.234,56'
 * formatCurrency(100);     // 'R$ 100,00'
 * ```
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata data para exibição no formato brasileiro.
 *
 * @param dateString - Data em formato ISO (YYYY-MM-DD)
 * @returns Data formatada (DD/MM/YYYY)
 *
 * @example
 * ```typescript
 * formatDate('2024-12-31'); // '31/12/2024'
 * ```
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

/**
 * Remove formatação do CPF, deixando apenas números.
 *
 * @param cpf - CPF com ou sem formatação
 * @returns Apenas os 11 dígitos do CPF
 *
 * @example
 * ```typescript
 * unmaskCpf('123.456.789-01'); // '12345678901'
 * unmaskCpf('12345678901');    // '12345678901'
 * ```
 */
export function unmaskCpf(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

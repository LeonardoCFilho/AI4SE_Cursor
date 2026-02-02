/**
 * Tipos comuns utilizados em todo o sistema.
 */

/**
 * Representa uma entidade base com ID único.
 */
export interface BaseEntity {
  id: string;
}

/**
 * Tipo genérico para resultado de operações assíncronas.
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Props base para componentes de formulário.
 */
export interface FormProps<T> {
  initialData?: T;
  onSubmit: (data: T) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

/**
 * Props base para componentes de listagem.
 */
export interface ListProps<T> {
  data: T[];
  isLoading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

import { useState, useCallback } from 'react';
import type { UseMutationResult } from '@tanstack/react-query';

/**
 * Estado e ações retornados pelo hook useEntityModule.
 *
 * @template T - Tipo da entidade
 * @template TFormData - Tipo dos dados do formulário
 */
interface EntityModuleState<T, TFormData> {
  /** Se o formulário está visível */
  showForm: boolean;
  /** Entidade selecionada para edição (null se criando nova) */
  selectedEntity: T | null;
  /** Se está submetendo o formulário */
  isSubmitting: boolean;
  /** Abre o formulário para criar nova entidade */
  handleNew: () => void;
  /** Abre o formulário para editar uma entidade */
  handleEdit: (entity: T) => void;
  /** Cancela a operação e fecha o formulário */
  handleCancel: () => void;
  /** Submete o formulário (cria ou atualiza) */
  handleSubmit: (data: TFormData) => void;
}

interface UseEntityModuleParams<T extends { id: string }, TFormData> {
  /** Mutation para criar entidade */
  createMutation: UseMutationResult<T, Error, TFormData>;
  /** Mutation para atualizar entidade */
  updateMutation: UseMutationResult<T, Error, { id: string; data: TFormData }>;
}

/**
 * Hook genérico para gerenciar estado de módulos CRUD.
 * Reduz duplicação de código entre GuestsModule, RoomsModule e ReservationsModule.
 *
 * @template T - Tipo da entidade (deve ter campo 'id')
 * @template TFormData - Tipo dos dados do formulário
 *
 * @param params - Mutations de criação e atualização
 * @returns Estado e handlers do módulo
 *
 * @example
 * ```typescript
 * const {
 *   showForm,
 *   selectedEntity: selectedGuest,
 *   isSubmitting,
 *   handleNew,
 *   handleEdit,
 *   handleCancel,
 *   handleSubmit,
 * } = useEntityModule<Guest, GuestFormData>({
 *   createMutation: useCreateGuest(),
 *   updateMutation: useUpdateGuest(),
 * });
 * ```
 */
export function useEntityModule<T extends { id: string }, TFormData>({
  createMutation,
  updateMutation,
}: UseEntityModuleParams<T, TFormData>): EntityModuleState<T, TFormData> {
  const [showForm, setShowForm] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<T | null>(null);

  const handleNew = useCallback((): void => {
    setSelectedEntity(null);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback((entity: T): void => {
    setSelectedEntity(entity);
    setShowForm(true);
  }, []);

  const handleCancel = useCallback((): void => {
    setSelectedEntity(null);
    setShowForm(false);
  }, []);

  const handleSubmit = useCallback(
    (data: TFormData): void => {
      if (selectedEntity) {
        updateMutation.mutate(
          { id: selectedEntity.id, data },
          {
            onSuccess: () => {
              setSelectedEntity(null);
              setShowForm(false);
            },
          }
        );
      } else {
        createMutation.mutate(data, {
          onSuccess: () => {
            setShowForm(false);
          },
        });
      }
    },
    [selectedEntity, createMutation, updateMutation]
  );

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return {
    showForm,
    selectedEntity,
    isSubmitting,
    handleNew,
    handleEdit,
    handleCancel,
    handleSubmit,
  };
}

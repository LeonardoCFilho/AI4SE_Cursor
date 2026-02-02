import { type ReactNode } from 'react';
import { Box, Button, Collapse } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { useEntityModule } from '@/shared/hooks';
import { useGuests, useCreateGuest, useUpdateGuest } from '../hooks';
import { GuestForm } from './GuestForm';
import { GuestList } from './GuestList';
import type { Guest } from '../types';
import type { GuestFormData } from '../schemas';

/**
 * Módulo principal de gestão de hóspedes.
 * Combina listagem e formulário de cadastro/edição.
 * Utiliza useEntityModule para gerenciar estado do formulário.
 *
 * @example
 * ```tsx
 * <GuestsModule />
 * ```
 */
export function GuestsModule(): ReactNode {
  const { data: guests = [], isLoading } = useGuests();
  const createGuest = useCreateGuest();
  const updateGuest = useUpdateGuest();

  const {
    showForm,
    selectedEntity: selectedGuest,
    isSubmitting,
    handleNew: handleNewGuest,
    handleEdit: handleEditGuest,
    handleCancel,
    handleSubmit,
  } = useEntityModule<Guest, GuestFormData>({
    createMutation: createGuest,
    updateMutation: updateGuest,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewGuest}
          disabled={showForm}
        >
          Novo Hóspede
        </Button>
      </Box>

      <Collapse in={showForm}>
        <GuestForm
          initialData={selectedGuest ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </Collapse>

      <GuestList guests={guests} isLoading={isLoading} onEdit={handleEditGuest} />
    </Box>
  );
}

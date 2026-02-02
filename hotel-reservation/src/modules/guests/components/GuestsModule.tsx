import { useState, type ReactNode } from 'react';
import { Box, Button, Collapse } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { useGuests, useCreateGuest, useUpdateGuest } from '../hooks';
import { GuestForm } from './GuestForm';
import { GuestList } from './GuestList';
import type { Guest } from '../types';
import type { GuestFormData } from '../schemas';

/**
 * Módulo principal de gestão de hóspedes.
 * Combina listagem e formulário de cadastro/edição.
 *
 * @example
 * ```tsx
 * <GuestsModule />
 * ```
 */
export function GuestsModule(): ReactNode {
  const [showForm, setShowForm] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const { data: guests = [], isLoading } = useGuests();
  const createGuest = useCreateGuest();
  const updateGuest = useUpdateGuest();

  const handleNewGuest = (): void => {
    setSelectedGuest(null);
    setShowForm(true);
  };

  const handleEditGuest = (guest: Guest): void => {
    setSelectedGuest(guest);
    setShowForm(true);
  };

  const handleCancel = (): void => {
    setSelectedGuest(null);
    setShowForm(false);
  };

  const handleSubmit = (data: GuestFormData): void => {
    if (selectedGuest) {
      updateGuest.mutate(
        { id: selectedGuest.id, data },
        {
          onSuccess: () => {
            setSelectedGuest(null);
            setShowForm(false);
          },
        }
      );
    } else {
      createGuest.mutate(data, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const isSubmitting = createGuest.isPending || updateGuest.isPending;

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

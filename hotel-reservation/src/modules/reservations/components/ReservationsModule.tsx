import { useState, type ReactNode } from 'react';
import { Box, Button, Collapse, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { useRooms } from '@/modules/rooms';
import { useGuests } from '@/modules/guests';
import {
  useReservations,
  useCreateReservation,
  useUpdateReservation,
} from '../hooks';
import { ReservationForm } from './ReservationForm';
import { ReservationList } from './ReservationList';
import type { Reservation } from '../types';
import type { ReservationFormData } from '../schemas';

/**
 * Módulo principal de gestão de reservas.
 * Combina listagem e formulário de cadastro/edição.
 *
 * @example
 * ```tsx
 * <ReservationsModule />
 * ```
 */
export function ReservationsModule(): ReactNode {
  const [showForm, setShowForm] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const { data: rooms = [] } = useRooms();
  const { data: guests = [] } = useGuests();
  const { data: reservations = [], isLoading } = useReservations();
  const createReservation = useCreateReservation();
  const updateReservation = useUpdateReservation();

  const hasAvailableRooms = rooms.some((room) => room.availability === 'available');
  const hasGuests = guests.length > 0;

  const handleNewReservation = (): void => {
    setSelectedReservation(null);
    setShowForm(true);
  };

  const handleEditReservation = (reservation: Reservation): void => {
    setSelectedReservation(reservation);
    setShowForm(true);
  };

  const handleCancel = (): void => {
    setSelectedReservation(null);
    setShowForm(false);
  };

  const handleSubmit = (data: ReservationFormData): void => {
    if (selectedReservation) {
      updateReservation.mutate(
        { id: selectedReservation.id, data },
        {
          onSuccess: () => {
            setSelectedReservation(null);
            setShowForm(false);
          },
        }
      );
    } else {
      createReservation.mutate(data, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const isSubmitting = createReservation.isPending || updateReservation.isPending;

  const canCreateReservation = hasAvailableRooms && hasGuests;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {!hasGuests && (
        <Alert severity="warning">
          Cadastre pelo menos um hóspede antes de criar uma reserva.
        </Alert>
      )}

      {hasGuests && !hasAvailableRooms && (
        <Alert severity="warning">
          Não há quartos disponíveis no momento.
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewReservation}
          disabled={showForm || !canCreateReservation}
        >
          Nova Reserva
        </Button>
      </Box>

      <Collapse in={showForm}>
        <ReservationForm
          initialData={selectedReservation ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </Collapse>

      <ReservationList
        reservations={reservations}
        isLoading={isLoading}
        onEdit={handleEditReservation}
      />
    </Box>
  );
}

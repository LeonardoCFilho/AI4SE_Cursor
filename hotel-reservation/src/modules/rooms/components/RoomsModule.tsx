import { useState, type ReactNode } from 'react';
import { Box, Button, Collapse } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { useRooms, useCreateRoom, useUpdateRoom } from '../hooks';
import { RoomForm } from './RoomForm';
import { RoomList } from './RoomList';
import type { Room, RoomAvailability } from '../types';
import type { RoomFormData } from '../schemas';

/**
 * Módulo principal de gestão de quartos.
 * Combina listagem e formulário de cadastro/edição.
 *
 * @example
 * ```tsx
 * <RoomsModule />
 * ```
 */
export function RoomsModule(): ReactNode {
  const [showForm, setShowForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const { data: rooms = [], isLoading } = useRooms();
  const createRoom = useCreateRoom();
  const updateRoom = useUpdateRoom();

  const handleNewRoom = (): void => {
    setSelectedRoom(null);
    setShowForm(true);
  };

  const handleEditRoom = (room: Room): void => {
    setSelectedRoom(room);
    setShowForm(true);
  };

  const handleCancel = (): void => {
    setSelectedRoom(null);
    setShowForm(false);
  };

  const handleAvailabilityChange = (roomId: string, availability: RoomAvailability): void => {
    updateRoom.mutate({
      id: roomId,
      data: { availability },
    });
  };

  const handleSubmit = (data: RoomFormData): void => {
    if (selectedRoom) {
      updateRoom.mutate(
        { id: selectedRoom.id, data },
        {
          onSuccess: () => {
            setSelectedRoom(null);
            setShowForm(false);
          },
        }
      );
    } else {
      createRoom.mutate(data, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const isSubmitting = createRoom.isPending || updateRoom.isPending;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewRoom}
          disabled={showForm}
        >
          Novo Quarto
        </Button>
      </Box>

      <Collapse in={showForm}>
        <RoomForm
          initialData={selectedRoom ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </Collapse>

      <RoomList
        rooms={rooms}
        isLoading={isLoading}
        onEdit={handleEditRoom}
        onAvailabilityChange={handleAvailabilityChange}
      />
    </Box>
  );
}

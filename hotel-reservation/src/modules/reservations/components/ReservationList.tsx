import { type ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import { DataTable, type Column } from '@/shared/components';
import { useRooms, ROOM_TYPE_LABELS, AVAILABILITY_LABELS, AVAILABILITY_COLORS, type RoomAvailability } from '@/modules/rooms';
import { useGuests } from '@/modules/guests';
import type { Reservation } from '../types';

interface ReservationListProps {
  reservations: Reservation[];
  isLoading?: boolean;
  onEdit: (reservation: Reservation) => void;
}

/**
 * Tipo estendido de reserva com dados desnormalizados.
 */
interface ReservationWithDetails extends Reservation {
  roomNumber: string;
  roomType: string;
  guestName: string;
  roomAvailability: RoomAvailability;
}

/**
 * Lista de reservas com tabela de dados.
 * Exibe número do quarto, tipo, nome do hóspede, disponibilidade e ações.
 *
 * @param props - Propriedades do componente
 * @param props.reservations - Array de reservas
 * @param props.isLoading - Se está carregando
 * @param props.onEdit - Callback ao clicar em editar
 *
 * @example
 * ```tsx
 * <ReservationList
 *   reservations={reservations}
 *   isLoading={isLoading}
 *   onEdit={(reservation) => setSelectedReservation(reservation)}
 * />
 * ```
 */
export function ReservationList({
  reservations,
  isLoading = false,
  onEdit,
}: ReservationListProps): ReactNode {
  const { data: rooms = [] } = useRooms();
  const { data: guests = [] } = useGuests();

  // Enriquece os dados da reserva com informações de quarto e hóspede
  const enrichedReservations: ReservationWithDetails[] = reservations.map(
    (reservation) => {
      const room = rooms.find((r) => r.id === reservation.roomId);
      const guest = guests.find((g) => g.id === reservation.guestId);

      return {
        ...reservation,
        roomNumber: room?.number ?? 'N/A',
        roomType: room ? ROOM_TYPE_LABELS[room.type] : 'N/A',
        guestName: guest ? `${guest.firstName} ${guest.lastName}` : 'N/A',
        roomAvailability: room?.availability ?? 'available',
      };
    }
  );

  const columns: Column<ReservationWithDetails>[] = [
    {
      id: 'roomNumber',
      label: 'Nº Quarto',
      minWidth: 100,
    },
    {
      id: 'roomType',
      label: 'Tipo',
      minWidth: 120,
    },
    {
      id: 'guestName',
      label: 'Hóspede',
      minWidth: 180,
    },
    {
      id: 'roomAvailability',
      label: 'Disponibilidade',
      minWidth: 140,
      render: (row) => (
        <Chip
          label={AVAILABILITY_LABELS[row.roomAvailability]}
          color={AVAILABILITY_COLORS[row.roomAvailability]}
          size="small"
        />
      ),
    },
    {
      id: 'actions',
      label: 'Ações',
      minWidth: 80,
      align: 'center',
      render: (row) => (
        <Tooltip title="Editar reserva">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEdit(row)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Reservas"
        sx={{ bgcolor: 'secondary.main', color: 'white' }}
      />
      <CardContent>
        <Box>
          <DataTable
            columns={columns}
            data={enrichedReservations}
            isLoading={isLoading}
            emptyMessage="Nenhuma reserva cadastrada"
            getRowKey={(reservation) => reservation.id}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

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
import type { Reservation } from '../types';

/**
 * Dados de quarto necessários para exibição na lista.
 */
interface RoomData {
  id: string;
  number: string;
  type: string;
  typeLabel: string;
  availability: string;
  availabilityLabel: string;
  availabilityColor: 'error' | 'success' | 'warning' | 'info';
}

/**
 * Dados de hóspede necessários para exibição na lista.
 */
interface GuestData {
  id: string;
  fullName: string;
}

interface ReservationListProps {
  reservations: Reservation[];
  isLoading?: boolean;
  onEdit: (reservation: Reservation) => void;
  /** Mapa de quartos por ID para lookup */
  roomsMap: Map<string, RoomData>;
  /** Mapa de hóspedes por ID para lookup */
  guestsMap: Map<string, GuestData>;
}

/**
 * Tipo estendido de reserva com dados desnormalizados.
 */
interface ReservationWithDetails extends Reservation {
  roomNumber: string;
  roomType: string;
  guestName: string;
  roomAvailability: string;
  roomAvailabilityLabel: string;
  roomAvailabilityColor: 'error' | 'success' | 'warning' | 'info';
}

/**
 * Lista de reservas com tabela de dados.
 * Exibe número do quarto, tipo, nome do hóspede, disponibilidade e ações.
 *
 * @param props - Propriedades do componente
 * @param props.reservations - Array de reservas
 * @param props.isLoading - Se está carregando
 * @param props.onEdit - Callback ao clicar em editar
 * @param props.roomsMap - Mapa de quartos por ID
 * @param props.guestsMap - Mapa de hóspedes por ID
 *
 * @example
 * ```tsx
 * <ReservationList
 *   reservations={reservations}
 *   isLoading={isLoading}
 *   onEdit={(reservation) => setSelectedReservation(reservation)}
 *   roomsMap={roomsMap}
 *   guestsMap={guestsMap}
 * />
 * ```
 */
export function ReservationList({
  reservations,
  isLoading = false,
  onEdit,
  roomsMap,
  guestsMap,
}: ReservationListProps): ReactNode {
  // Enriquece os dados da reserva com informações de quarto e hóspede
  const enrichedReservations: ReservationWithDetails[] = reservations.map(
    (reservation) => {
      const room = roomsMap.get(reservation.roomId);
      const guest = guestsMap.get(reservation.guestId);

      return {
        ...reservation,
        roomNumber: room?.number ?? 'N/A',
        roomType: room?.typeLabel ?? 'N/A',
        guestName: guest?.fullName ?? 'N/A',
        roomAvailability: room?.availability ?? 'available',
        roomAvailabilityLabel: room?.availabilityLabel ?? 'Livre',
        roomAvailabilityColor: room?.availabilityColor ?? 'success',
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
          label={row.roomAvailabilityLabel}
          color={row.roomAvailabilityColor}
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

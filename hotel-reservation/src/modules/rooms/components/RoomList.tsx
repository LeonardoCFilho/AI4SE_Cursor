import { type ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import { DataTable, type Column } from '@/shared/components';
import { formatCurrency } from '@/shared/utils';
import {
  type Room,
  type RoomAvailability,
  ROOM_TYPE_LABELS,
  AVAILABILITY_LABELS,
  AVAILABILITY_COLORS,
} from '../types';

interface RoomListProps {
  rooms: Room[];
  isLoading?: boolean;
  onEdit: (room: Room) => void;
  onAvailabilityChange?: (roomId: string, availability: RoomAvailability) => void;
}

/**
 * Lista de quartos com tabela de dados.
 * Exibe número, tipo, preço, disponibilidade e ações.
 *
 * @param props - Propriedades do componente
 * @param props.rooms - Array de quartos
 * @param props.isLoading - Se está carregando
 * @param props.onEdit - Callback ao clicar em editar
 * @param props.onAvailabilityChange - Callback ao alterar disponibilidade
 *
 * @example
 * ```tsx
 * <RoomList
 *   rooms={rooms}
 *   isLoading={isLoading}
 *   onEdit={(room) => setSelectedRoom(room)}
 *   onAvailabilityChange={(roomId, availability) => updateRoom(roomId, availability)}
 * />
 * ```
 */
export function RoomList({
  rooms,
  isLoading = false,
  onEdit,
  onAvailabilityChange,
}: RoomListProps): ReactNode {
  const handleAvailabilityChange = (
    room: Room,
    event: SelectChangeEvent<RoomAvailability>
  ): void => {
    onAvailabilityChange?.(room.id, event.target.value as RoomAvailability);
  };

  const columns: Column<Room>[] = [
    {
      id: 'number',
      label: 'Número',
      minWidth: 100,
    },
    {
      id: 'type',
      label: 'Tipo',
      minWidth: 120,
      render: (room) => ROOM_TYPE_LABELS[room.type],
    },
    {
      id: 'pricePerNight',
      label: 'Preço/Diária',
      minWidth: 130,
      align: 'right',
      render: (room) => formatCurrency(room.pricePerNight),
    },
    {
      id: 'availability',
      label: 'Disponibilidade',
      minWidth: 180,
      render: (room) => (
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id={`availability-label-${room.id}`}>Status</InputLabel>
          <Select
            labelId={`availability-label-${room.id}`}
            value={room.availability}
            label="Status"
            onChange={(e) => handleAvailabilityChange(room, e)}
            renderValue={(value) => (
              <Chip
                label={AVAILABILITY_LABELS[value]}
                color={AVAILABILITY_COLORS[value]}
                size="small"
              />
            )}
          >
            {Object.entries(AVAILABILITY_LABELS).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                <Chip
                  label={label}
                  color={AVAILABILITY_COLORS[value as RoomAvailability]}
                  size="small"
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      id: 'actions',
      label: 'Ações',
      minWidth: 80,
      align: 'center',
      render: (room) => (
        <Tooltip title="Editar quarto">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEdit(room)}
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
        title="Quartos"
        sx={{ bgcolor: 'secondary.main', color: 'white' }}
      />
      <CardContent>
        <Box>
          <DataTable
            columns={columns}
            data={rooms}
            isLoading={isLoading}
            emptyMessage="Nenhum quarto cadastrado"
            getRowKey={(room) => room.id}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

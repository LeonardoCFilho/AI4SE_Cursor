import { type ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import { DataTable, type Column } from '@/shared/components';
import type { Guest } from '../types';
import { formatCpf } from '../schemas';

interface GuestListProps {
  guests: Guest[];
  isLoading?: boolean;
  onEdit: (guest: Guest) => void;
}

/**
 * Lista de hóspedes com tabela de dados.
 * Exibe nome, sobrenome, CPF e ações.
 * O e-mail não é exibido na lista conforme requisito.
 *
 * @param props - Propriedades do componente
 * @param props.guests - Array de hóspedes
 * @param props.isLoading - Se está carregando
 * @param props.onEdit - Callback ao clicar em editar
 *
 * @example
 * ```tsx
 * <GuestList
 *   guests={guests}
 *   isLoading={isLoading}
 *   onEdit={(guest) => setSelectedGuest(guest)}
 * />
 * ```
 */
export function GuestList({
  guests,
  isLoading = false,
  onEdit,
}: GuestListProps): ReactNode {
  const columns: Column<Guest>[] = [
    {
      id: 'firstName',
      label: 'Nome',
      minWidth: 150,
    },
    {
      id: 'lastName',
      label: 'Sobrenome',
      minWidth: 150,
    },
    {
      id: 'cpf',
      label: 'CPF',
      minWidth: 150,
      render: (guest) => formatCpf(guest.cpf),
    },
    {
      id: 'actions',
      label: 'Ações',
      minWidth: 80,
      align: 'center',
      render: (guest) => (
        <Tooltip title="Editar hóspede">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEdit(guest)}
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
        title="Hóspedes"
        sx={{ bgcolor: 'secondary.main', color: 'white' }}
      />
      <CardContent>
        <Box>
          <DataTable
            columns={columns}
            data={guests}
            isLoading={isLoading}
            emptyMessage="Nenhum hóspede cadastrado"
            getRowKey={(guest) => guest.id}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

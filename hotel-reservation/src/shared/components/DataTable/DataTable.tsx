import type { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  getRowKey: (row: T) => string;
}

/**
 * Tabela de dados genérica e reutilizável.
 * Suporta colunas customizadas com render functions.
 *
 * @template T - Tipo dos dados da tabela
 * @param props - Propriedades do componente
 * @param props.columns - Configuração das colunas
 * @param props.data - Array de dados
 * @param props.isLoading - Se está carregando
 * @param props.emptyMessage - Mensagem quando não há dados
 * @param props.getRowKey - Função para obter chave única de cada linha
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { id: 'name', label: 'Nome' },
 *     { id: 'actions', label: 'Ações', render: (row) => <Button /> },
 *   ]}
 *   data={users}
 *   getRowKey={(row) => row.id}
 * />
 * ```
 */
export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'Nenhum registro encontrado',
  getRowKey,
}: DataTableProps<T>): ReactNode {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.100' }}>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                align={column.align ?? 'left'}
                sx={{ minWidth: column.minWidth, fontWeight: 600 }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={getRowKey(row)} hover>
              {columns.map((column) => (
                <TableCell key={String(column.id)} align={column.align ?? 'left'}>
                  {column.render
                    ? column.render(row)
                    : String(row[column.id as keyof T] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

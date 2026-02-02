import { type ReactNode, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';

import { useRooms } from '@/modules/rooms';
import { useGuests } from '@/modules/guests';
import { reservationFormSchema, type ReservationFormData } from '../schemas';
import {
  type Reservation,
  type ReservationStatus,
  RESERVATION_STATUS_LABELS,
} from '../types';

interface ReservationFormProps {
  initialData?: Reservation;
  onSubmit: (data: ReservationFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const STATUS_OPTIONS: ReservationStatus[] = ['active', 'completed', 'cancelled'];

/**
 * Formulário de cadastro/edição de reserva.
 * Utiliza React Hook Form com validação Zod.
 *
 * @param props - Propriedades do componente
 * @param props.initialData - Dados iniciais para edição
 * @param props.onSubmit - Callback ao submeter formulário válido
 * @param props.onCancel - Callback ao cancelar
 * @param props.isLoading - Se está processando
 *
 * @example
 * ```tsx
 * <ReservationForm
 *   onSubmit={(data) => createReservation.mutate(data)}
 *   onCancel={() => setShowForm(false)}
 * />
 * ```
 */
export function ReservationForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: ReservationFormProps): ReactNode {
  const { data: rooms = [] } = useRooms();
  const { data: guests = [] } = useGuests();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      roomId: '',
      guestId: '',
      checkIn: '',
      checkOut: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        roomId: initialData.roomId,
        guestId: initialData.guestId,
        checkIn: initialData.checkIn,
        checkOut: initialData.checkOut,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: ReservationFormData): void => {
    onSubmit(data);
  };

  // Filtra quartos disponíveis (exceto se estiver editando)
  const availableRooms = initialData
    ? rooms
    : rooms.filter((room) => room.availability === 'available');

  return (
    <Card>
      <CardHeader
        title={initialData ? 'Editar Reserva' : 'Nova Reserva'}
        sx={{ bgcolor: 'primary.main', color: 'white' }}
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="roomId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.roomId}>
                    <InputLabel>Quarto</InputLabel>
                    <Select {...field} label="Quarto" disabled={isLoading}>
                      {availableRooms.map((room) => (
                        <MenuItem key={room.id} value={room.id}>
                          Quarto {room.number} - R$ {room.pricePerNight}/noite
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.roomId && (
                      <FormHelperText>{errors.roomId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="guestId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.guestId}>
                    <InputLabel>Hóspede</InputLabel>
                    <Select {...field} label="Hóspede" disabled={isLoading}>
                      {guests.map((guest) => (
                        <MenuItem key={guest.id} value={guest.id}>
                          {guest.firstName} {guest.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.guestId && (
                      <FormHelperText>{errors.guestId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="checkIn"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Check-in"
                    fullWidth
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                    error={!!errors.checkIn}
                    helperText={errors.checkIn?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="checkOut"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Check-out"
                    fullWidth
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                    error={!!errors.checkOut}
                    helperText={errors.checkOut?.message}
                    disabled={isLoading}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status" disabled={isLoading}>
                      {STATUS_OPTIONS.map((status) => (
                        <MenuItem key={status} value={status}>
                          {RESERVATION_STATUS_LABELS[status]}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.status && (
                      <FormHelperText>{errors.status.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Botões */}
            <Grid size={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {onCancel && (
                  <Button onClick={onCancel} disabled={isLoading}>
                    Cancelar
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {initialData ? 'Salvar' : 'Cadastrar'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

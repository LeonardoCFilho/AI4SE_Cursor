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
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Chip,
  OutlinedInput,
  FormGroup,
  Typography,
  Divider,
} from '@mui/material';

import { roomFormSchema, type RoomFormData } from '../schemas';
import {
  type Room,
  type RoomType,
  type BedType,
  ROOM_TYPE_LABELS,
  BED_TYPE_LABELS,
  AVAILABILITY_LABELS,
} from '../types';

interface RoomFormProps {
  initialData?: Room;
  onSubmit: (data: RoomFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const ROOM_TYPES: RoomType[] = ['basic', 'modern', 'luxury'];
const BED_TYPES: BedType[] = ['single', 'king', 'queen'];

/**
 * Formulário de cadastro/edição de quarto.
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
 * <RoomForm
 *   onSubmit={(data) => createRoom.mutate(data)}
 *   onCancel={() => setShowForm(false)}
 * />
 * ```
 */
export function RoomForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: RoomFormProps): ReactNode {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      number: '',
      capacity: 1,
      type: 'basic',
      pricePerNight: 0,
      hasMinibar: false,
      hasBreakfast: false,
      hasAirConditioning: false,
      hasTV: false,
      beds: [],
      availability: 'available',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        number: initialData.number,
        capacity: initialData.capacity,
        type: initialData.type,
        pricePerNight: initialData.pricePerNight,
        hasMinibar: initialData.hasMinibar,
        hasBreakfast: initialData.hasBreakfast,
        hasAirConditioning: initialData.hasAirConditioning,
        hasTV: initialData.hasTV,
        beds: initialData.beds,
        availability: initialData.availability,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: RoomFormData): void => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader
        title={initialData ? 'Editar Quarto' : 'Novo Quarto'}
        sx={{ bgcolor: 'primary.main', color: 'white' }}
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={3}>
            {/* Informações Básicas */}
            <Grid size={12}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Informações Básicas
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                {...register('number')}
                label="Número do Quarto"
                fullWidth
                error={!!errors.number}
                helperText={errors.number?.message}
                disabled={isLoading}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Capacidade"
                    fullWidth
                    error={!!errors.capacity}
                    helperText={errors.capacity?.message}
                    disabled={isLoading}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Tipo do Quarto</InputLabel>
                    <Select {...field} label="Tipo do Quarto" disabled={isLoading}>
                      {ROOM_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {ROOM_TYPE_LABELS[type]}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.type && (
                      <FormHelperText>{errors.type.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name="pricePerNight"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Preço por Diária (R$)"
                    fullWidth
                    error={!!errors.pricePerNight}
                    helperText={errors.pricePerNight?.message}
                    disabled={isLoading}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Grid>

            {/* Disponibilidade */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="availability"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.availability}>
                    <InputLabel>Disponibilidade</InputLabel>
                    <Select {...field} label="Disponibilidade" disabled={isLoading}>
                      {Object.entries(AVAILABILITY_LABELS).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.availability && (
                      <FormHelperText>{errors.availability.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Comodidades */}
            <Grid size={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Comodidades
              </Typography>
            </Grid>

            <Grid size={12}>
              <FormGroup row>
                <Controller
                  name="hasMinibar"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          disabled={isLoading}
                        />
                      }
                      label="Frigobar"
                    />
                  )}
                />
                <Controller
                  name="hasBreakfast"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          disabled={isLoading}
                        />
                      }
                      label="Café da Manhã Incluso"
                    />
                  )}
                />
                <Controller
                  name="hasAirConditioning"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          disabled={isLoading}
                        />
                      }
                      label="Ar-condicionado"
                    />
                  )}
                />
                <Controller
                  name="hasTV"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          disabled={isLoading}
                        />
                      }
                      label="TV"
                    />
                  )}
                />
              </FormGroup>
            </Grid>

            {/* Camas */}
            <Grid size={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Camas
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="beds"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.beds}>
                    <InputLabel>Tipos de Cama</InputLabel>
                    <Select
                      {...field}
                      multiple
                      input={<OutlinedInput label="Tipos de Cama" />}
                      disabled={isLoading}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={BED_TYPE_LABELS[value]}
                              size="small"
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {BED_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {BED_TYPE_LABELS[type]}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.beds && (
                      <FormHelperText>{errors.beds.message}</FormHelperText>
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

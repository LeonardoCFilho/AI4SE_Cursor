import { type ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Divider,
} from '@mui/material';

import { guestFormSchema, type GuestFormData, formatCpf } from '../schemas';
import type { Guest } from '../types';

interface GuestFormProps {
  initialData?: Guest;
  onSubmit: (data: GuestFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

/**
 * Formata CPF enquanto digita.
 *
 * @param value - Valor digitado
 * @returns Valor formatado
 */
function maskCpf(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const limited = cleaned.slice(0, 11);

  if (limited.length <= 3) return limited;
  if (limited.length <= 6) return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  if (limited.length <= 9)
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
}

/**
 * Formulário de cadastro/edição de hóspede.
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
 * <GuestForm
 *   onSubmit={(data) => createGuest.mutate(data)}
 *   onCancel={() => setShowForm(false)}
 * />
 * ```
 */
export function GuestForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: GuestFormProps): ReactNode {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      cpf: '',
      email: '',
    },
  });

  const cpfValue = watch('cpf');

  useEffect(() => {
    if (initialData) {
      reset({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        cpf: formatCpf(initialData.cpf),
        email: initialData.email,
      });
    }
  }, [initialData, reset]);

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const maskedValue = maskCpf(event.target.value);
    setValue('cpf', maskedValue, { shouldValidate: true });
  };

  const handleFormSubmit = (data: GuestFormData): void => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader
        title={initialData ? 'Editar Hóspede' : 'Novo Hóspede'}
        sx={{ bgcolor: 'primary.main', color: 'white' }}
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('firstName')}
                label="Nome"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                disabled={isLoading}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('lastName')}
                label="Sobrenome"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                disabled={isLoading}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="CPF"
                value={cpfValue}
                onChange={handleCpfChange}
                fullWidth
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                disabled={isLoading}
                placeholder="000.000.000-00"
                inputProps={{ maxLength: 14 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('email')}
                type="email"
                label="E-mail"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
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

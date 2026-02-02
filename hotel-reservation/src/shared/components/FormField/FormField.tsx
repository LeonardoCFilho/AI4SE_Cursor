import type { ReactNode } from 'react';
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Select,
  Checkbox,
} from '@mui/material';
import type { FieldError } from 'react-hook-form';
import type { SelectChangeEvent } from '@mui/material';

interface TextInputProps {
  type: 'text' | 'number' | 'email';
  label: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
  helperText?: string;
  disabled?: boolean;
  name?: string;
}

interface SelectInputProps {
  type: 'select';
  label: string;
  value?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  error?: FieldError;
  helperText?: string;
  disabled?: boolean;
  children: ReactNode;
}

interface CheckboxInputProps {
  type: 'checkbox';
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: FieldError;
  helperText?: string;
  disabled?: boolean;
}

type FormFieldProps = TextInputProps | SelectInputProps | CheckboxInputProps;

/**
 * Campo de formulário unificado com suporte a diferentes tipos.
 * Integra com React Hook Form para exibição de erros.
 *
 * @param props - Propriedades do componente
 * @param props.type - Tipo do campo (text, number, email, select, checkbox)
 * @param props.label - Label do campo
 * @param props.error - Objeto de erro do React Hook Form
 * @param props.helperText - Texto auxiliar
 *
 * @example
 * ```tsx
 * <FormField
 *   type="text"
 *   label="Nome"
 *   value={value}
 *   onChange={handleChange}
 *   error={errors.name}
 * />
 * ```
 */
export function FormField(props: FormFieldProps): ReactNode {
  const { type, label, error, helperText } = props;
  const errorMessage = error?.message ?? helperText;

  if (type === 'checkbox') {
    const { checked, onChange, disabled } = props;
    return (
      <FormControl error={!!error}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
            />
          }
          label={label}
        />
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    );
  }

  if (type === 'select') {
    const { children, value, onChange, disabled } = props;
    return (
      <FormControl fullWidth error={!!error} size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          value={value ?? ''}
          onChange={onChange}
          label={label}
          disabled={disabled}
        >
          {children}
        </Select>
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    );
  }

  const { value, onChange, disabled, name } = props;
  return (
    <TextField
      type={type}
      name={name}
      label={label}
      value={value ?? ''}
      onChange={onChange}
      error={!!error}
      helperText={errorMessage}
      disabled={disabled}
      fullWidth
    />
  );
}

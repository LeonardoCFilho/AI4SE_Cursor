import type { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * Diálogo de confirmação reutilizável.
 * Usado para confirmar ações destrutivas como exclusão.
 *
 * @param props - Propriedades do componente
 * @param props.open - Se o diálogo está aberto
 * @param props.title - Título do diálogo
 * @param props.message - Mensagem de confirmação
 * @param props.confirmText - Texto do botão de confirmação (padrão: "Confirmar")
 * @param props.cancelText - Texto do botão de cancelamento (padrão: "Cancelar")
 * @param props.onConfirm - Callback ao confirmar
 * @param props.onCancel - Callback ao cancelar
 * @param props.isLoading - Se está processando a ação
 *
 * @example
 * ```tsx
 * <ConfirmDialog
 *   open={isOpen}
 *   title="Excluir quarto"
 *   message="Tem certeza que deseja excluir este quarto?"
 *   onConfirm={handleDelete}
 *   onCancel={() => setIsOpen(false)}
 * />
 * ```
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps): ReactNode {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

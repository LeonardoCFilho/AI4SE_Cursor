import { QueryClient } from '@tanstack/react-query';

/**
 * Cliente React Query configurado para o sistema.
 * Utiliza staleTime de 5 minutos e desativa refetch no focus.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

import type { ReactNode } from 'react';
import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material';
import { Hotel as HotelIcon } from '@mui/icons-material';

import { TabNavigation } from '@/shared/components';
import { RoomsModule } from '@/modules/rooms';
import { GuestsModule } from '@/modules/guests';
import { ReservationsModule } from '@/modules/reservations';

/**
 * Componente principal da aplicação.
 * Gerencia a navegação entre os módulos do sistema de reservas.
 */
function App(): ReactNode {
  const tabs = [
    {
      label: 'Quartos',
      component: <RoomsModule />,
    },
    {
      label: 'Hóspedes',
      component: <GuestsModule />,
    },
    {
      label: 'Reservas',
      component: <ReservationsModule />,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <HotelIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Sistema de Reservas - Hotel
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TabNavigation tabs={tabs} />
      </Container>
    </Box>
  );
}

export default App;

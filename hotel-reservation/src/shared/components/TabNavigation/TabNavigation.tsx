import { useState, type ReactNode, type SyntheticEvent } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';

interface TabItem {
  label: string;
  component: ReactNode;
  icon?: ReactNode;
}

interface TabNavigationProps {
  tabs: TabItem[];
  defaultTab?: number;
}

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
}

/**
 * Painel que exibe o conteúdo de uma aba.
 */
function TabPanel({ children, value, index }: TabPanelProps): ReactNode {
  if (value !== index) return null;

  return (
    <Box role="tabpanel" sx={{ p: 3 }}>
      {children}
    </Box>
  );
}

/**
 * Componente de navegação por abas.
 * Permite alternar entre diferentes seções do sistema.
 *
 * @param props - Propriedades do componente
 * @param props.tabs - Array de abas com label e componente
 * @param props.defaultTab - Índice da aba inicial (padrão: 0)
 *
 * @example
 * ```tsx
 * <TabNavigation
 *   tabs={[
 *     { label: 'Quartos', component: <RoomsModule /> },
 *     { label: 'Hóspedes', component: <GuestsModule /> },
 *   ]}
 * />
 * ```
 */
export function TabNavigation({
  tabs,
  defaultTab = 0,
}: TabNavigationProps): ReactNode {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleChange = (_event: SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon ? <>{tab.icon}</> : undefined}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
}

import { ReactNode, useState } from 'react';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import { Wallet, SystemUpdateAlt, SyncAlt } from '@mui/icons-material';

import {
  ActionModal,
  DepositFormWrapper,
  WithdrawFormWrapper,
  TransferFormWrapper,
} from './';
import { useAuth } from '@/modules/auth/hooks';

type ActionComponent = {
  icon: ReactNode;
  label: string;
  form: React.FC<{ onSuccess: () => void }>;
};

const actionComponents: Record<string, ActionComponent> = {
  Deposit: {
    icon: <Wallet />,
    label: 'Deposit',
    form: DepositFormWrapper,
  },
  Withdraw: {
    icon: <SystemUpdateAlt />,
    label: 'Withdraw',
    form: WithdrawFormWrapper,
  },
  Transfer: {
    icon: <SyncAlt />,
    label: 'Transfer',
    form: TransferFormWrapper,
  },
};

export function WalletActions() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const { refreshUser } = useAuth();
  const handleClose = () => setSelectedAction(null);
  const SelectedComponent = selectedAction
    ? actionComponents[selectedAction].form
    : null;

  const handleSuccess = () => {
    refreshUser();
    handleClose();
  };

  return (
    <>
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 3,
          paddingY: 2,
        }}
      >
        {Object.entries(actionComponents).map(([key, action]) => (
          <Box key={key} textAlign="center" display="flex" alignItems="center">
            <Box>
              <IconButton
                onClick={() => setSelectedAction(key)}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  width: 56,
                  height: 56,
                  '&:hover': { backgroundColor: 'primary.light' },
                }}
              >
                {action.icon}
              </IconButton>
              <Typography variant="body2" color="text.primary" pt={1}>
                {action.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      {SelectedComponent && selectedAction && (
        <ActionModal open onClose={handleClose} title={selectedAction}>
          <SelectedComponent onSuccess={handleSuccess} />
        </ActionModal>
      )}
    </>
  );
}

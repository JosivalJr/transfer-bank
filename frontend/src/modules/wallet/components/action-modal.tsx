import { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function ActionModal({ open, onClose, title, children }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="subtitle1">{title}</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 2,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

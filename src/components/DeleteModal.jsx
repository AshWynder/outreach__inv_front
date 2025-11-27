// src/components/DeleteConfirmDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
  Box,
} from '@mui/material';
import { DeleteForever } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Delete Item',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  itemName = '',
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="delete-confirm-dialog"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ bgcolor: 'teal.500', color: 'white', pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DeleteForever />
          {title}
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, height: '13vh' }}>

        {itemName && (
          <Typography
            variant="h6"
            sx={{ mt: 5, fontWeight: 'bold', color: 'error.main', textAlign: 'center'}}
          >
            {itemName}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 , gap: 16}}>
        <Button onClick={onClose} variant="outlined" size="large" sx={{borderColor: '#009688', color: '#009688'}}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          size="large"
          startIcon={<DeleteForever />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

interface Props {
    open: boolean;
    message: string;
    severity?: AlertColor;
    onClose: () => void;
}


const Notification: React.FC<Props> = ({ open, message, severity = 'success', onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <MuiAlert onClose={onClose} severity={severity} sx={{ width: '100%' }} elevation={6} variant="filled">
                {message}
            </MuiAlert>
        </Snackbar>
    );
}

export default Notification;
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = React.forwardRef((props, ref) => {
  const {
    open,
    onClose,
    message = '',
    severity = 'info',
    autoHideDuration = 6000,
    anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
    action,
    icon,
    sx,
    ...other
  } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onClose) {
      onClose(event, reason);
    }
  };

  return (
    <Snackbar
      ref={ref}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      {...other}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        icon={icon}
        action={action}
        sx={{ width: '100%', ...sx }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
});

CustomSnackbar.displayName = 'CustomSnackbar';

export default CustomSnackbar;


// severity: "success" // green
// severity: "error"   // red
// severity: "warning" // orange
// severity: "info"    // blue

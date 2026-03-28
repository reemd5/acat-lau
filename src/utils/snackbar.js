
export const showSnackbar = (setSnackbar, message, severity = "success") => {
  setSnackbar({
    open: true,
    message,
    severity,
  });
};

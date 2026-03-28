import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginJSON as jsonLogin, loginAPI as apiLogin } from "../../api/auth";
import { getCurrentSettings } from "../../api/settings";
import { showSnackbar } from "../../utils/snackbar";
import CustomSnackbar from "../../components/CustomSnackbar";
import { Box, Button, Card, CardContent, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, School } from '@mui/icons-material';

const isSettingsComplete = (settings) => {
  if (!settings) return false;

  return Boolean(
    settings.current_semester &&
    settings.academic_year &&
    [1, 2, 3].includes(Number(settings.year_number)) &&
    settings.semester_start_date &&
    settings.semester_end_date
  );
};

const isSemesterEnded = (settings) => {
  if (!settings?.semester_end_date) return false;

  const semesterEnd = new Date(`${settings.semester_end_date}T23:59:59`);
  return !Number.isNaN(semesterEnd.getTime()) && new Date() > semesterEnd;
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pass the selected role to your API if needed, 
      // or use it to validate the user after login
      //use this if you are using JSON server, not real API
      // const res = await jsonLogin(email, password);

      //use this if you are using real API
      const res = await apiLogin(email, password, role);
      
      const user = res.data.user;
 
      
      login(user, role);

      if (role === "admin") {
        const settingsRes = await getCurrentSettings();
        const currentSettings = settingsRes.data.settings ?? settingsRes.data;

        if (!isSettingsComplete(currentSettings) || isSemesterEnded(currentSettings)) {
          navigate("/admin/settings");
          return;
        }
      }

      navigate(`/${role}`);
    } 
    catch (error) {
      showSnackbar(setSnackbar, "Login failed. Please check your credentials.", "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f4f7f6 0%, #e8efed 100%)', 
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 4, boxShadow: '0px 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e0e0e0' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            
            {/* Branding Header */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Box sx={{ backgroundColor: '#00796b', color: 'white', p: 1.5, borderRadius: '12px', mb: 2 }}>
                <School fontSize="large" />
              </Box>
              <Typography variant="h4" fontWeight="700" sx={{ color: '#004d40' }}>
                ACAT
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ABET Course Assessment Tool
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <TextField
                fullWidth
                label="University Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00796b' } }}
              />

              {/* Password Input */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Role Selection Dropdown */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="role-select-label">Select Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  value={role}
                  label="Select Role"
                  onChange={(e) => setRole(e.target.value)}
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="admin">Administrator</MenuItem>
                  <MenuItem value="instructor">Instructor</MenuItem>
                  <MenuItem value="coordinator">Coordinator</MenuItem>
                </Select>
              </FormControl>

              {/* Login Action */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!role}
                sx={{
                  mt: 3,
                  py: 1.2, 
                  backgroundColor: '#00796b',
                  fontWeight: '500',
                  fontSize: '0.95rem',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#00695c',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#b2dfdb',
                    color: '#ffffff'
                  }
                }}
              >
                Login
      </Button>
            </form>
          </CardContent>
        </Card>

        {/* Snackbar Logic */}
        <CustomSnackbar
          open={snackbar.open}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Container>
    </Box>
  );
};

export default Login;

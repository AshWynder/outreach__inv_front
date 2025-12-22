import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

// Mock MUI components (matching your style)
const Box = ({ children, sx = {}, component = 'div', ...props }) => {
  const style = {
    padding: sx.p ? `${sx.p * 8}px` : undefined,
    backgroundColor: sx.bgcolor,
    color: sx.color,
    borderBottom: sx.borderBottom
      ? `${sx.borderBottom}px solid ${sx.borderColor || '#e0e0e0'}`
      : undefined,
    marginBottom: sx.mb ? `${sx.mb * 8}px` : undefined,
    display: sx.display,
    justifyContent: sx.justifyContent,
    gap: sx.gap ? `${sx.gap * 8}px` : undefined,
    marginTop: sx.mt ? `${sx.mt * 8}px` : undefined,
    ...sx,
  };
  return React.createElement(component, { style, ...props }, children);
};

const Paper = ({ children, elevation = 1 }) => (
  <div
    style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow:
        elevation === 3
          ? '0 10px 30px rgba(0,0,0,0.1)'
          : '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

const Typography = ({ children, variant = 'body1', sx = {} }) => {
  const styles = {
    h4: { fontSize: '2rem', fontWeight: 600 },
    body2: { fontSize: '0.875rem', opacity: 0.9 },
  };
  return <div style={{ ...styles[variant], ...sx }}>{children}</div>;
};

const Grid = ({ children, container, item, xs, sm, sx = {} }) => {
  if (container) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          ...sx,
        }}
      >
        {children}
      </div>
    );
  }
  return <div style={{ width: '60%', ...sx }}>{children}</div>;
};

const TextField = ({ label, error, helperText, ...props }) => (
  <div style={{ marginBottom: '16px', width: '100%' }}>
    <label
      style={{
        display: 'block',
        fontSize: '12px',
        color: error ? '#d32f2f' : '#555',
        marginBottom: '6px',
        fontWeight: 500,
      }}
    >
      {label}
    </label>
    <input
      {...props}
      style={{
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: error ? '1px solid #d32f2f' : '1px solid #ccc',
        borderRadius: '6px',
        fontFamily: 'inherit',
        outline: 'none',
      }}
    />
    {helperText && (
      <div
        style={{
          fontSize: '12px',
          color: '#d32f2f',
          marginTop: '4px',
        }}
      >
        {helperText}
      </div>
    )}
  </div>
);

const Button = ({
                  children,
                  variant = 'contained',
                  color = 'primary',
                  type,
                  onClick,
                  disabled,
                }) => {
  const isOutlined = variant === 'outlined';
  const bg = color === 'success' ? '#009688' : '#009688';
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 24px',
        backgroundColor: disabled
          ? '#ccc'
          : isOutlined
            ? 'transparent'
            : bg,
        color: disabled ? '#666' : isOutlined ? bg : 'white',
        border: isOutlined ? `2px solid ${bg}` : 'none',
        borderRadius: '8px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        textTransform: 'uppercase',
        fontSize: '14px',
      }}
    >
      {children}
    </button>
  );
};

export default function AdminUserForm({
                                        initialData = null,
                                        onSubmit,
                                        fromEdit = false,
                                        title = 'Create User',
                                        submitLabel = 'Create User',
                                      }) {
  const navigate = useNavigate();

  const defaultForm = {
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialData || defaultForm);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'accounts', label: 'Accounts' },
    { value: 'sales', label: 'Sales' },
    { value: 'supplyChain', label: 'Supply Chain' },
    { value: 'manager', label: 'Manager' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Only alphabets and spaces allowed';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    // Password validation (only for new users)
    if (!fromEdit) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please fix the errors in the form');
      setOpenSnackbar(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = fromEdit
        ? {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }
        : {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };

      onSubmit(payload);

      // Show success snackbar
      setSnackbarSeverity('success');
      setSnackbarMessage(
        `User ${fromEdit ? 'updated' : 'created'} successfully! Redirecting...`
      );
      setOpenSnackbar(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/users');
      }, 2000);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(
        error.response?.data?.message ||
        `Failed to ${fromEdit ? 'update' : 'create'} user`
      );
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '32px 16px' }}>
      <Paper elevation={3}>
        {/* Header */}
        <Box sx={{ bgcolor: '#009688', color: 'white', p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body2">
            Fill in all required information
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
          <Grid container>
            {/* Name Field */}
            <Grid item>
              <TextField
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                placeholder="Enter full name"
              />
            </Grid>

            {/* Email Field */}
            <Grid item>
              <TextField
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                placeholder="user@example.com"
              />
            </Grid>

            {/* Role Select */}
            <Grid item>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel
                  style={{
                    fontSize: '12px',
                    color: errors.role ? '#d32f2f' : '#555',
                    marginBottom: '6px',
                    fontWeight: 500,
                    display: 'block',
                  }}
                >
                  Role *
                </InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  displayEmpty
                  style={{
                    width: '100%',
                    marginTop: '24px',
                    border: errors.role ? '1px solid #d32f2f' : '1px solid #ccc',
                    borderRadius: '6px',
                  }}
                >
                  <MenuItem value="" disabled>
                    Select a role
                  </MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#d32f2f',
                      marginTop: '4px',
                    }}
                  >
                    {errors.role}
                  </div>
                )}
              </FormControl>
            </Grid>

            {/* Password Fields - Only show for new users */}
            {!fromEdit && (
              <>
                <Grid item>
                  <TextField
                    label="Password *"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    placeholder="Minimum 8 characters"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Confirm Password *"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    placeholder="Re-enter password"
                  />
                </Grid>
              </>
            )}

            {/* Submit Button */}
            <Grid item>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/users')}
                  disabled={isSubmitting}
                  sx={{
                    bgcolor: '#009688'
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="#009688"
                  disabled={isSubmitting}
                  sx={{
                    bgcolor: '#009688'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : submitLabel}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: '100%',
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
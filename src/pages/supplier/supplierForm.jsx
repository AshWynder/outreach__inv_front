import React, { useState } from 'react';

// Mock Material-UI components with similar styling
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
    borderTop: sx.borderTop ? `${sx.borderTop}px solid ${sx.borderColor || '#e0e0e0'}` : undefined,
    borderRadius: sx.borderRadius,
    height: sx.height,
    alignItems: sx.alignItems,
    cursor: sx.cursor,
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
          ? '0 3px 10px rgba(0,0,0,0.1)'
          : '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

const Typography = ({ children, variant = 'body1', component, sx = {} }) => {
  const styles = {
    h4: { fontSize: '2.125rem', fontWeight: 400 },
    h5: { fontSize: '1.5rem', fontWeight: 400 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  };
  const Tag = component || (variant.startsWith('h') ? variant : 'p');
  return <Tag style={{ ...styles[variant], ...sx, margin: 0 }}>{children}</Tag>;
};

const Tabs = ({ children, value, onChange, sx = {} }) => (
  <div
    style={{
      display: 'flex',
      borderBottom: sx.borderBottom
        ? `${sx.borderBottom}px solid ${sx.borderColor}`
        : undefined,
      backgroundColor: sx.bgcolor,
      overflowX: 'auto',
    }}
  >
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        active: value === index,
        onClick: () => onChange(null, index),
      })
    )}
  </div>
);

const Tab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      flex: '1 1 auto',
      minWidth: '150px',
      padding: '16px 24px',
      background: active ? 'white' : 'transparent',
      border: 'none',
      borderBottom: active ? '2px solid #1976d2' : 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      color: active ? '#009688' : '#666',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      transition: 'all 0.3s',
      borderColor: active ? '#009688' : '',
    }}
    onMouseEnter={(e) =>
      !active && (e.target.style.backgroundColor = '#f0f0f0')
    }
    onMouseLeave={(e) =>
      !active && (e.target.style.backgroundColor = 'transparent')
    }
  >
    {label}
  </button>
);

const Grid = ({ children, container, item, xs, sm, spacing, sx = {} }) => {
  if (container) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: spacing ? `${spacing * 8}px` : '16px',
          ...sx,
        }}
      >
        {children}
      </div>
    );
  }

  const colSpan = sm === 12 || xs === 12 ? 2 : 1;
  return <div style={{ gridColumn: `span ${colSpan}`, ...sx }}>{children}</div>;
};

const TextField = ({
                     label,
                     name,
                     value,
                     onChange,
                     type = 'text',
                     required,
                     multiline,
                     rows,
                     fullWidth,
                     variant,
                     InputLabelProps,
                     placeholder,
                   }) => (
  <div style={{ marginBottom: '8px', width: fullWidth ? '100%' : 'auto' }}>
    <label
      style={{
        display: 'block',
        fontSize: '12px',
        color: '#666',
        marginBottom: '8px',
        fontWeight: 500,
      }}
    >
      {label} {required && <span style={{ color: '#d32f2f' }}>*</span>}
    </label>
    {multiline ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows || 3}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontFamily: 'inherit',
          resize: 'vertical',
        }}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          transition: 'all 0.2s ease',
          color: '#212121',
        }}
      />
    )}
  </div>
);

const Button = ({
                  children,
                  variant = 'contained',
                  color = 'primary',
                  onClick,
                  disabled,
                  type,
                }) => {
  const colors = {
    primary: { bg: '#1976d2', text: 'white' },
    success: { bg: '#2e7d32', text: 'white' },
  };
  const isOutlined = variant === 'outlined';
  const colorScheme = colors[color] || colors.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 24px',
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'uppercase',
        borderRadius: '1rem',
        border: isOutlined ? `1px solid ${colorScheme.bg}` : 'none',
        backgroundColor: disabled
          ? '#ccc'
          : isOutlined
            ? 'white'
            : colorScheme.bg,
        color: disabled
          ? '#666'
          : isOutlined
            ? colorScheme.bg
            : colorScheme.text,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s',
        letterSpacing: '0.5px',
      }}
    >
      {children}
    </button>
  );
};

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProfessionalForm({
                                           initialData,
                                           title,
                                           submitLabel,
                                           onSubmit,
                                           fromEdit,
                                         }) {
  const defaultForm = {
    companyName: '',
    tradingName: '',
    name: '',
    title: '',
    email: '',
    phone: '',
    altPhone: '',
    kraPin: '',
    businessType: '',
    industry: '',
    creditLimit: '',
    creditUsed: '',
    creditAvailable: '',
    bankName: '',
    accountName: '',
    branchName: '',
    accountNumber: '',
  };

  // Transform nested data to flat structure if in edit mode
  const [formData, setFormData] = useState(() => {
    if (fromEdit && initialData) {
      return {
        companyName: initialData.company_name || '',
        tradingName: initialData.trading_name || '',
        name: initialData.contact_info?.name || '',
        title: initialData.contact_info?.title || '',
        email: initialData.contact_info?.email || '',
        phone: initialData.contact_info?.phone || '',
        altPhone: initialData.contact_info?.alt_phone || '',
        kraPin: initialData.business_details?.kra_pin || '',
        businessType: initialData.business_details?.business_type || '',
        industry: initialData.business_details?.industry || '',
        creditLimit: initialData.financial?.credit_limit || '',
        creditUsed: initialData.financial?.credit_used || '',
        creditAvailable: initialData.financial?.credit_available || '',
        bankName: initialData.bank_details?.bank_name || '',
        accountName: initialData.bank_details?.account_name || '',
        branchName: initialData.bank_details?.branch_name || '',
        accountNumber: initialData.bank_details?.account_number || '',
      };
    }
    return initialData || defaultForm;
  });

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', padding: '24px' }}>
      <Paper elevation={3}>
        <Box
          sx={{
            bgcolor: '#009688',
            color: 'white',
            p: 3,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, marginBottom: '8px' }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Please fill in all required information across the tabs
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: '#e0e0e0', bgcolor: '#f5f5f5' }}
        >
          <Tab label="Basic Info" />
          <Tab label="Business Details" />
          <Tab label="Financial Info" />
          <Tab label="Bank Details" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Tab 1: Basic Information */}
          <TabPanel value={activeTab} index={0}>
            <Grid
              container
              spacing={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Trading Name"
                  name="tradingName"
                  value={formData.tradingName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Contact Person Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Contact Person Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Contact Person Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Contact Person Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+254..."
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Contact Person Alternate Phone Number"
                  name="altPhone"
                  value={formData.altPhone}
                  onChange={handleInputChange}
                  placeholder="+254..."
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 2: Business Details */}
          <TabPanel value={activeTab} index={1}>
            <Grid
              container
              spacing={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Grid item xs={12} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="KRA Pin"
                  name="kraPin"
                  value={formData.kraPin}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Business Type"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 3: Financial Info */}
          <TabPanel value={activeTab} index={2}>
            <Grid
              container
              spacing={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Credit Limit"
                  name="creditLimit"
                  value={formData.creditLimit}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Credit Used"
                  name="creditUsed"
                  value={formData.creditUsed}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Credit Available"
                  name="creditAvailable"
                  value={formData.creditAvailable}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 4: Bank Details */}
          <TabPanel value={activeTab} index={3}>
            <Grid
              container
              spacing={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Account Name"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Branch Name"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Navigation Buttons */}
          <Box
            sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid #e0e0e0',
            }}
          >
            <Box
              sx={{
                bgcolor: activeTab === 0 ? '#ccc' : '#009688',
                color: '#fff',
                p: 3,
                borderRadius: '1rem',
                height: '25px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: activeTab === 0 ? 'not-allowed' : 'pointer',
              }}
              onClick={() => activeTab > 0 && setActiveTab(activeTab - 1)}
            >
              Previous
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {activeTab < 3 ? (
                <Box
                  sx={{
                    bgcolor: '#009688',
                    color: '#fff',
                    p: 3,
                    borderRadius: '1rem',
                    height: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveTab(activeTab + 1)}
                >
                  Next
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  type="submit"
                  name="submit"
                >
                  {submitLabel}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
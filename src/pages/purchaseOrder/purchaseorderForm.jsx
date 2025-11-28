import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate, useLocation } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

// Your mock MUI components (unchanged, just kept clean)
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
    borderTop: sx.borderTop,
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

const TextField = ({ label, ...props }) => (
  <div style={{ marginBottom: '16px', width: '100%' }}>
    <label
      style={{
        display: 'block',
        fontSize: '12px',
        color: '#555',
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
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontFamily: 'inherit',
      }}
    />
  </div>
);

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  type,
  onClick,
}) => {
  const isOutlined = variant === 'outlined';
  const bg = color === 'success' ? '#2e7d32' : '#1976d2';
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      style={{
        padding: '10px 24px',
        backgroundColor: isOutlined ? 'transparent' : bg,
        color: isOutlined ? bg : 'white',
        border: isOutlined ? `2px solid ${bg}` : 'none',
        borderRadius: '8px',
        fontWeight: 600,
        cursor: 'pointer',
        textTransform: 'uppercase',
        fontSize: '14px',
      }}
    >
      {children}
    </button>
  );
};

function TabPanel({ children, value, index }) {
  return value === index ? <div>{children}</div> : null;
}

export default function ProfessionalForm({
  initialData,
  onSubmit,
  fromEdit,
  title = 'Create Purchase Order',
  submitLabel = 'Create Order',
  suppliers = [],
  products = [], // ← [{ _id, name, sku? }]
}) {
  console.log(products);
  console.log(suppliers);
  const navigate = useNavigate();
  const location = useLocation();

  const defaultForm = {
    deliveryDueDate: '',
    supplier: '',
    product: '',
    quantity: '',
    shippingCost: '',
  };

  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        supplier: initialData.supplier || '',
        product: initialData.items?.productId || '',

      });
    } else if (fromEdit && initialData) {
      setFormData({
        deliveryDueDate: initialData.deliveryDueDate || '',
        supplier: initialData.supplier || '',
        product: initialData.items?.productId || '',
        quantity: initialData.items?.quantity || '',
        shippingCost: initialData.shipping_cost || '',
      });
    } else {
      setFormData(initialData || defaultForm);
    }

    // Auto-select product if returned from create page
    const params = new URLSearchParams(location.search);
    const newProductId = params.get('newProductId');
    if (
      newProductId &&
      setFormData((prev) => ({ ...prev, product: newProductId }))
    );
  }, [initialData, fromEdit, location.search]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          <TabPanel value={activeTab} index={0}>
            <Grid container>
              {/* Date */}
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Delivery Due Date"
                    value={
                      formData.deliveryDueDate
                        ? dayjs(formData.deliveryDueDate)
                        : null
                    }
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        deliveryDueDate: date ? date.format('YYYY-MM-DD') : '',
                      })
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Product Autocomplete - THE STAR */}
              <Grid item>
                <Autocomplete
                  options={products}
                  getOptionLabel={(option) => option.name || ''}
                  value={
                    products.find((p) => p._id === formData.product) || null
                  }
                  onChange={(event, newValue) => {
                    if (newValue?._id === 'CREATE_NEW') {
                      navigate(
                        `/products/add?redirect=${encodeURIComponent(location.pathname)}`
                      );
                    } else {
                      setFormData({
                        ...formData,
                        product: newValue?._id || '',
                      });
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value?._id
                  }
                  filterOptions={(options, { inputValue }) => {
                    const filtered = options.filter((option) =>
                      option.name
                        ?.toLowerCase()
                        .includes(inputValue.toLowerCase())
                    );
                    if (inputValue.trim()) {
                      filtered.push({
                        _id: 'CREATE_NEW',
                        name: `Create "${inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id || 'create'}>
                      {option._id === 'CREATE_NEW' ? (
                        <strong style={{ color: '#009688', padding: '8px 0' }}>
                          + {option.name}
                        </strong>
                      ) : (
                        <div>
                          <div style={{ fontWeight: 500 }}>{option.name}</div>
                          {option.sku && (
                            <div style={{ fontSize: '0.85em', color: '#666' }}>
                              SKU: {option.sku}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  )}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        placeholder="Search products or create new..."
                        style={{
                          width: '100%',
                          padding: '12px',
                          fontSize: '16px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                        }}
                      />
                      <label
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          left: '12px',
                          backgroundColor: 'white',
                          padding: '0 8px',
                          fontSize: '12px',
                          color: '#555',
                        }}
                      >
                        Product
                      </label>
                    </div>
                  )}
                  noOptionsText="No products found"
                />
              </Grid>

              <Grid item>
                <Autocomplete
                  options={suppliers}
                  getOptionLabel={(option) => option.company_name || ''}
                  value={
                    suppliers.find((p) => p._id === formData.supplier) || null
                  }
                  onChange={(event, newValue) => {
                    if (newValue?._id === 'CREATE_NEW') {
                      navigate(
                        `/suppliers/add?redirect=${encodeURIComponent(location.pathname)}`
                      );
                    } else {
                      setFormData({
                        ...formData,
                        supplier: newValue?._id || '',
                      });
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value?._id
                  }
                  filterOptions={(options, { inputValue }) => {
                    const filtered = options.filter((option) =>
                      option.company_name
                        ?.toLowerCase()
                        .includes(inputValue.toLowerCase())
                    );
                    if (inputValue.trim()) {
                      filtered.push({
                        _id: 'CREATE_NEW',
                        name: `Create "${inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id || 'create'}>
                      {option._id === 'CREATE_NEW' ? (
                        <strong style={{ color: '#009688', padding: '8px 0' }}>
                          + {option.company_name}
                        </strong>
                      ) : (
                        <div>
                          <div style={{ fontWeight: 500 }}>{option.name}</div>
                          {option.company_name && (
                            <div style={{ fontSize: '0.85em', color: '#666' }}>
                              Company Name: {option.company_name}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  )}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        placeholder="Search suppliers or create new..."
                        style={{
                          width: '100%',
                          padding: '12px',
                          fontSize: '16px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                        }}
                      />
                      <label
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          left: '12px',
                          backgroundColor: 'white',
                          padding: '0 8px',
                          fontSize: '12px',
                          color: '#555',
                        }}
                      >
                        Supplier
                      </label>
                    </div>
                  )}
                  noOptionsText="No suppliers found"
                />
              </Grid>



              {/* Other fields */}
              <Grid item>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Shipping Cost"
                  name="shippingCost"
                  type="number"
                  value={formData.shippingCost}
                  onChange={handleInputChange}
                />
              </Grid>
              <Button
                variant="outlined"
                type="submit"
                name="submit"
                color='success'
                sx={{mt: 20}}
              >
                {submitLabel}
              </Button>
            </Grid>

          </TabPanel>

          {/* Navigation */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginRight: 125}}>

          </Box>
        </Box>
      </Paper>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate, useLocation } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip, IconButton, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
  title = 'Create Customer Order',
  submitLabel = 'Create Order',
  products = [],
  customers = [],
}) {
  // console.log(products);
  // console.log(customers);
  const navigate = useNavigate();
  const location = useLocation();

  const defaultForm = {
    customer: '',
    quantity: '',
    shippingCost: '',
  };

  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState(defaultForm);
  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        customer: initialData.customer || '',
        product: initialData.items?.productId || '',
      });
    } else if (fromEdit && initialData) {
      setFormData({
        customer: initialData.customer || '',
        quantity: initialData.items?.quantity || '',
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

    const payload = {
      customer: formData.customer,
      items: selectedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
    console.log(payload);
    onSubmit(payload);


  };

  // Calculate total cost whenever selectedItems or products change
  const totalCost = selectedItems.reduce((total, item) => {
    // Find the full product object from the products list
    const product = products.find(p => p._id === item.productId);

    if (!product) return total;

    const price = product.pricing?.selling_price || 0;
    const discount = product.pricing?.discount_percentage || 0;

    // Apply discount if any
    const priceAfterDiscount = price * (1 - discount / 100);

    return total + (priceAfterDiscount * item.quantity);
  }, 0);

// Optional: round to 2 decimal places
  const formattedTotal = totalCost.toFixed(2);


  // const customer = customers.map(customer => customer[formData.customer] = customer);

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

              {/* Product Autocomplete - THE STAR */}
              <Grid item>
                <Autocomplete
                  multiple
                  options={products}
                  getOptionLabel={(option) => option.name || ''}
                  value={selectedItems.map((item) => ({
                    ...item,
                    _id: item.productId,
                    name: item.name,
                    sku: item.sku,
                    reorderLevel: item.reorderLevel,
                  }))} // array of selected product objects
                  onChange={(event, newValue) => {
                    // Handle "Create new" option
                    const createOption = newValue.find(
                      (opt) => opt._id === 'CREATE_NEW'
                    );
                    if (createOption) {
                      const inputValue =
                        createOption.name.match(/"(.+)"/)?.[1] || '';
                      navigate(
                        `/products/add?name=${encodeURIComponent(inputValue)}&redirect=${encodeURIComponent(location.pathname)}`
                      );
                      // Remove the "Create" option from selection
                      setSelectedItems(
                        newValue.filter((opt) => opt._id !== 'CREATE_NEW')
                      );
                      return;
                    }

                    // Update selected items + set default quantity from reorderLevel
                    const updatedItems = newValue.map((product) => ({
                      productId: product._id,
                      name: product.name,
                      sku: product.sku || '',
                      reorderLevel: product.reorderLevel || 1,
                      quantity: product.reorderLevel || 1, // default here
                    }));

                    setSelectedItems(updatedItems);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  filterOptions={(options, { inputValue }) => {
                    const filtered = options.filter((option) =>
                      option.name
                        ?.toLowerCase()
                        .includes(inputValue.toLowerCase())
                    );

                    // Add "Create new" option if user typed something
                    if (
                      inputValue.trim() &&
                      !filtered.some((opt) => opt._id === 'CREATE_NEW')
                    ) {
                      filtered.push({
                        _id: 'CREATE_NEW',
                        name: `Create "${inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  renderTags={(value, getTagProps) =>
                    value
                      .filter((item) => item._id !== 'CREATE_NEW') // don't show "Create" as tag
                      .map((option, index) => (
                        <Chip
                          label={option.name}
                          {...getTagProps({ index })}
                          key={option._id}
                          size="small"
                          style={{
                            backgroundColor: '#e0f2f1',
                            color: '#00695c',
                          }}
                        />
                      ))
                  }
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
                        placeholder={
                          selectedItems.length === 0
                            ? 'Search products or create new...'
                            : ''
                        }
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
                        Products (Select multiple)
                      </label>
                    </div>
                  )}
                  noOptionsText="No products found"
                />
              </Grid>

              {selectedItems.length > 0 && (
                <Grid item container spacing={2}>
                  {selectedItems.map((item, index) => (
                    <Grid item xs={12} key={item.productId}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="body1" style={{ width: 200 }}>
                          {item.name} {item.sku && `(SKU: ${item.sku})`}
                        </Typography>
                        <TextField
                          label="Quantity"
                          type="number"
                          size="small"
                          value={item.quantity}
                          onChange={(e) => {
                            const updated = [...selectedItems];
                            updated[index].quantity =
                              parseInt(e.target.value) || 1;
                            setSelectedItems(updated);
                          }}
                          inputProps={{ min: 1 }}
                          style={{ width: 100 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          (default: {item.reorderLevel})
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedItems(
                              selectedItems.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}

              <Grid item>
                <Autocomplete
                  options={customers}
                  getOptionLabel={(option) => option.personal_info.full_name || ''}
                  value={
                    customers.find((customer) => customer._id === formData.customer) || null
                  }
                  onChange={(event, newValue) => {
                    if (newValue?._id === 'CREATE_NEW') {
                      navigate(
                        `/customers/add?redirect=${encodeURIComponent(location.pathname)}`
                      );
                    } else {
                      setFormData({
                        ...formData,
                        customer: newValue?._id || '',
                      });
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value?._id
                  }
                  filterOptions={(options, { inputValue }) => {
                    const filtered = options.filter((option) =>
                      option.personal_info.full_name
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
                          + {option.personal_info.full_name}
                        </strong>
                      ) : (
                        <div>
                          <div style={{ fontWeight: 500 }}>{option.personal_info.first_name}</div>
                          {option.personal_info.full_name && (
                            <div style={{ fontSize: '0.85em', color: '#666' }}>
                              Full Name: {option.personal_info.full_name}
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
                        placeholder="Search customers or create new..."
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
                        Customer
                      </label>
                    </div>
                  )}
                  noOptionsText="No customers found"
                />
              </Grid>

              {/* Other fields */}

              <Grid item>
                <TextField
                  label="Credit Available"
                  name="creditAvailable"
                  type="number"
                  value={(customers.find(customer => customer._id === formData.customer))?.financial?.credit_available}
                  disabled
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Total Cost"
                  value={formattedTotal}
                  disabled
                  fullWidth
                  InputProps={{
                    startAdornment: <span style={{ color: '#1976d2', fontWeight: 'bold' }}>$ </span>,
                    style: { fontWeight: 'bold', fontSize: '1.2em' }
                  }}
                  sx={{ '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#1976d2' } }}
                />
              </Grid>

              <Button
                variant="outlined"
                type="submit"
                name="submit"
                color="success"
                sx={{ mt: 20 }}
              >
                {submitLabel}
              </Button>
            </Grid>
          </TabPanel>

          {/* Navigation */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
              marginRight: 125,
            }}
          ></Box>
        </Box>
      </Paper>
    </div>
  );
}

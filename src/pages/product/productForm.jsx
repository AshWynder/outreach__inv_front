import React, {useEffect, useState} from 'react';

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

  // Handle column spanning for items
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
          outline: 'none',
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
          ':focus': {
            border: '2px solid #009688',
            padding: '11px',
          },
        }}
      />
    )}
  </div>
);

const Select = ({ children, name, value, onChange, label, fullWidth }) => (
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
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'white',
      }}
    >
      {children}
    </select>
  </div>
);

const MenuItem = ({ children, value }) => (
  <option value={value}>{children}</option>
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
  onSubmit = () => {},
  fromEdit
}) {
  const defaultForm = {
    name: '',
    description: '',
    costPrice: '',
    sellingPrice: '',
    vat: '',
    discountPercentage: '',
    quantityOnHand: '',
    quantityReserved: '',
    reorderLevel: '',
    reorderQuantity: '',
    unitOfMeasure: '',
    brand: '',
    model: '',
    color: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    unit: '',
    processor: '',
    ram: '',
    storage: '',
    screenSize: '',
  };

  console.log(initialData);
  const [formData, setFormData] = useState(defaultForm);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (fromEdit && initialData) {
      const flattened = {
        name: initialData.name || '',
        description: initialData.description || '',
        costPrice: initialData.pricing?.cost_price || '',
        sellingPrice: initialData.pricing?.selling_price || '',
        vat: initialData.pricing?.vat || '',
        discountPercentage: initialData.pricing?.discount_percentage || '',
        quantityOnHand: initialData.inventory?.quantity_on_hand || '',
        quantityReserved: initialData.inventory?.quantity_reserved || '',
        reorderLevel: initialData.inventory?.reorder_level || '',
        reorderQuantity: initialData.inventory?.reorder_quantity || '',
        unitOfMeasure: initialData.inventory?.unit_of_measure || '',
        length: initialData.dimensions?.length || '',
        width: initialData.dimensions?.width || '',
        height: initialData.dimensions?.height || '',
        unit: initialData.dimensions?.unit || '',
        processor: initialData.custom_attributes?.processor || '',
        ram: initialData.custom_attributes?.ram || '',
        storage: initialData.custom_attributes?.storage || '',
        screenSize: initialData.custom_attributes?.screen_size || '',
        brand: initialData.brand || '',
        model: initialData.model || '',
        color: initialData.color || '',
        weight: initialData.weight || '',
      };
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(flattened);
    } else {
      setFormData(initialData || defaultForm);
    }
  }, [initialData, fromEdit]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
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
            {title.includes('Edit')
              ? 'Update product details'
              : 'Please fill in all required information across the tabs'}
          </Typography>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: '#e0e0e0', bgcolor: '#f5f5f5' }}
        >
          <Tab label="Basic Info" />
          <Tab label="Inventory Levels" />
          <Tab label="Product Dimensions" />
          <Tab label="Product attributes" />
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
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  multiline
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Cost Price"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Selling Price"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="VAT"
                  name="vat"
                  value={formData.vat}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Discount in Percentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 2: inventory */}
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
                  label="Quantity On Hand"
                  name="quantityOnHand"
                  value={formData.quantityOnHand}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Quantity Reserved"
                  name="quantityReserved"
                  value={formData.quantityReserved}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Re-order Level"
                  name="reorderLevel"
                  value={formData.reorderLevel}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Re-order Quantity"
                  name="reorderQuantity"
                  value={formData.reorderQuantity}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 3: dimensions */}
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
                  label="Length"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Width"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Height"
                  name="height"
                  value={formData.width}
                  onChange={handleInputChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <Select
                  fullWidth
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  label="Unit of Measurement"
                >
                  <MenuItem value="">Select...</MenuItem>
                  <MenuItem value="piece">piece</MenuItem>
                  <MenuItem value="set">set</MenuItem>
                  <MenuItem value="pair">pair</MenuItem>
                  <MenuItem value="dozen">dozen</MenuItem>
                  <MenuItem value="box">box</MenuItem>
                  <MenuItem value="pack">pack</MenuItem>
                  <MenuItem value="roll">roll</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tab 4: custom attributes */}
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
                  label="Processor Name"
                  name="processor"
                  value={formData.processor}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="RAM type"
                  name="ram"
                  value={formData.ram}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Storage type"
                  name="storage"
                  value={formData.storage}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '60%' }}>
                <TextField
                  fullWidth
                  label="Screen Size"
                  name="screenSize"
                  value={formData.screenSize}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Navigation Buttons */}
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
                bgcolor: '#009688',
                color: '#fff',
                p: 3,
                borderRadius: '1rem',
                height: '25px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
              disabled={activeTab === 0}
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
                  }}
                  onClick={() => setActiveTab(Math.min(4, activeTab + 1))}
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

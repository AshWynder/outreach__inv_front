import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Your list of options (e.g., countries, names, product codes)
const movieOptions = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Dark Knight', year: 2008 },
  { label: 'Pulp Fiction', year: 1994 },
  // ... more options
];

export default function selectTest() {
  return (
    <Autocomplete
      disablePortal
      id="searchable-select-example"
      options={movieOptions}
      // 'getOptionLabel' tells Autocomplete which property to use for display/search
      getOptionLabel={(option) => option.label}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select a Movie" />}
    />
  );
}
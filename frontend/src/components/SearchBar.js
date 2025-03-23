// frontend/src/components/SearchBar.js
import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ options }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 300, mb: 2 }}>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.text}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder="Search pages..." />
        )}
        onChange={(event, value) => {
          if (value && value.path) {
            navigate(value.path);
          }
        }}
      />
    </Box>
  );
};

export default SearchBar;

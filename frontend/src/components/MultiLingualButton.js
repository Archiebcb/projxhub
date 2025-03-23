import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const languages = ['English', 'Spanish', 'Chinese'];

function MultiLingualButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button variant="outlined" onClick={handleClick} sx={{ mr: 2 }}>
        Language
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.map((lang) => (
          <MenuItem key={lang} onClick={handleClose}>
            {lang}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default MultiLingualButton;

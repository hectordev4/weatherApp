import * as React from 'react';
import { styled } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

const CustomRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.secondary.main,
  '&.Mui-checked': {
    color: theme.palette.accent.main,
  },
}));

export default function ToggleMode({ mode, setMode }) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-theme-toggle"
        name="theme-toggle"
        row
        value={mode}
        onChange={(event) => setMode(event.target.value)}
        sx={{
          '& .MuiFormControlLabel-label': {
            color: 'text.primary',
          },
        }}
      >
        <FormControlLabel value="light" control={<CustomRadio />} label="Light" />
        <FormControlLabel value="dark" control={<CustomRadio />} label="Dark" />
      </RadioGroup>
    </FormControl>
  );
}

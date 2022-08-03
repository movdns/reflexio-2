import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type PasswordFieldProps = TextFieldProps & {
  onBlur(e: FocusEvent): void;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  return (
    <TextField
      variant="filled"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={showPassword ? 'text' : 'password'}
      autoComplete={name}
      InputLabelProps={{ focused: false }}
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              size="small"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={error}
      helperText={helperText}
      fullWidth
    />
  );
};

export default PasswordField;

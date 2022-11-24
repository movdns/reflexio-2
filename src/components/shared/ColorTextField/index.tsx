import React, { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type ColorTextFieldProps = TextFieldProps & {
  focusColor?: string;
};

const ColorTextField: FC<ColorTextFieldProps> = ({ ...props }) => {
  return <StyledTextField {...props} />;
};

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "focusColor",
})<ColorTextFieldProps>(({ theme, focusColor }) => ({
  "& label.Mui-focused": {
    color: "white",
  },
  // "& .MuiInput-underline:after": {
  //   borderBottomColor: color,
  // },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: focusColor || theme.palette.primary.main,
    },
  },
}));

export default ColorTextField;

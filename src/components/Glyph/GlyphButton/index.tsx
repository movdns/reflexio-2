import React from "react";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import iconsDefaultConfig from "../../../common/config/icons";
import Glyph from "../index";

export type GlyphButtonProps = {
  children?: any;
  code?: string;

  iconType?: "duotone" | "solid" | "thin" | "light" | "regular" | undefined;
  fullWidth?: boolean;
  size?: number;

  crossOut?: boolean;

  color?: string;
  rounded?: boolean;
  variant?: "outlined" | "filled" | "default";
  disabled?: boolean;
  selected?: boolean;

  p?: number | string;
  m?: number | string;

  onClick?: () => void;
};

const GlyphButton: React.FC<GlyphButtonProps> = ({
  children,

  crossOut,

  code,
  iconType,
  fullWidth,
  size,

  color,
  rounded,
  variant,
  disabled,
  selected,

  p,
  m,

  onClick,
}) => {
  return (
    <GlyphIconButton
      crossOut={crossOut}
      colour={color}
      rounded={rounded}
      variant={variant}
      disabled={disabled}
      selected={selected}
      p={p}
      m={m}
      onClick={onClick}
    >
      {code ? (
        <Glyph
          code={code}
          size={size}
          iconType={iconType}
          fullWidth={fullWidth || true}
        />
      ) : (
        <>{children}</>
      )}
    </GlyphIconButton>
  );
};

const GlyphIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "crossOut" &&
    prop !== "colour" &&
    prop !== "rounded" &&
    prop !== "variant" &&
    prop !== "selected" &&
    prop !== "p" &&
    prop !== "m",
})<GlyphButtonProps & { colour: string | undefined }>(
  ({
    crossOut,
    colour,
    rounded,
    variant,
    selected,
    disabled,

    p,
    m,
  }) => ({
    display: "flex",
    alignItems: "center",
    borderRadius: rounded ? 10 : "50%",
    "& .MuiTouchRipple-root .MuiTouchRipple-child": {
      borderRadius: rounded && 10,
    },
    color:
      selected && variant === "outlined"
        ? "white"
        : (!colour && selected && iconsDefaultConfig.defaultSelectedColor) ||
          colour ||
          iconsDefaultConfig.defaultColor,
    //outline: selected && selectedType === "outline" ? "1px solid" : "none",
    aspectRatio: "1 / 1",
    background: selected && variant === "outlined" ? colour : "inherit",
    opacity: disabled && !selected ? 0.3 : 1,
    padding: p || 2,
    margin: m || 0,
    outline: variant === "outlined" ? "1px solid" : "none",
    "&:hover": {
      background: selected && `${colour}90`,
    },
    "&:after": crossOut && {
      position: "absolute",
      content: "''",
      top: "50%",
      right: 0,
      width: "100%",
      borderTop: "1px solid",
      transform: "rotate(45deg)",
    },
  })
);

export const GlyphButtonSkeleton = () => (
  <GlyphIconButton
    rounded
    variant="outlined"
    p={7}
    colour="#bbb"
    sx={{
      // @TODO refactor
      "@keyframes pulse": {
        "0%": {
          opacity: 0.8,
        },
        "50%": {
          opacity: 0.2,
        },
        "100%": {
          opacity: 0.8,
        },
      },
      "@keyframes pulseOpacity": {
        "0%": {
          transform: "translateX(-75)",
        },
        "50%": {
          transform: "translateX(50%)",
        },
        "100%": {
          transform: "translateX(175%)",
        },
      },
      animationName: "pulse",
      animationTimingFunction: "ease-in-out",
      animationDuration: "1.25s",
      animationIterationCount: "infinite",
    }}
  >
    <Glyph code="ghost" iconType="thin" fullWidth />
  </GlyphIconButton>
);

export default GlyphButton;

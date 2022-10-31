import React from "react";
import { styled } from "@mui/material/styles";

export type GlyphProps = {
  code: string;
  selected?: boolean;
  size?: number;
  color?: string | null;
  iconType?: "light" | "thin" | "regular" | "solid" | "duotone";
  // @todo global type
  coloration?: any;
  selectedColor?: string;
  selectedColoration?: GlyphProps["coloration"];
  fullWidth?: boolean;
  shadow?: boolean;
};

const Glyph: React.FC<GlyphProps> = ({
  code,
  size,
  color,
  coloration,
  selectedColor,
  iconType,
  selected,
  selectedColoration,
  fullWidth,
  shadow,
}) => {
  // const defaultType = iconsDefaultConfig.type;
  const colorationToColor = !color && coloration && "orange"; //theme.palette.primary.main;
  const selectedColorationToColor =
    !selectedColor && selectedColoration && "green";
  // const sizeOrResize =
  //   size && needsToBeResized.includes(code) ? size - resizeValue : size;

  return (
    <GlyphIcon
      selected={selected}
      className={`fa-${iconType || "thin"} fa-${code} ${
        !fullWidth ? "" : "fa-fw"
      }`}
      size={size || 32}
      color={colorationToColor || color}
      selectedColor={selectedColorationToColor || selectedColor}
      shadow={shadow}
    />
  );
};

const GlyphIcon = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "color" &&
    prop !== "selectedColor" &&
    prop !== "shadow",
})<{
  size?: number;
  color?: string;
  selected?: boolean;
  selectedColor?: string;
  shadow?: boolean;
}>(({ size, color, selected, selectedColor, shadow }) => ({
  fontSize: size || 32,
  position: "relative",
  color:
    (!color && selected && (selectedColor || "#ccc")) || color || "inherit",
  boxShadow: shadow
    ? "rgba(0, 0, 0, 0.31) 0px 0px 1px 0px, rgba(0, 0, 0, 0.25) 0px 4px 6px -2px"
    : "none",
  borderRadius: shadow ? "50%" : "none",
}));

export default Glyph;

import React from "react";
import { styled } from "@mui/material/styles";
import iconsDefaultConfig, {
  needsToBeResized,
  resizeValue,
} from "../../../../../common/config/icons";
import palette from "../../../../../common/palette";

export type GlyphProps = {
  code: string;
  selected?: boolean;
  size?: number;
  color?: string;
  iconType?: "light" | "thin" | "regular" | "solid" | "duotone";
  // @todo global type
  coloration?: "negative" | "danger" | "neutral" | "positive" | "special";
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
  const defaultType = iconsDefaultConfig.type;
  const colorationToColor = !color && coloration && palette[coloration].main; //theme.palette.primary.main;
  const selectedColorationToColor =
    !selectedColor && selectedColoration && palette[selectedColoration].main;
  const sizeOrResize =
    size && needsToBeResized.includes(code) ? size - resizeValue : size;

  return (
    <GlyphIcon
      selected={selected}
      className={`fa-${iconType || defaultType} fa-${code} ${
        fullWidth && "fa-fw"
      }`}
      size={sizeOrResize}
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
  fontSize: size || iconsDefaultConfig.fontSize,
  position: "relative",
  color:
    (!color &&
      selected &&
      (selectedColor || iconsDefaultConfig.defaultSelectedColor)) ||
    color ||
    "inherit",
  boxShadow: shadow
    ? "rgba(0, 0, 0, 0.31) 0px 0px 1px 0px, rgba(0, 0, 0, 0.25) 0px 4px 6px -2px"
    : "none",
  borderRadius: shadow ? "50%" : "none",
}));

export default Glyph;

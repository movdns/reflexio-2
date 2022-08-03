import React from "react";
import { styled } from "@mui/material/styles";
import iconsDefaultConfig, {
  needsToBeResized,
  resizeValue,
} from "../../../../common/config/icons";
import { Box } from "@mui/material";

export type GlyphProps = {
  code: string;
  selected?: boolean;
  size?: number;
  color?: string;
  iconType?: "light" | "thin" | "regular" | "solid" | "duotone";
};

const GlyphIcon = styled("div", {
  shouldForwardProp: (prop) => prop !== "size" && prop !== "color",
})<{ size?: number; color?: string; selected?: boolean }>(
  ({ theme, size, color, selected }) => ({
    fontSize: size || iconsDefaultConfig.fontSize,
    position: "relative",
    color: selected ? "red" : color || "inherit",
  })
);

const Glyph: React.FC<GlyphProps> = ({
  code,
  size,
  color,
  iconType,
  selected,
}) => {
  const defaultType = iconsDefaultConfig.type;

  const sizeOrResize =
    size && needsToBeResized.includes(code) ? size - resizeValue : size;

  return (
    <GlyphIcon
      selected={selected}
      className={`fa-${iconType || defaultType} fa-${code} fa-fw`}
      size={sizeOrResize}
      color={color}
    />
  );
};

export default Glyph;

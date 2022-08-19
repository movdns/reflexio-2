import React from "react";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import palette from "../../../../../common/palette";
import iconsDefaultConfig from "../../../../../common/config/icons";

export type GlyphButtonProps = {
  children: any;

  color?: string | GlyphButtonProps["coloration"];

  disabled?: boolean;
  inverse?: boolean;
  selected?: boolean;
  selectedType?: "outline" | "fill";
  selectedColor?: string;
  coloration?: "negative" | "danger" | "neutral" | "positive" | "special";
  selectedColoration?: GlyphButtonProps["coloration"];
  onClick?: () => void;
};

type GlyphIconButtonProps = Pick<
  GlyphButtonProps,
  "selected" | "selectedType" | "inverse"
> & { colour?: string; selectedColor?: string }; // property "color" is reserved by MuiButtonIcon

const GlyphButton: React.FC<GlyphButtonProps> = ({
  children,
  color,
  coloration,
  selected,
  disabled,
  selectedType,
  selectedColor,
  selectedColoration,
  onClick,
  inverse,
}) => {
  const colorationToColor = !color && coloration && palette[coloration].main; //theme.palette.primary.main;
  const selectedColorationToColor =
    !selectedColor && selectedColoration && palette[selectedColoration].main;

  return (
    <GlyphIconButton
      colour={color || colorationToColor || ""}
      selected={selected}
      onClick={onClick}
      inverse={inverse}
      selectedType={selectedType}
      disabled={disabled}
      selectedColor={selectedColorationToColor || selectedColor}
    >
      {children}
    </GlyphIconButton>
  );
};

const GlyphIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "colour" &&
    prop !== "selected" &&
    prop !== "inverse" &&
    prop !== "selectedColor" &&
    prop !== "selectedType",
})<GlyphIconButtonProps>(
  ({
    disabled,
    colour,
    selected,
    selectedColor,
    selectedType = "outline",
    inverse,
  }) => ({
    display: "flex",
    alignItems: "center",
    color:
      (selected && selectedType === "fill") || inverse
        ? "white"
        : (!colour &&
            selected &&
            (selectedColor || iconsDefaultConfig.defaultSelectedColor)) ||
          colour ||
          iconsDefaultConfig.defaultColor,
    outline: selected && selectedType === "outline" ? "1px solid" : "none",
    aspectRatio: "1 / 1",
    background:
      (selected && selectedType === "fill") || inverse ? colour : "inherit",
    opacity: disabled && !selected ? 0.3 : 1,
  })
);

export default GlyphButton;

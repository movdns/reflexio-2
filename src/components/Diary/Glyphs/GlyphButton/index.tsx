import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import palette from "../../../../common/palette";

export type GlyphButtonProps = {
  children: any;

  color?: string | GlyphButtonProps["coloration"];

  disabled?: boolean;
  inverse?: boolean;
  selected?: boolean;
  selectedType?: "outline" | "fill";
  coloration?: "negative" | "danger" | "neutral" | "positive" | "special";

  onClick?: () => void;
};

type GlyphIconButtonProps = Pick<
  GlyphButtonProps,
  "selected" | "selectedType" | "inverse"
> & { colour: string }; // property "color" is reserved by MuiButtonIcon

const GlyphButton: React.FC<GlyphButtonProps> = ({
  children,
  color,
  coloration,
  selected,
  disabled,
  selectedType,
  onClick,
  inverse,
}) => {
  const theme = useTheme();
  const defaultColor = theme.palette.secondary.dark;

  const colorationToColor =
    !color && coloration ? palette[coloration].main : defaultColor; //theme.palette.primary.main;

  return (
    <GlyphIconButton
      colour={color || colorationToColor}
      selected={selected}
      onClick={onClick}
      inverse={inverse}
      selectedType={selectedType}
      disabled={disabled && !selected}
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
    prop !== "selectedType",
})<GlyphIconButtonProps>(
  ({ colour, selected, selectedType = "outline", inverse }) => ({
    display: "flex",
    alignItems: "center",
    color: (selected && selectedType === "fill") || inverse ? "white" : colour,
    outline: selected && selectedType === "outline" ? "1px solid" : "none",
    aspectRatio: "1 / 1",
    background:
      (selected && selectedType === "fill") || inverse ? colour : "inherit",
  })
);

export default GlyphButton;

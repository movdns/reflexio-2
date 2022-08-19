import React from "react";
import { Box, Grid } from "@mui/material";
import GlyphButton, { GlyphButtonProps } from "../GlyphButton";
import Glyph, { GlyphProps } from "../Glyph";
import { TGlyph } from "../../../../../types";

type GlyphGroupProps = Pick<GlyphProps, "iconType" | "size"> & {
  data?: any[];
  advancedData?: {
    code: string;
    color?: string;
    size?: number;
    selected?: boolean;
  }[];
  button?: boolean;
  disabled?: boolean;
  onClick?: (code: TGlyph) => void;
  coloration?: GlyphButtonProps["coloration"];
  inverse?: GlyphButtonProps["inverse"];
  selected?: string[];
  selectedColor?: string;
  selectedColoration?: GlyphButtonProps["selectedColoration"];

  fullWidth?: boolean;
};

const GlyphGroup: React.FC<GlyphGroupProps> = ({
  data,
  iconType,
  size,
  button,
  onClick,
  coloration,
  inverse,
  advancedData,
  disabled,
  selected,
  selectedColor,
  selectedColoration,
  fullWidth,
}) => {
  const iconsData = advancedData || data;

  const onlySelected = false;

  const sel = iconsData?.filter((i: any) => selected?.includes(i.code));

  return (
    <Box component={Grid} spacing={2} columns={5} container>
      {sel && onlySelected ? (
        sel.map((icon: any) => (
          <Box
            key={Math.random()}
            component={Grid}
            item
            xs={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {button ? (
              <GlyphButton
                disabled={disabled}
                inverse={inverse}
                key={Math.random()}
                color={icon?.color}
                coloration={icon?.coloration || coloration}
                selected={
                  selected?.includes(icon?.code) || icon?.selected || false
                }
                selectedColor={selectedColor}
                selectedColoration={selectedColoration}
                onClick={() => onClick?.(icon)}
              >
                <Glyph
                  code={icon?.code || icon}
                  iconType={icon?.iconType || iconType}
                  fullWidth={fullWidth}
                />
              </GlyphButton>
            ) : (
              <Box p={1.4}>
                <Glyph
                  selected={
                    selected?.includes(icon?.code) || icon?.selected || false
                  }
                  color={icon?.color}
                  coloration={icon?.coloration || coloration}
                  code={icon?.code || icon}
                  iconType={iconType}
                  selectedColor={selectedColor}
                  selectedColoration={selectedColoration}
                />
              </Box>
            )}
          </Box>
        ))
      ) : iconsData ? (
        iconsData.map((icon: any) => {
          const iconSize = icon?.size || size;
          // const isSelected = iconsData

          return (
            <Box
              key={Math.random()}
              component={Grid}
              item
              xs={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {button ? (
                <GlyphButton
                  disabled={disabled}
                  inverse={inverse}
                  key={Math.random()}
                  color={icon?.color}
                  coloration={icon?.coloration || coloration}
                  selected={
                    selected?.includes(icon?.code) || icon?.selected || false
                  }
                  selectedColor={selectedColor}
                  selectedColoration={selectedColoration}
                  onClick={() => onClick?.(icon)}
                >
                  <Glyph
                    code={icon?.code || icon}
                    iconType={icon?.iconType || iconType}
                    size={iconSize - 5}
                    fullWidth={fullWidth}
                  />
                </GlyphButton>
              ) : (
                <Box p={1.4}>
                  <Glyph
                    selected={
                      selected?.includes(icon?.code) || icon?.selected || false
                    }
                    color={icon?.color}
                    coloration={icon?.coloration || coloration}
                    code={icon?.code || icon}
                    iconType={iconType}
                    size={iconSize}
                    selectedColor={selectedColor}
                    selectedColoration={selectedColoration}
                  />
                </Box>
              )}
            </Box>
          );
        })
      ) : (
        <Box p={2}>Icon data not provided</Box>
      )}
    </Box>
  );
};

export default GlyphGroup;

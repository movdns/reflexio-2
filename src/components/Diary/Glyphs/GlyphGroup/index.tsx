import React from "react";
import { Box, Grid } from "@mui/material";
import GlyphButton, { GlyphButtonProps } from "../GlyphButton";
import Glyph, { GlyphProps } from "../Glyph";

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
  onClick?: (code: string) => void;
  coloration?: GlyphButtonProps["coloration"];
  inverse?: GlyphButtonProps["inverse"];
  selected?: string[];
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
}) => {
  const iconsData = advancedData || data;

  return (
    <Box component={Grid} spacing={2} columns={5} container>
      {iconsData ? (
        iconsData.map((icon: any) => {
          const iconSize = icon?.size || size;
          // const isSelected = iconsData
          return (
            <Box
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
                  coloration={coloration}
                  selected={
                    selected?.includes(icon?.code) || icon?.selected || false
                  }
                  onClick={() => onClick?.(icon)}
                >
                  <Glyph
                    code={icon?.code || icon}
                    iconType={iconType}
                    size={iconSize}
                  />
                </GlyphButton>
              ) : (
                <Box p={1.4}>
                  <Glyph
                    selected={icon?.selected}
                    color={icon?.color}
                    code={icon?.code || icon}
                    iconType={iconType}
                    size={iconSize}
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

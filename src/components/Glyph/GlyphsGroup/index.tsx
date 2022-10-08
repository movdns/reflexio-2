import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import Glyph from "../";
import { useSettingsContext } from "../../../context/SettingsContext";

type GlyphsGroupProps = {
  data: string | string[] | null;
  label?: string | undefined;
  size?: number;
  color?: string;
  max?: number;
};

const GlyphsGroup: FC<GlyphsGroupProps> = ({
  data,
  label,
  size,
  color,
  max,
}) => {
  if (!data?.length) {
    return <></>;
  }
  return (
    <>
      <Box
        component={Typography}
        sx={{ textTransform: "lowercase" }}
        variant="body2"
        color={color || "inherit"}
      >
        {label && label}
      </Box>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        {Array.isArray(data) &&
          data.slice(0, max || data.length).map((g) => (
            <Box m={1} key={g}>
              <Glyph
                code={g}
                size={size || 22}
                iconType="thin"
                color={color || "inherit"}
              />
            </Box>
          ))}
      </Box>
    </>
  );
};

export default GlyphsGroup;

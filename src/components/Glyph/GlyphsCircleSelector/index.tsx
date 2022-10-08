import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import { Planet } from "react-planet";
import Glyph from "../";
import { TGlyph } from "../../../types";
import GlyphButton from "../GlyphButton";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { useSettingsContext } from "../../../context/SettingsContext";

type GlyphsCircleSelectorProps = {
  selectedCode: string | null;
  data: TGlyph[] | null;
  handleMoodSelect: (mood: TGlyph) => void;
  size: number;
};

const GlyphsCircleSelector: FC<GlyphsCircleSelectorProps> = ({
  selectedCode,
  data,
  handleMoodSelect,
  size,
}) => {
  const { getColorsFromPalette } = useSettingsContext();

  const selectedGlyph =
    selectedCode && data
      ? data?.find((icon: any) => icon.code === selectedCode)
      : null;

  const selectedEmotionColor = selectedGlyph?.coloration
    ? getColorsFromPalette?.(selectedGlyph?.coloration)
    : { main: "teal" };

  const restGlyphs = selectedCode
    ? data?.filter((icon: any) => icon.code !== selectedCode)
    : data;

  if (!data) {
    return <></>;
  }
  return (
    <>
      <Box>
        <Planet
          mass={2}
          tension={150}
          friction={30}
          // orbitRadius={(restGlyphs?.length && restGlyphs.length * 30) || 120}
          orbitRadius={(restGlyphs?.length && restGlyphs.length * 20) || 120}
          hideOrbit
          autoClose
          rotation={90}
          bounceDirection="BOTTOM"
          orbitStyle={(defaultStyle) => ({
            ...defaultStyle,
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: "gray",
          })}
          centerContent={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              // width={80}
              // height={80}
              sx={{
                background: "white",
                borderRadius: "50%",
                cursor: "pointer",
                color: "black",
              }}
            >
              <GlyphButton p={1}>
                <Glyph
                  code={selectedCode || "ghost"}
                  fullWidth
                  size={size || 46}
                  iconType="solid"
                  //coloration={selectedGlyph?.coloration || "custom1"}
                  color={selectedEmotionColor?.main || "inherit"}
                  // coloration={selectedGlyph?.coloration}
                />
              </GlyphButton>
            </Box>
          }
        >
          {restGlyphs &&
            restGlyphs.map((glyph) => {
              const glyphColor = glyph?.coloration
                ? getColorsFromPalette?.(glyph?.coloration)
                : { main: "teal" };

              return (
                <Box
                  key={glyph.code}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="50%"
                  p={0}
                  sx={{
                    background: "white",
                  }}
                >
                  <GlyphButton p={0.1} onClick={() => handleMoodSelect(glyph)}>
                    <Glyph
                      code={glyph.code}
                      fullWidth
                      size={38 || size || 42}
                      iconType="solid"
                      color={glyphColor?.main}
                    />
                  </GlyphButton>
                </Box>
              );
            })}

          {/*{restGlyphs?.length &&*/}
          {/*  restGlyphs.map(() => <Box key={generateUniqueID()} />)}*/}
        </Planet>
      </Box>

      <Box position="absolute" top={20} zIndex={99}>
        <Typography variant="subtitle2" color="#80808080">
          {/*{selected?.label}*/}
        </Typography>
      </Box>
    </>
  );
};

export default GlyphsCircleSelector;

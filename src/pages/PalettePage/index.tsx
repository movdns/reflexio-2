import React, { FC, useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  Box,
  Button,
  Card,
  Divider,
  Fab,
  Grid,
  Typography,
} from "@mui/material";
import { useSettingsContext } from "../../context/SettingsContext";
import ColorCard from "../../components/Palette/ColorCard";
import dayjs from "dayjs";
import availableColors from "../../common/config/availableColors";
import Glyph from "../../components/Glyph";
import SectionCard from "../../components/Diary/Card/SectionCard";

// type PalettePageProps = {}

const PalettePage: FC = () => {
  const { palette, updatePalette } = useSettingsContext();

  const [paletteState, setPaletteState] = useState(palette);

  const day = dayjs().format("d, dddd");
  const month = dayjs().format("MMMM");

  const handleColorSelection = (colors: any, paletteCode: string) => {
    setPaletteState((prev: any) => ({ ...prev, [paletteCode]: colors }));
  };

  const handleApplyChanges = () => {
    updatePalette?.(paletteState);
  };

  useEffect(() => {
    !paletteState && setPaletteState(palette);
  }, [palette, paletteState]);

  if (!palette || !paletteState) {
    return <></>;
  }

  return (
    <MainLayout>
      <Box position="relative">
        <Box mb={2} display="inline-flex" color="#03c9d7">
          <Glyph code="palette" iconType="thin" />
          <Typography variant="h1" component="h3" fontWeight="bold" ml={2}>
            Palettes
          </Typography>
        </Box>

        <Divider />

        <Box mt={4}>
          {Object.keys(palette).map((paletteCode: string) => {
            return (
              <SectionCard title={`${paletteCode} colors`} key={paletteCode}>
                <Box display="flex" mt={2}>
                  <Box minWidth={300}>
                    <ColorCard
                      text={paletteCode}
                      subText={month}
                      colors={paletteState[paletteCode]}
                      paletteCode={paletteCode}
                    />
                  </Box>

                  <Box
                    component={Grid}
                    container
                    spacing={2}
                    display="inline-flex"
                    flexWrap="nowrap"
                    overflow="auto"
                    ml={2}
                  >
                    {availableColors.map((colors) => (
                      <Grid item minWidth={300} key={colors.main}>
                        <ColorCard
                          text={day}
                          subText={month}
                          colors={colors}
                          paletteCode={paletteCode}
                          handleSelect={handleColorSelection}
                        />
                      </Grid>
                    ))}
                  </Box>
                </Box>
              </SectionCard>
            );
          })}
        </Box>
        <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
          <Button variant="contained" onClick={handleApplyChanges}>
            Apply changes
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default PalettePage;

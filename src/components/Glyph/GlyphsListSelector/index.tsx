import React, { FC, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Glyph from "../";
import GlyphButton from "../GlyphButton";
import { useSettingsContext } from "../../../context/SettingsContext";
import useDebounce from "../../../hooks/useDebounce";

type GlyphsListSelectorProps = {
  groupData: any;
  selected?: any;
  colors?: any;
  selectHandler?: (data: any, groupCode: string) => void;
};

const GlyphsListSelector: FC<GlyphsListSelectorProps> = ({
  groupData,
  selected,
  colors,
  selectHandler,
}) => {
  const handleGlyphSelect = useCallback(
    (glyph: any) => {
      const selectedArr = !selected
        ? [glyph.code]
        : selected.includes(glyph.code)
        ? selected.filter((i: any) => i !== glyph.code)
        : [...selected, glyph.code];
      selectHandler?.(selectedArr, groupData.code);
    },
    [groupData.code, selectHandler, selected]
  );

  // @todo debounce mutation
  // const [selectedState, setSelectedState] = useState(selected);
  // const selectedDebounce = useDebounce(selectedState, 2000);
  // useEffect(() => {
  //   selectHandler?.(selectedDebounce, groupData.code);
  // }, [groupData.code, selectHandler, selectedDebounce]);
  // console.log(groupData);
  return (
    <Box display="inline-flex" flexWrap="wrap">
      {groupData.icons.map((glyph: any) => (
        <></>
        // <GlyphButton
        //   key={glyph.code}
        //   p={8}
        //   m={4}
        //   color={glyph?.color || colors?.main}
        //   //selected={selected?.includes(icon.code)}
        //   onClick={() => handleGlyphSelect(glyph)}
        // >
        //   <Glyph
        //     code={glyph.code}
        //     fullWidth
        //     color={glyph?.color || colors?.main}
        //     //selected={selected?.includes(icon.code)}
        //     iconType={selected?.includes(glyph.code) ? "solid" : "thin"}
        //   />
        // </GlyphButton>
      ))}
    </Box>
  );
};

export default GlyphsListSelector;

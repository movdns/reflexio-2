import React, { useCallback, useEffect, useState } from "react";
import GlyphGroup from "./GlyphGroup";
import Section from "../LeftSidebar/Section";
import getGroupByIconCode from "./helpers/getGroupByIconCode";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../../../context/ThemeContext";
import { useDiaryContext } from "../../../context/DiaryContext";

type GlyphProps = {
  data: any[] | null;
  selectedIcons?: string[];
  updateDay?: (icons: any) => void;
};

const Glyphs: React.FC<GlyphProps> = ({ data, selectedIcons, updateDay }) => {
  const [selected, setSelected] = useState(selectedIcons || []);
  const { setPrimaryColoration } = useThemeContext();
  const theme = useTheme();

  const { isDayEditable } = useDiaryContext();

  useEffect(() => {
    selectedIcons && setSelected(selectedIcons);
  }, [selectedIcons]);

  // const selectedIconColor = theme.palette.primary.main;

  const onIconCLickHandler = useCallback(
    (icon: any) => {
      const selectedArr = selected.includes(icon?.code)
        ? selected.filter((i: any) => i !== icon?.code)
        : [...selected, icon?.code];

      const iconGroup = getGroupByIconCode(icon, data);

      iconGroup?.label === "Mood" &&
        icon?.coloration &&
        setPrimaryColoration?.(icon.coloration);

      //  console.log(iconGroup?.label, icon?.coloration);

      if (iconGroup?.singleSelectMode) {
        const excludeIconsObjects = iconGroup.icons.filter(
          (i: any) => i.code !== icon.code
        );
        const excludedIconsSet = new Set(
          excludeIconsObjects.map((i: any) => i.code)
        );
        const includedIcons = selectedArr.filter(
          (x) => x !== icon.code && !excludedIconsSet.has(x)
        );

        const icons = [...includedIcons, icon.code];

        try {
          updateDay?.({ icons: icons, score: icon.score });
          setSelected(icons);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          updateDay?.({ icons: selectedArr });
          setSelected(selectedArr);
        } catch (e) {
          console.log(e);
        }
      }
    },
    [data, selected, setPrimaryColoration, updateDay]
  );

  const sorted = data && data.sort((a, b) => a?.order - b?.order);

  return (
    <>
      {sorted &&
        sorted.map((category: any) => {
          return (
            <Section title={category.label} actions="edit" key={Math.random()}>
              <GlyphGroup
                disabled={!isDayEditable?.()}
                button
                advancedData={category.icons}
                selected={selected}
                onClick={onIconCLickHandler}
                size={category?.size}
                coloration={category?.coloration}
                fullWidth={category?.fullWidth}
                iconType={category?.iconType}
                selectedColor={category?.selectedColor}
                selectedColoration={category?.selectedColoration}
              />
            </Section>
          );
        })}
    </>
  );
};

export default Glyphs;

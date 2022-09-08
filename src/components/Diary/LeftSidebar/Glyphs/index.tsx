import React, { memo, useCallback } from "react";
import GlyphGroup from "./GlyphGroup";
import getGroupByIconCode from "./helpers/getGroupByIconCode";
import { useDiaryContext } from "../../../../context/DiaryContext";
import { TGlyph, TIcon } from "../../../../types";
import SidebarSection from "../../Layout/Sidebar/Section";
import { useThemeContext } from "../../../../context/ThemeContext";
import getDayColorationByScore from "../../../../context/helpers/getDayColorationByScore";

type GlyphProps = {
  groupsData: any[] | null;
  selected?: TIcon[];
};

const Glyphs: React.FC<GlyphProps> = memo(({ groupsData, selected = [] }) => {
  const { isDayEditable, makeDayMutation } = useDiaryContext();
  const { setPrimaryColoration } = useThemeContext();

  const onIconCLickHandler = useCallback(
    (icon: TGlyph) => {
      const selectedArr =
        selected && selected.includes(icon.code)
          ? selected.filter((i: any) => i !== icon?.code)
          : [...selected, icon?.code];

      const iconGroup = getGroupByIconCode(icon, groupsData);

      if (iconGroup?.singleSelectMode) {
        const excludeIconsObjects = iconGroup.icons.filter(
          (i: any) => i.code !== icon.code
        );
        const excludedIconsSet = new Set(
          excludeIconsObjects.map((i: any) => i.code)
        );
        const includedIcons = selectedArr.filter(
          (x: any) => x !== icon.code && !excludedIconsSet.has(x)
        );

        const icons = [...includedIcons, icon.code];

        try {
          //@todo refactor
          makeDayMutation?.({ icons, score: icon.score });
          setPrimaryColoration?.(getDayColorationByScore(icon.score));
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          makeDayMutation?.({ icons: selectedArr });
        } catch (e) {
          console.log(e);
        }
      }
    },
    [selected, groupsData, makeDayMutation, setPrimaryColoration]
  );

  const sorted = groupsData && groupsData.sort((a, b) => a?.order - b?.order);

  return (
    <>
      {sorted &&
        sorted.map((category: any) => {
          return (
            <SidebarSection
              title={category.label}
              // actions="edit"
              key={Math.random()}
            >
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
            </SidebarSection>
          );
        })}
    </>
  );
});

export default Glyphs;

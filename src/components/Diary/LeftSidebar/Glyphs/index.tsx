import React, { memo, useCallback } from "react";
import GlyphGroup from "./GlyphGroup";
import GlyphSection from "./GlyphSection";
import getGroupByIconCode from "./helpers/getGroupByIconCode";
import { useDiaryContext } from "../../../../context/DiaryContext";
import { TGlyph, TIcon } from "../../../../types";

type GlyphProps = {
  groupsData: any[] | null;
  selected?: TIcon[];
};

const Glyphs: React.FC<GlyphProps> = memo(({ groupsData, selected = [] }) => {
  const { isDayEditable, makeDayMutation } = useDiaryContext();

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
          makeDayMutation?.({ icons: icons, score: icon.score });
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
    [groupsData, selected, makeDayMutation]
  );

  const sorted = groupsData && groupsData.sort((a, b) => a?.order - b?.order);

  return (
    <>
      {sorted &&
        sorted.map((category: any) => {
          return (
            <GlyphSection
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
            </GlyphSection>
          );
        })}
    </>
  );
});

export default Glyphs;

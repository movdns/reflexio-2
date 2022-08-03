import React, { useState } from "react";
import GlyphGroup from "./GlyphGroup";
import Section from "../LeftSidebar/Section";
import getGroupByIconCode from "./helpers/getGroupByIconCode";

type GlyphProps = {
  data: any[];
};

const Glyphs: React.FC<GlyphProps> = ({ data }) => {
  const [selected, setSelected] = useState(["face-awesome", "cannabis"]);

  const handleClick = (icon: any) => {
    const selectedArr = selected.includes(icon?.code)
      ? selected.filter((i: any) => i !== icon?.code)
      : [...selected, icon?.code];

    const iconGroup = getGroupByIconCode(icon, data);

    if (iconGroup?.radio) {
      const excludeIconsObjects = iconGroup.icons.filter(
        (i: any) => i.code !== icon.code
      );
      const excludedIconsSet = new Set(
        excludeIconsObjects.map((i: any) => i.code)
      );
      const includedIcons = selectedArr.filter(
        (x) => x !== icon.code && !excludedIconsSet.has(x)
      );

      setSelected([...includedIcons, icon.code]);
    } else {
      setSelected(selectedArr);
    }
  };

  return (
    <>
      {data &&
        data?.map((category: any) => {
          return (
            <Section title={category.label} actions="edit">
              <GlyphGroup
                advancedData={category.icons}
                button
                selected={selected}
                onClick={handleClick}
                // coloration="positive"
              />
            </Section>
          );
        })}
    </>
  );
};

export default Glyphs;

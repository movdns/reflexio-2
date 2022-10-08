import React, { FC, useEffect, useState } from "react";
import TargetItem from "./TargetItem";
import { Box } from "@mui/material";
import Glyph from "../../../Glyph";
import SidebarSection from "../../Card/SectionCard";
import GlyphButton from "../../../Glyph/GlyphButton";
import { TTarget } from "../../../../types";
import { genUniqueId } from "../../../../context/helpers/generateDay";

type TargetListProps = {
  data: TTarget[] | [];
  coloration?: string;
  makeDayMutation?: (data: any) => void;
};

const TargetList: FC<TargetListProps> = ({
  data,
  coloration,
  makeDayMutation,
}) => {
  const [addItemMode, setAddItemMode] = useState(false);
  const [targetCount, setTargetCount] = useState(0);

  const handleItemCreate = (newItem: TTarget) => {
    makeDayMutation?.({ targets: [...data, newItem] });
  };

  const handleItemEdit = (editedItem: TTarget) => {
    makeDayMutation?.({
      targets: [
        ...data.filter((target) => target.id !== editedItem.id),
        editedItem,
      ],
    });
  };

  const handleItemDelete = (id: string) => {
    makeDayMutation?.({
      targets: data.filter((target) => target.id !== id),
    });
  };

  useEffect(() => {
    setTargetCount(data.filter((target: TTarget) => target.selected)?.length);
    !data?.length && setAddItemMode(true);
  }, [data]);

  return (
    <SidebarSection
      title={`Day targets ${
        data?.length ? targetCount + "/" + data.length : ""
      }`}
      actions={
        <GlyphButton onClick={() => setAddItemMode(!addItemMode)}>
          <Glyph
            code="pen"
            size={18}
            iconType={addItemMode ? "solid" : "light"}
          />
        </GlyphButton>
      }
      key={genUniqueId()}
    >
      <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
        {data
          ?.sort((a, b) => a.createdAt - b.createdAt)
          .map((target: TTarget) => (
            <TargetItem
              key={target.id}
              onSave={handleItemEdit}
              onDelete={handleItemDelete}
              {...target}
              coloration={coloration || "neutral"}
            />
          ))}

        {addItemMode && (
          <TargetItem
            editMode
            key={genUniqueId()}
            id={genUniqueId()}
            onSave={handleItemCreate}
            createdAt={new Date().getTime()}
          />
        )}
      </Box>
    </SidebarSection>
  );
};

export default TargetList;

import React, { FC, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Glyph from "../../../LeftSidebar/Glyphs/Glyph";
import GlyphButton from "../../../LeftSidebar/Glyphs/GlyphButton";
import {
  getMainColorByType,
  getContrastColorByType,
} from "../../../../../common/palette";
import { TColoration } from "../../../../../types";

type TargetItemProps = {
  id: string;
  value?: string;
  selected?: boolean;
  editMode?: boolean;
  coloration?: TColoration;
  createdAt?: number;
  onSave?: (data: any) => void;
  onDelete?: (id: string) => void;
};

const TargetItem: FC<TargetItemProps> = ({
  id,
  value,
  selected,
  coloration,
  createdAt,
  editMode: edit,
  onSave,
  onDelete,
}) => {
  const [textValue, setTextValue] = useState(value);
  const [editMode, setEditMode] = useState(edit);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleEditMode = () => {
    // setSelected(false);
    setEditMode(!editMode);
  };

  const handleSave = () => {
    if (!textValue) return false;
    onSave?.({
      id,
      value: textValue,
      // coloration,
      selected,
      createdAt,
    });
    setEditMode(!editMode);
  };

  const handleSelected = (status: boolean) => {
    onSave?.({
      id,
      value: textValue,
      // coloration,
      selected: status,
      createdAt,
    });
  };

  return (
    <Box
      component="li"
      display="flex"
      alignItems="center"
      mb={2}
      sx={{
        transition: "transform 1s ease-in-out",
        borderRadius: 2,
        padding: 1,
        background: "transparent",
        // !editMode && selected
        //   ? `${getMainColorByType(coloration || "positive")}`
        //   : "transparent",
        color: !editMode ? getMainColorByType("positive") : "#808080",
        // !editMode && selected
        //   ? getContrastColorByType(coloration || "positive")
        //   : "#808080",
        outline: !selected || editMode ? "1px dashed #80808050" : "1px solid",
      }}
    >
      <Box mr={2} display="flex">
        <GlyphButton
          onClick={() =>
            editMode ? onDelete?.(id) : handleSelected(!selected)
          }
          color="inherit"
        >
          <Glyph
            code={
              editMode
                ? "trash-can"
                : selected
                ? "bullseye-arrow"
                : "circle-dashed"
            }
            size={20}
            iconType={editMode ? "light" : selected ? "duotone" : "thin"}
          />
        </GlyphButton>
      </Box>
      <Box
        display="flex"
        flexGrow={1}
        sx={{
          textDecoration: selected && !editMode ? "line-through" : "inherit",
        }}
        fontWeight="light"
      >
        {editMode ? (
          <TextField
            variant="standard"
            multiline
            fullWidth
            value={textValue || ""}
            placeholder="What are you planning to do?"
            onChange={handleInputChange}
          />
        ) : (
          <Typography>{textValue}</Typography>
        )}
      </Box>
      <Box ml={1} display="flex">
        <GlyphButton
          onClick={() => (editMode ? handleSave() : handleEditMode())}
          color="inherit"
        >
          <Glyph
            code={editMode ? "circle-check" : "ellipsis-vertical"}
            size={20}
            iconType={editMode ? "light" : "solid"}
            fullWidth
          />
        </GlyphButton>
      </Box>
    </Box>
  );
};

export default TargetItem;

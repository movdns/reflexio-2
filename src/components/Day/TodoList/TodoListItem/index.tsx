import React, { FC } from "react";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";
import { useSettingsContext } from "~/context/SettingsContext";
import TodoListItemSkeleton from "./Skeleton";
import Glyph from "~/components/shared/Glyph";
import { TTodoItem } from "root/types/day";
import dayjs from "dayjs";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type TodoListItemProps = Partial<TTodoItem> & {
  onChange?: (item: TTodoItem) => void;
};

const TodoListItem: FC<TodoListItemProps> = ({
  id,
  text,
  paletteCode,
  createdAt,
  complete,
  onChange,
}) => {
  const { getColorsFromPalette } = useSettingsContext();
  const colors = getColorsFromPalette?.(paletteCode);

  if (!id || !text || !createdAt) {
    return <TodoListItemSkeleton ghost />;
  }

  return (
    <ListItem
      secondaryAction={
        <GlyphButton
          code="trash-xmark"
          size={18}
          iconType="solid"
          p={4}
          onClick={() =>
            onChange?.({
              id,
              text: "",
              paletteCode,
              createdAt,
              complete: !complete,
            })
          }
        />
      }
      disablePadding
    >
      <ListItemButton
        onClick={() =>
          onChange?.({ id, text, paletteCode, createdAt, complete: !complete })
        }
        role={undefined}
        dense
        selected={complete}
        sx={{
          "&.Mui-selected": {
            backgroundColor: `${colors?.main}30`,
            "&:hover": {
              backgroundColor: `${colors?.main}40`,
            },
          },
          "&:hover": {
            backgroundColor: `${colors?.main}40`,
          },
        }}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            checked={complete}
            icon={<Glyph code="circle-dashed" size={28} iconType="thin" />}
            checkedIcon={
              <Glyph
                code="circle-check"
                size={28}
                iconType="duotone"
                color={colors?.main}
              />
            }
          />
        </ListItemIcon>
        <ListItemText
          id="222"
          primary={text}
          secondary={dayjs(createdAt).format("HH:mm")}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoListItem;

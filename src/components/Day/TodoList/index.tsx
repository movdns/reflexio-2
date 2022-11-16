import React, { FC, useCallback, useState } from "react";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";
import TodoListItemSkeleton from "./TodoListItem/Skeleton";
import ColorButton from "~/components/shared/ColorButton";
import getTypeByScore from "~/helpers/getTypeByScore";
import { genUniqueId } from "~/helpers/genUniqueId";
import DiaryCard from "~/components/shared/Card";
import { TTodoItem } from "root/types/day";
import TodoListItem from "./TodoListItem";
import {
  Box,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";

const generateTodoItem = () => ({
  id: genUniqueId(),
  text: "",
  paletteCode: "positive",
  complete: false,
  createdAt: new Date().getTime(),
});

const TodoList: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { getColorsFromPalette, palette } = useSettingsContext();

  const [showColorSelector, setShowColorSelector] = useState(false);
  const [newTodoItem, setNewTodoItem] = useState<TTodoItem>(generateTodoItem());
  const newTodoColors = getColorsFromPalette?.(newTodoItem?.paletteCode);

  const ghostNum = useCallback(() => {
    return day?.todo
      ? day.todo?.length < 5
        ? Math.abs(day.todo?.length - 5)
        : 0
      : 5;
  }, [day?.todo]);

  const calcTotalPoints = (data: TTodoItem[] | undefined): number => {
    return (
      (data &&
        data.reduce<number>((acc, val) => (val?.complete ? ++acc : acc), 0)) ||
      0
    );
  };

  const handleChangeTodo = useCallback(
    (item: TTodoItem) => {
      const dayTodoList: TTodoItem[] | [] = day?.todo || [];

      const query =
        item?.id && !item?.text
          ? [...dayTodoList?.filter((t) => t.id !== item.id)]
          : [...dayTodoList?.filter((t) => t.id !== item.id), item];

      makeDayMutation?.({
        todo: query,
        metrics: {
          ...day?.metrics,
          points: { ...day?.metrics?.points, todo: calcTotalPoints(query) },
        },
      });

      setNewTodoItem(generateTodoItem());
    },
    [day?.metrics, day?.todo, makeDayMutation]
  );

  const handleChangeNewTodoState = (data: Partial<TTodoItem>) => {
    setNewTodoItem((prev) => ({
      ...prev,
      ...data,
    }));
    setShowColorSelector(false);
  };

  if (!day) {
    return <TodoListSkeleton />;
  }

  const colors = getColorsFromPalette?.(
    getTypeByScore(calcTotalPoints(day?.todo))
  );

  return (
    <DiaryCard boxProps={{ p: 3, position: "relative" }} minHeight={0}>
      <Box position="absolute" right={10} top={10}>
        <ColorButton colors={colors} disabled>
          <Typography variant="subtitle1" fontWeight={100} fontSize="0.7rem">
            {calcTotalPoints(day?.todo)}
          </Typography>
        </ColorButton>
      </Box>

      <Box width="100%" pb={1}>
        <Typography variant="h4" mb={2}>
          Todo List
        </Typography>

        <List>
          <ListItem
            disablePadding
            secondaryAction={
              <GlyphButton
                code="check"
                size={18}
                iconType="solid"
                p={4}
                onClick={() => handleChangeTodo(newTodoItem)}
              />
            }
          >
            <ListItemButton
              disableRipple
              role={undefined}
              dense
              sx={{
                position: "relative",
                paddingLeft: 0,
                "&.Mui-focusVisible": {
                  backgroundColor: `${newTodoColors?.main}40`,
                },
              }}
            >
              <ListItemIcon sx={{ paddingX: 0.6, paddingY: 1 }}>
                <GlyphButton
                  onClick={() => setShowColorSelector(!showColorSelector)}
                  variant="transparent"
                  code="circle"
                  iconType="solid"
                  color={newTodoColors?.main}
                  size={28}
                  p={3}
                />
              </ListItemIcon>

              {showColorSelector && palette && (
                <Fade in={showColorSelector} timeout={500}>
                  <Box
                    display="flex"
                    position="absolute"
                    zIndex={999}
                    left={45}
                  >
                    {Object.keys(palette)
                      .filter((code) => code !== newTodoItem.paletteCode)
                      .map((paletteCode) => (
                        <GlyphButton
                          key={genUniqueId()}
                          variant="transparent"
                          code="circle"
                          iconType="solid"
                          color={palette[paletteCode]?.main}
                          size={28}
                          onClick={() =>
                            handleChangeNewTodoState({ paletteCode })
                          }
                        />
                      ))}
                  </Box>
                </Fade>
              )}

              {!showColorSelector && (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  fullWidth
                  color="success"
                  value={newTodoItem.text}
                  onChange={(v) =>
                    handleChangeNewTodoState({ text: v.target.value })
                  }
                  sx={{
                    ".MuiInput-underline:before": {
                      borderBottom: `2px solid #e0e0e0`,
                    },
                    ".MuiInput-underline:after": {
                      borderBottom: `2px solid ${newTodoColors?.main}`,
                    },
                    ".MuiInput-root:hover:not(.Mui-disabled):before": {
                      borderBottom: `2px solid #CCCCCC`,
                    },
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>

          {day?.todo &&
            day.todo
              .sort(
                (a, b) =>
                  b.createdAt - a.createdAt ||
                  Number(b.complete) - Number(a.complete)
              )
              .map((todoItem) => (
                <TodoListItem
                  {...todoItem}
                  key={genUniqueId()}
                  onChange={handleChangeTodo}
                />
              ))}

          {[...Array(ghostNum())].map(() => {
            let id = genUniqueId();
            return <TodoListItem key={id} id={id} />;
          })}
        </List>
      </Box>
    </DiaryCard>
  );
};

export const TodoListSkeleton = ({ ghost }: { ghost?: boolean }) => (
  <DiaryCard boxProps={{ p: 3, position: "relative" }} minHeight={0}>
    <Box position="absolute" right={10} top={10}>
      <ColorButton
        disabled
        colors={{
          main: "#ddd",
          secondary: "white",
          contrastText: "#aaa",
        }}
      >
        <Typography variant="subtitle1" fontWeight={100} fontSize="0.7rem">
          0
        </Typography>
      </ColorButton>
    </Box>

    <Box width="100%" pb={1}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        <Skeleton width={80} />
      </Typography>

      <List>
        {[...Array(5)].map(() => (
          <TodoListItemSkeleton key={genUniqueId()} ghost={ghost} />
        ))}
      </List>
    </Box>
  </DiaryCard>
);

export default TodoList;

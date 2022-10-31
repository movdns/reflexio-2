import React, { FC } from "react";
import Glyph from "~/components/shared/Glyph";
import {
  Box,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";

const TodoListItemSkeleton: FC<{ ghost?: boolean }> = ({ ghost }) => (
  <ListItem disablePadding>
    <ListItemButton
      dense
      role={undefined}
      selected={true}
      sx={{
        "&.Mui-selected": {
          backgroundColor: ghost ? "transparent" : `#eee`,
        },
      }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          tabIndex={-1}
          disableRipple
          checked={false}
          icon={
            <Box ml={0.4}>
              <Glyph
                code={ghost ? "award" : "block-question"}
                size={28}
                iconType="thin"
                color={ghost ? "turquoise" : "#bbb"}
              />
            </Box>
          }
        />
      </ListItemIcon>
      <ListItemText
        id="222"
        primary={<Skeleton width={200} animation={ghost && false} />}
        secondary={<Skeleton width={60} animation={ghost && false} />}
      />
    </ListItemButton>
  </ListItem>
);

export default TodoListItemSkeleton;

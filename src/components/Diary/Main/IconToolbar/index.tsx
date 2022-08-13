import React, { useEffect, useState } from "react";
import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import AddIcon from "@mui/icons-material/Add";
import iconMock, { TIcon } from "../../../../__mock__/icons";
import { TDay } from "../../../../types";
import SkeletonCard from "../../Skeleton/Card";
import palette from "../../../../common/palette";
import { useDiaryContext } from "../../../../context/DiaryContext";
import { useTheme } from "@mui/material/styles";

type ToolbarProps = { icons?: any; loading: boolean; score?: number };

const IconToolbar: React.FC<ToolbarProps> = ({ icons, loading, score }) => {
  const { updateDayState } = useDiaryContext();
  const theme = useTheme();

  //console.log("icons", icons);
  //const [selected, setSelected] = useState<any>(icons ? icons : []);

  useEffect(() => {
    // setSelected(icons);
    console.log(icons);
  }, [icons]);

  const handleSelectIcon = (code: string) => {
    updateDayState?.({
      icons: icons.includes(code)
        ? icons.filter((i: any) => i !== code)
        : [...icons, code],
    });
    // setSelected(
    //   selected.includes(code)
    //     ? selected.filter((i: any) => i !== code)
    //     : [...selected, code]
    // );
  };

  if (loading) {
    return <SkeletonCard height={64} />;
  }

  const color =
    (score &&
      (score > 8
        ? "special"
        : score > 6
        ? "positive"
        : score === 5
        ? "neutral"
        : "negative")) ||
    "neutral";

  return (
    <Box
      py={1}
      display="flex"
      flexWrap="wrap"
      justifyContent="start"
      alignItems="center"
      width="100%"
      height="100%"
    >
      {iconMock.map((icon: any) => (
        <span key={Math.random()}>
          <Tooltip title={icon.alias}>
            <IconButton
              // size="large"
              onClick={() => handleSelectIcon(icon.code)}
              sx={{
                margin: 1,
                // color:
                //   color === "neutral"
                //     ? palette.neutral.contrastText
                //     : "white",

                outline:
                  icons && icons.length && icons.includes(icon.code)
                    ? "1px solid"
                    : "none",
                borderRadius: 3,
                color: palette[color].main,
              }}
              //  color="primary"
            >
              <icon.component sx={{ fontSize: "1.6em" }} />
            </IconButton>
          </Tooltip>
        </span>
      ))}

      <span>
        <IconButton size="large" sx={{ color: "gray" }} disabled>
          <AddIcon />
        </IconButton>
      </span>
    </Box>
  );
};

export default IconToolbar;

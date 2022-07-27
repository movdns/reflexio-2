import React, { useEffect, useState } from "react";
import { Box, Card, IconButton, Tooltip } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import AddIcon from "@mui/icons-material/Add";
import iconMock, { TIcon } from "../../../../__mock__/icons";
import { TDay } from "../../../../types";

type ToolbarProps = { icons?: any };

const IconToolbar: React.FC<ToolbarProps> = ({ icons }) => {
  //console.log("icons", icons);
  const [selected, setSelected] = useState<any>(icons ? icons : []);

  // useEffect(() => {
  //   selected !== icons && setSelected(icons);
  // }, [icons, selected]);

  //console.log(selected);

  const handleSelectIcon = (code: string) => {
    setSelected(
      selected.includes(code)
        ? selected.filter((i: any) => i !== code)
        : [...selected, code]
    );
  };

  return (
    <Card>
      <Box
        p={1}
        display="flex"
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        height="100%"
      >
        {iconMock.map((icon: any) => (
          <span key={Math.random()}>
            <Tooltip title={icon.alias}>
              <IconButton
                size="large"
                onClick={() => handleSelectIcon(icon.code)}
                sx={{
                  // color: "white",
                  outline:
                    selected && selected.length && selected.includes(icon.code)
                      ? "1px solid"
                      : "none",
                }}
                color="primary"
              >
                <icon.component />
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
    </Card>
  );
};

export default IconToolbar;

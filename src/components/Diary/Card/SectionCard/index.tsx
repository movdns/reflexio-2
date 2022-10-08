import React, { FC } from "react";
import { Box, Card, Typography, CardContent } from "@mui/material";

type SectionProps = {
  title?: string;
  actions?: any;
  children: any;
  minHeight?: number;
  p?: number;
};

const SectionCard: FC<SectionProps> = ({
  title,
  actions,
  p,
  children,
  minHeight,
}) => {
  return (
    <Box>
      <Card>
        <Box p={p || 3} minHeight={minHeight}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pb={2}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#363638",
                fontSize: "1.125rem",
                fontWeight: "700",
                textTransform: "capitalize",
              }}
            >
              {title}
            </Typography>
            {actions}
          </Box>
          {children}
        </Box>
      </Card>
    </Box>
  );
};

export default SectionCard;

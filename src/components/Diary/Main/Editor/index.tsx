import React from "react";
import { createReactEditorJS } from "react-editor-js";
import tools from "./tools";
import { Box, Card, Grid } from "@mui/material";
import SkeletonCard from "../../Skeleton/Card";

type EditorProps = {
  description?: any;
  loading: boolean;
};

const Editor: React.FC<EditorProps> = ({ loading, description }) => {
  const ReactEditorJS = createReactEditorJS();

  if (loading) {
    return (
      <Box component={Grid} item lg={3} display={{ xs: "none", lg: "block" }}>
        <SkeletonCard height={500} />
      </Box>
    );
  }

  return (
    <>
      <Card>
        <Box p={4} minHeight={500}>
          <ReactEditorJS
            tools={tools}
            value={description}
            defaultValue={description}
            minHeight={360}
            onChange={(r) => console.log(r)}
          />
        </Box>
      </Card>
    </>
  );
};

export default Editor;

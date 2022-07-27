import React from "react";
import { createReactEditorJS } from "react-editor-js";
import { OutputData } from "@editorjs/editorjs";
import dayjs from "dayjs";
import tools from "./tools";
import { Box, Card } from "@mui/material";

type EditorProps = {
  description?: any;
};

const Editor: React.FC<EditorProps> = ({ description }) => {
  const ReactEditorJS = createReactEditorJS();

  const initialData = {
    time: Date.now(),
    blocks: [
      {
        id: "date",
        type: "header",
        data: {
          text: dayjs().format("D MMMM, dddd"),
          level: 1,
        },
      },
    ],
  };

  return (
    <>
      <Card>
        <Box p={4}>
          <ReactEditorJS tools={tools} defaultValue={initialData} />
        </Box>
      </Card>
    </>
  );
};

export default Editor;

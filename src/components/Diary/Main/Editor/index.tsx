import React, { useEffect, useState } from "react";
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
  // const { updateDayState } = useDiaryContext();

  const [editorValue, setEditorValue] = useState(description);

  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance: any) => {
    editorCore.current = instance;
  }, []);

  const handleChanges = React.useCallback(async () => {
    // @ts-ignore
    const savedData = await editorCore?.current?.save?.();
    // console.log(savedData);
    setEditorValue(savedData);
    //savedData && updateDayState?.({ description: savedData });
  }, []);

  useEffect(() => {
    // console.log(description);
    //editorValue !== description && setEditorValue(description);
  }, [description]);

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
            inlineToolbar={true}
            onInitialize={handleInitialize}
            tools={tools}
            //value={editorValue}
            defaultValue={description}
            minHeight={500}
            onChange={handleChanges}
          />
        </Box>
      </Card>
    </>
  );
};

export default Editor;

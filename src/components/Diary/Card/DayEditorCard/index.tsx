import React, { FC, useEffect, useState } from "react";
import { useDiaryContext } from "../../../../context/DiaryContext";
import SkeletonCard from "../SkeletonCard";
import {
  Grid,
  Card,
  Box,
  Button,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import Editor from "../../Editor";
import Glyph from "../../../Glyph";
import usePrompt from "../../../../hooks/usePrompt";
import hash from "object-hash";
import { Descendant } from "slate";

const initialEditorValue = [
  {
    children: [
      {
        text: " ",
      },
    ],
    type: "paragraph",
  },
];

const DayEditorCard: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const description = day?.description || initialEditorValue;

  //useEffect(() => {}, [description]);

  const [isValueSynced, setIsValueSynced] = useState<boolean>(true);
  const [editorValue, setEditorValue] = useState<Descendant[]>(
    description || initialEditorValue
  );

  const handleSave = () => {
    !isValueSynced && makeDayMutation?.({ description: editorValue });
  };

  useEffect(() => {
    // makeDayMutation?.({ description: debounceValue });
    // setSynced(hash(debounceValue) === hash(data));
    setIsValueSynced(hash(description) === hash(editorValue));
  }, [description, editorValue]);

  usePrompt(
    "You have unsaved changes here, do you want to leave?",
    hash(description) !== hash(editorValue)
  );

  if (!description) {
    return (
      <Grid container gap={4} direction="column">
        <SkeletonCard height={500} />
      </Grid>
    );
  }
  return (
    <>
      <Card>
        <CardHeader
          component={Box}
          p={0}
          title="Few words about your day :)"
          action={
            <Button
              variant="contained"
              endIcon={<Glyph code="paper-plane" iconType="solid" />}
              onClick={handleSave}
            >
              Save changes
            </Button>
          }
        />
        <Box px={3} mb={2}>
          <TextField
            rows={10}
            multiline
            fullWidth
            // variant="filled"
            inputProps={{
              style: {
                lineHeight: 2,
              },
            }}
          />
          {/*<Editor value={description} showToolBar onChange={setEditorValue} />*/}
        </Box>
      </Card>
    </>
  );
};

export default DayEditorCard;

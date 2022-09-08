import React, { FC, useEffect, useMemo, useState } from "react";
import { ReactEditor, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import SlateBody from "./SlateBody";
import { useDiaryContext } from "../../../../context/DiaryContext";
import hash from "object-hash";
import usePrompt from "../../../../hooks/usePrompt";

type EditorProps = {
  data: Descendant[];
  readonly?: boolean;
  showToolBar?: boolean;
};

const Editor: FC<EditorProps> = ({ data, readonly, showToolBar }) => {
  const { makeDayMutation } = useDiaryContext();

  const slate = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );

  const [value, setValue] = useState(data);
  slate.children = value;

  const [synced, setSynced] = useState(true);

  // const debounceValue = useDebounce(value, 2000);

  const handleSave = () => {
    !synced && makeDayMutation?.({ description: value });
  };

  usePrompt(
    "You have unsaved changes here, do you want to leave?",
    hash(value) !== hash(data)
  );

  useEffect(() => {
    // makeDayMutation?.({ description: debounceValue });
    // setSynced(hash(debounceValue) === hash(data));
    setSynced(hash(value) === hash(data));
  }, [value, data]);

  useEffect(() => {
    setValue((currentValue) => {
      // Reset editor selection (caret) when getting new data props
      if (currentValue !== data) {
        slate.selection = null;
      }
      return data;
    });
  }, [data, slate]);

  return (
    <>
      <Slate editor={slate} value={value} onChange={(value) => setValue(value)}>
        <SlateBody
          editor={slate}
          readonly={readonly}
          showToolBar={showToolBar}
          handleSave={handleSave}
          isSynced={synced}
        />
      </Slate>
    </>
  );
};

export default Editor;

import React, { FC, useEffect, useMemo, useState } from "react";
import { ReactEditor, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import SlateBody from "./SlateBody";
import { useDiaryContext } from "../../../context/DiaryContext";
import hash from "object-hash";
import usePrompt from "../../../hooks/usePrompt";

type EditorProps = {
  value: Descendant[];
  onChange?: (data: any) => void;
  readonly?: boolean;
  showToolBar?: boolean;
};

const Editor: FC<EditorProps> = ({
  value,
  readonly,
  showToolBar,
  onChange,
}) => {
  const slate = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );

  //const [value, setValue] = useState(data);
  slate.children = value;

  // const [synced, setSynced] = useState(true);

  // const debounceValue = useDebounce(value, 2000);

  // const handleSave = () => {
  //   !synced && makeDayMutation?.({ description: value });
  // };

  useEffect(() => {
    onChange?.((currentValue: any) => {
      console.log(currentValue);
      // Reset editor selection (caret) when getting new data props
      if (currentValue !== value) {
        slate.selection = null;
      }
      return value;
    });
  }, [value, slate, onChange]);

  return (
    <Slate editor={slate} value={value} onChange={(value) => onChange?.(value)}>
      <SlateBody
        editor={slate}
        readonly={readonly}
        showToolBar={showToolBar}
        handleSave={() => console.log("dd")}
        // isSynced={synced}
      />
    </Slate>
  );
};

export default Editor;

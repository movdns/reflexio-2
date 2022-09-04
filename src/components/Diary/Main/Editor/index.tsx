import React, { FC, useEffect, useMemo, useState } from "react";
import { ReactEditor, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import SlateBody from "./SlateBody";
import { useDiaryContext } from "../../../../context/DiaryContext";
import hash from "object-hash";

const Editor: FC<{
  data: any[];
  readonly?: boolean;
  showToolBar?: boolean;
}> = ({ data, readonly, showToolBar }) => {
  const { makeDayMutation } = useDiaryContext();

  const slate = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );

  const [value, setValue] = useState(data);
  slate.children = value;
  // const debounceValue = useDebounce(value, 2000);

  const [synced, setSynced] = useState(true);

  const handleSave = () => {
    !synced && makeDayMutation?.({ description: value });
  };

  useEffect(() => {
    // makeDayMutation?.({ description: debounceValue });
    // setSynced(debounceValue === data);
    setSynced(hash(value) === hash(data));
  }, [value, data]);

  useEffect(() => {
    setValue((currentValue) => {
      /**
       * We need to reset selection only for real remote updates
       * In case of direct update currentValue will be updated before remote,
       * so they will be equal.
       */
      if (currentValue !== data) {
        slate.selection = null;
      }
      return data;
    });
  }, [data, slate]);

  return (
    <>
      <Slate
        editor={slate}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      >
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

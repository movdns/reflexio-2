import React, { useState } from "react";
import {
  Plate,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  TEditableProps,
  createPlugins,
  createPlateUI,
  ELEMENT_CODE_BLOCK,
} from "@udecode/plate";
import { Box, Card } from "@mui/material";
import { MyValue, MyParagraphElement, MyPlatePlugin } from "./types";

const plateUI = createPlateUI({
  // disabled for the sandbox as prismjs is throwing an error sometimes
  [ELEMENT_CODE_BLOCK]: null as any,
});

const plugins = createPlugins<MyValue>(
  [
    createParagraphPlugin(),
    createBlockquotePlugin(),
    // createCodeBlockPlugin({
    //   // You can either pass a component per plugin
    //   component: CodeBlockElement,
    // }),
    createHeadingPlugin(),

    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
  ],
  {
    // Or pass all components at once
    components: plateUI,
  }
);

const initialValue = [
  {
    type: "p",
    children: [
      {
        text: "This is editable plain text with react and history plugins, just like a <textarea>!",
      },
    ],
  } as MyParagraphElement,
];

export const editableProps: TEditableProps<MyValue> = {
  spellCheck: false,
  autoFocus: false,
  readOnly: false,
  placeholder: "Type…",
};

const Description = () => {
  const [debugValue, setDebugValue] = useState<MyValue | null>(null);

  console.log(debugValue);

  return (
    <Card>
      <Box p={4} minHeight={500}>
        <Plate<MyValue>
          editableProps={editableProps}
          initialValue={initialValue}
          plugins={plugins}
          onChange={(newValue) => {
            setDebugValue(newValue);
          }}
        />
      </Box>
    </Card>
  );
};

export default Description;

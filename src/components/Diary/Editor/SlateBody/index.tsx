import React, { useCallback, FC } from "react";
import isHotkey from "is-hotkey";
import { Editable, ReactEditor, useSlate } from "slate-react";
import { Box, Divider, ToggleButton } from "@mui/material";
import Glyph from "../../../Glyph";
import {
  Editor as SlateEditor,
  Element as SlateElement,
  Transforms,
} from "slate";
import GlyphButton from "../../../Glyph/GlyphButton";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+m": "highlight",
  "mod+`": "code",
  "mod+enter": "save",
  "mod+s": "save",
};

// @todo TS
const SlateBody: FC<{
  editor: ReactEditor;
  readonly?: boolean;
  showToolBar?: boolean;
  handleSave: () => void;
  isSynced?: boolean;
}> = ({ editor, readonly, showToolBar, handleSave, isSynced }) => {
  const ToolButton = ({
    format,
    icon,
    isMark,
  }: {
    format: string;
    icon: string;
    isMark?: boolean;
  }) => {
    const editor = useSlate();
    return (
      <ToggleButton
        value={Math.random()}
        selected={
          isMark
            ? isMarkActive(editor, format)
            : isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
              )
        }
        sx={{ width: 36, height: 36, border: "none" }}
        onClick={() =>
          isMark ? toggleMark(editor, format) : toggleBlock(editor, format)
        }
      >
        <Glyph code={icon} size={14} iconType="duotone" />
      </ToggleButton>
    );
  };

  const renderElement = useCallback(
    (
      props: JSX.IntrinsicAttributes & {
        attributes: any;
        children: any;
        element: any;
      }
    ) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (
      props: JSX.IntrinsicAttributes & {
        attributes: any;
        children: any;
        leaf: any;
      }
    ) => <Leaf {...props} />,
    []
  );

  return (
    <Box position="relative" width="100%">
      <Editable
        style={{ minHeight: 300 }}
        readOnly={readonly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Few words about your`s day!"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              // @ts-ignore
              const mark = HOTKEYS[hotkey];
              mark === "save" ? handleSave() : toggleMark(editor, mark);
            }
          }
        }}
      />
      {/*<Box position="absolute" right={0} top={-14}>*/}
      {/*  <GlyphButton*/}
      {/*    onClick={handleSave}*/}
      {/*    disabled={isSynced}*/}
      {/*    selected={!isSynced}*/}
      {/*    selectedColor="turquoise"*/}
      {/*    p={6}*/}
      {/*  >*/}
      {/*    <Glyph*/}
      {/*      code={isSynced ? "floppy-disk" : "paper-plane"}*/}
      {/*      size={20}*/}
      {/*      iconType="solid"*/}
      {/*      fullWidth*/}
      {/*      color={isSynced ? "turquoise" : "inherit"}*/}
      {/*    />*/}
      {/*  </GlyphButton>*/}
      {/*</Box>*/}

      <Box
        p={1}
        display="flex"
        visibility={readonly || !showToolBar ? "hidden" : "visible"}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{
          background: "#f7f7f7",
          borderRadius: 2,
        }}
      >
        <ToolButton isMark={true} format="bold" icon="bold" />
        <ToolButton isMark={true} format="italic" icon="italic" />
        <ToolButton isMark={true} format="underline" icon="underline" />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToolButton format="heading-one" icon="1" />
        <ToolButton format="heading-two" icon="2" />
        <ToolButton format="heading-three" icon="3" />
        <ToolButton format="heading-four" icon="4" />

        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToolButton format="numbered-list" icon="list-ol" />
        <ToolButton format="bulleted-list" icon="list-ul" />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToolButton format="left" icon="align-left" />
        <ToolButton format="center" icon="align-center" />
        <ToolButton format="justify" icon="align-justify" />
        <ToolButton format="right" icon="align-right" />

        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToolButton format="code" icon="code" />
        {/*<BlockButton format="block-quote" icon="quotes" />*/}
        <ToolButton isMark={true} format="highlight" icon="highlighter" />
      </Box>
    </Box>
  );
};

// @ts-ignore
const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case "heading-four":
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};
// @ts-ignore
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.highlight) {
    children = (
      <i style={{ color: "black", background: "yellow" }}>{children}</i>
    );
  }

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

// @ts-ignore
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    SlateEditor.removeMark(editor, format);
  } else {
    SlateEditor.addMark(editor, format, true);
  }
};
// @ts-ignore
const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    SlateEditor.nodes(editor, {
      at: SlateEditor.unhangRange(editor, selection),
      match: (n) =>
        !SlateEditor.isEditor(n) &&
        SlateElement.isElement(n) &&
        // @ts-ignore
        n[blockType] === format,
    })
  );

  return !!match;
};
// @ts-ignore
const isMarkActive = (editor, format) => {
  const marks = SlateEditor.marks(editor);
  // @ts-ignore
  return marks ? marks[format] === true : false;
};
// @ts-ignore
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !SlateEditor.isEditor(n) &&
      SlateElement.isElement(n) &&
      // @ts-ignore
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      // @ts-ignore
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      // @ts-ignore
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export default SlateBody;

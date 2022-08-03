// @ts-ignore
import Embed from "@editorjs/embed";
// @ts-ignore
import Table from "@editorjs/table";
// @ts-ignore
import List from "@editorjs/list";

// @ts-ignore
import Warning from "@editorjs/warning";

// @ts-ignore
import Code from "@editorjs/code";

// @ts-ignore
import LinkTool from "@editorjs/link";

// @ts-ignore
import Image from "@editorjs/image";

// @ts-ignore
import Raw from "@editorjs/raw";

// @ts-ignore
import Header from "@editorjs/header";

// @ts-ignore
import Quote from "@editorjs/quote";

// @ts-ignore
import Marker from "@editorjs/marker";

// @ts-ignore
import CheckList from "@editorjs/checklist";

// @ts-ignore
import Delimiter from "@editorjs/delimiter";

// @ts-ignore
import InlineCode from "@editorjs/inline-code";

// @ts-ignore
import SimpleImage from "@editorjs/simple-image";

// @ts-ignore
// import ColorPlugin from "editorjs-text-color-plugin";

const tools = {
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,

  // Color: {
  //   class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
  //   config: {
  //     colorCollections: [
  //       "#EC7878",
  //       "#9C27B0",
  //       "#673AB7",
  //       "#3F51B5",
  //       "#0070FF",
  //       "#03A9F4",
  //       "#00BCD4",
  //       "#4CAF50",
  //       "#8BC34A",
  //       "#CDDC39",
  //       "#FFF",
  //     ],
  //     defaultColor: "#FF1300",
  //     type: "text",
  //   },
  // },
};

export default tools;

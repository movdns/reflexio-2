import React, { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import DayItem from "~/components/TimelineView/DayList/DayItem";
import dayjs from "dayjs";
import { genUniqueId } from "~/helpers/genUniqueId";
import image from "~/common/assets/images/post1.jpg";

type DayListProps = {};

export type TagT = {
  label?: string;
  type?: "emoji" | "glyph";
  icon?: string;
};

export type MomentsT = {
  color?: string;
  tag?: TagT;
  image?: any;
  description?: string;
  createdAt?: any;
};

export type DayT = {
  date: any;
  color?: string;

  tag?: TagT;
  moments: MomentsT[];
};

const daysData: DayT[] = [
  {
    date: dayjs().subtract(1, "d"),
    // color: "#d70382",
    tag: {
      label: "Not logged",
      type: "glyph",
      icon: "question",
    },
    moments: [],
  },
  {
    date: dayjs(),
    color: "#cd5c5c",
    tag: {
      label: "Regular day",
      type: "glyph",
      icon: "face-melting",
    },
    moments: [
      {
        color: "#000",
        tag: {
          label: "Бавовна!",
          type: "emoji",
          icon: "🔥",
        },
        createdAt: dayjs().subtract(7, "minutes"),
      },

      {
        description: "Lol kek",
        color: "#000",
        tag: {
          label: "New word",
          type: "glyph",
          icon: "typewriter",
        },
        createdAt: dayjs().subtract(4, "minutes"),
      },
      {
        color: "#000",
        tag: {
          label: "New",
          type: "glyph",
          icon: "typewriter",
        },
        image: image,
        createdAt: dayjs().subtract(4, "minutes"),
      },
      {
        description: "Something amazing happen",
        color: "#9370db",
        tag: {
          label: "Miracle",
          type: "glyph",
          icon: "wand-magic-sparkles",
        },
        createdAt: dayjs().subtract(10, "minutes"),
      },
      {
        color: "#2e8b57",
        tag: {
          label: 'Take delivery"',
          type: "glyph",
          icon: "truck-fast",
        },
        createdAt: dayjs().subtract(35, "minutes"),
      },
      {
        createdAt: dayjs().subtract(1, "hour"),
        color: "#f0b391",

        tag: {
          label: "So fucking work!",
          type: "glyph",
          icon: "face-melting",
        },
      },
    ],
  },
  {
    date: dayjs().subtract(2, "d"),
    color: "#da70d6",
    tag: {
      label: "Day #3",
      type: "glyph",
      icon: "face-relieved",
    },
    moments: [
      {
        color: "#00bfff",
        tag: {
          label: "Coffee",
          type: "glyph",
          icon: "cup-togo",
        },
        createdAt: dayjs().subtract(2, "minutes"),
      },
      {
        description: "Lol kek 1",
        color: "#000",
        tag: {
          label: "New word",
          type: "glyph",
          icon: "typewriter",
        },
        createdAt: dayjs().subtract(4, "minutes"),
      },
      {
        color: "#00bfff",
        tag: {
          label: "Coffee",
          type: "glyph",
          icon: "cup-togo",
        },
        createdAt: dayjs().subtract(5, "minutes"),
      },
      {
        description: "Something amazing happen",
        color: "#da70d6",
        tag: {
          label: "Miracle",
          type: "glyph",
          icon: "wand-magic-sparkles",
        },
        createdAt: dayjs().subtract(10, "minutes"),
      },
      {
        color: "#e86464",
        tag: {
          label: "Take delivery",
          type: "glyph",
          icon: "truck-fast",
        },
        createdAt: dayjs().subtract(35, "minutes"),
      },
      {
        createdAt: dayjs().subtract(1, "hour"),
        color: "#f0b391",

        tag: {
          label: "So fucking work!",
          type: "glyph",
          icon: "face-melting",
        },
      },
    ],
  },
  {
    date: dayjs().subtract(3, "d"),
    color: "#f0b391",
    tag: {
      label: "Day #4",
      type: "glyph",
      icon: "face-smile-hearts",
    },
    moments: [
      {
        description: "Lol kek 2",
        color: "#000",
        tag: {
          label: "New word",
          type: "glyph",
          icon: "poo",
        },
        createdAt: dayjs().subtract(4, "minutes"),
      },
      {
        description: "Something amazing happen",
        color: "#f0b391",
        tag: {
          label: "Miracle",
          type: "glyph",
          icon: "wand-magic-sparkles",
        },
        createdAt: dayjs().subtract(10, "minutes"),
      },
      {
        color: "#2e8b57",
        tag: {
          label: 'Take delivery"',
          type: "glyph",
          icon: "truck-fast",
        },
        createdAt: dayjs().subtract(35, "minutes"),
      },
      {
        createdAt: dayjs(1669166128),
        color: "#f0b391",
        tag: {
          label: "So fucking work!",
          type: "glyph",
          icon: "face-melting",
        },
      },
    ],
  },
  {
    date: dayjs().subtract(4, "d"),
    color: "#40e0d0",
    tag: {
      label: "Meh..",
      type: "glyph",
      icon: "face-confused",
    },

    moments: [
      {
        description: "Lol kek 3",
        color: "#000",
        tag: {
          label: "New word",
          type: "glyph",
          icon: "typewriter",
        },
        createdAt: dayjs().subtract(4, "minutes"),
      },
      {
        description: "Something amazing happen",
        color: "#f0b391",
        tag: {
          label: "Miracle",
          type: "glyph",
          icon: "wand-magic-sparkles",
        },
        createdAt: dayjs().subtract(10, "minutes"),
      },
      {
        color: "#40e0d0",
        tag: {
          label: 'Take delivery"',
          type: "glyph",
          icon: "truck-fast",
        },
        createdAt: dayjs().subtract(35, "minutes"),
      },
      {
        createdAt: dayjs().subtract(1, "hour"),
        color: "#f0b2c1",

        tag: {
          label: "So fucking work!",
          type: "glyph",
          icon: "face-melting",
        },
      },
    ],
  },
];

const DayList: FC<DayListProps> = () => {
  return (
    <Grid container spacing={3} direction="column">
      {daysData
        .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
        .map((dayData) => (
          <DayItem key={genUniqueId()} {...dayData} />
        ))}
    </Grid>
  );
};

export default DayList;

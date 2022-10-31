import React, { FC, useEffect, useState } from "react";
import { useTheme } from "@nivo/core";
import {
  ComputedDatum,
  ResponsiveSunburst,
  SunburstCustomLayerProps,
} from "@nivo/sunburst";

type DaySummaryPieProps = {
  data?: any;
  readonly?: boolean;
};

const DaySummaryPie: FC<DaySummaryPieProps> = ({ data, readonly }) => {
  const [pieDataState, setPieDataState] = useState(data || placeholderData);

  useEffect(() => {
    // // data !== pieDataState && setPieDataState(data);
    // if (typeof data === "undefined") {
    //   setPieDataState(placeholderData);
    // } else if (data) {
    data && data !== pieDataState && setPieDataState(data);
    // }
  }, [data, pieDataState]);

  return (
    <ResponsiveSunburst
      data={pieDataState}
      // margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
      id="name"
      value="val"
      cornerRadius={6}
      borderWidth={6}
      borderColor="white"
      enableArcLabels={false}
      isInteractive={!readonly}
      arcLabel={(e) => {
        // return e.id + " (" + e.value + ")";
        return ((10 / 100) * e.percentage).toFixed(1);
      }}
      layers={["arcs", "arcLabels", CenteredMetricSunburst]}
      childColor={{
        from: "color",
        modifiers: [["brighter", 0.4]],
      }}
      onMouseEnter={() => {}}
      colors={{ datum: "data.color" }}
      arcLabelsSkipAngle={30}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 1.4]],
      }}
      tooltip={CustomTooltip}
      onClick={(clickedData) => {
        const foundObject = findObject(flatten(data.children), clickedData.id);
        if (foundObject && foundObject.children) {
          setPieDataState(foundObject);
        }
      }}
    />
  );
};

const placeholderData = {
  name: "placeholderPieData",
  children: [
    {
      name: "positive",
      color: "#bebebe",
      children: [
        {
          name: "positive_mood",
          val: 5.5,
        },
        {
          name: "positive_glyphs",
          val: 5.5,
        },
        {
          name: "positive_tags",
          val: 5.5,
        },
      ],
    },
    {
      name: "negative",
      color: "#bebebe",
      children: [
        {
          name: "negative_health",
          val: 5.5,
        },
        {
          name: "negative_tags",
          val: 5.5,
        },
        {
          name: "negative_glyphs",
          val: 5.5,
        },
      ],
    },
    {
      name: "neutral",
      color: "#bebebe",
      children: [
        {
          name: "neutral_motivation",
          val: 5.5,
        },
        {
          name: "neutral_tags",
          val: 5.5,
        },
        {
          name: "neutral_glyphs",
          val: 5.5,
        },
      ],
    },
  ],
};

const CenteredMetricSunburst = ({
  nodes,
  centerX,
  centerY,
}: SunburstCustomLayerProps<any>) => {
  // const total = nodes.reduce((total, datum) => total + datum.value, 0);
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "60px",
        fontWeight: 600,
      }}
    >
      {/*{((10 / 100) * total).toFixed(1)}*/}
    </text>
  );
};

const CustomTooltip = ({ id, value, color, data }: ComputedDatum<any>) => {
  const theme = useTheme();

  return (
    <p
      style={{
        ...theme.tooltip.container,
        background: color,
        borderRadius: 6,
        padding: 10,
      }}
    >
      <b style={{ textTransform: "capitalize" }}> {data?.label || id}:</b>{" "}
      {value} score
    </p>
  );
};

const flatten = (data: any) =>
  data.reduce((acc: any, item: any) => {
    if (item.children) {
      return [...acc, item, ...flatten(item.children)];
    }

    return [...acc, item];
  }, []);

const findObject = (data: any, name: any) =>
  data.find((searchedName: any) => searchedName.name === name);

export default DaySummaryPie;

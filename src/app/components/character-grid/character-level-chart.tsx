"use client";

import { CharacterWithLevelRecords } from "@/app/api/update-characters/types/character";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config.cjs";
import { useMemo } from "react";
import { formatClassName } from "@/helpers/format-character-name";
import { DateTime } from "luxon";
import { times } from "lodash-es";
import { useMediaQuery } from "react-responsive";

const fullConfig = resolveConfig(tailwindConfig);

export const CharacterLevelChart = ({
  character,
}: {
  character: CharacterWithLevelRecords;
}) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 512px)" });

  const formattedClass = useMemo(
    () => formatClassName(character.class),
    [character.class],
  );

  const data = character.levelRecords.map((levelRecord) => ({
    level: levelRecord.level,
    timestamp: levelRecord.timestamp,
  }));

  const xAxisDomain = [
    DateTime.now().minus({ weeks: 1 }).valueOf(),
    DateTime.now().valueOf(),
  ];

  const xAxisTicks = times(8, (index) =>
    DateTime.now()
      .minus({ days: index * 2 })
      .valueOf(),
  ).filter((_, i) => isBigScreen || i % 2 === 0);

  return (
    <div className="h-44 w-full p-2 sm:px-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            right: 8,
            left: -36,
          }}
        >
          <XAxis
            dataKey="timestamp"
            type="number"
            scale="time"
            domain={xAxisDomain}
            tickFormatter={(unixTime) =>
              DateTime.fromMillis(unixTime).toFormat("dd")
            }
            tick={{ fontSize: 12 }}
            ticks={xAxisTicks}
          />
          <YAxis dataKey="level" domain={[0, 60]} tick={{ fontSize: 12 }} />
          <Tooltip
            // @ts-ignore
            content={<CustomTooltip />}
          />
          <Line
            type="monotoneX"
            dataKey="level"
            // @ts-ignore
            stroke={fullConfig.theme?.colors[formattedClass] as string}
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: {
    value: number;
  }[];
  label: Date;
}) => {
  if (active && payload && payload.length) {
    const timestamp = DateTime.fromJSDate(label);
    const formattedTimestamp = timestamp.toFormat("MMMM dd, HH:mm");

    return (
      <div className="rounded-md bg-white bg-opacity-80 p-2 text-center text-base text-gray-800">
        <p className="text-xs">{formattedTimestamp}</p>
        <p className="text-xs">Level {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

"use client";
import Image from "next/image";
import { CharacterWithLevelRecords } from "@/app/api/update-characters/types/character";
import { useMemo } from "react";
import { CharacterLevelChart } from "./character-level-chart";
import { formatClassName } from "@/helpers/format-character-name";
import { DateTime, Settings } from "luxon";
import { ClockIcon } from "@heroicons/react/24/solid";

Settings.defaultLocale = "es";

export const CharacterCard = ({
  character,
}: {
  character: CharacterWithLevelRecords;
}) => {
  const { name, level, imageURL } = character;
  const formattedClass = useMemo(
    () => formatClassName(character.class),
    [character.class],
  );

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl bg-[#272a30] transition-all">
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-center justify-between p-2">
          <div className="flex flex-col px-2 pt-2">
            <span className="text-lg font-semibold leading-none text-white sm:tracking-wide">
              {name}
            </span>

            <span className={`text-${formattedClass}`}>
              {character.class} {level}
            </span>

            <span className="mt-1 flex items-center gap-1 text-xs text-gray-400">
              <ClockIcon height={12} className="mb-0.5" />
              Última conexión{" "}
              {DateTime.fromJSDate(character.lastLogin).toRelative()}
            </span>
          </div>

          <Image
            src={imageURL || `https://cataas.com/cat`}
            width={64}
            height={64}
            className="rounded-md"
            alt=""
          />
        </div>

        <CharacterLevelChart character={character} />
      </div>

      {/* {character.levelingScore > 3 && (
        <div className="absolute right-0 top-0 flex flex-col items-center p-1 sm:p-2">
          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-800 sm:px-3">
            🔥
            <span className="ml-1 hidden sm:inline">HOT</span>
          </span>
        </div>
      )} */}
    </div>
  );
};

"use client";
import Image from "next/image";
import { CharacterWithLevelRecords } from "@/app/api/update-characters/types/character";
import { useMemo } from "react";
import { CharacterLevelChart } from "./character-level-chart";
import { formatClassName } from "@/helpers/format-character-name";

export const CharacterCard = ({
  character,
}: {
  character: CharacterWithLevelRecords;
}) => {
  const { name, level, imageURL, levelerName } = character;
  const formattedClass = useMemo(
    () => formatClassName(character.class),
    [character.class]
  );

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl bg-[#272a30] transition-all">
      <div className="relative h-28 rounded-t-xl sm:h-32">
        <Image
          src={imageURL || `https://cataas.com/cat`}
          fill
          className="top-[20%] object-cover object-center"
          alt=""
          sizes="100%"
        />
        <div className="absolute bottom-0 h-1/2 w-full bg-transparent bg-gradient-to-b from-transparent to-[#272a30]" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="px-2 sm:p-4">
          <div className="flex flex-wrap justify-between gap-x-1 font-semibold text-white">
            <span className="sm:tracking-wide">{name}</span>
            <span>{level}</span>
          </div>
          <div className="flex justify-between gap-x-1 text-sm text-gray-400">
            <span>{levelerName}</span>
            <span className={`text-${formattedClass}`}>{character.class}</span>
          </div>
        </div>

        <CharacterLevelChart character={character} />
      </div>

      {character.levelingScore > 3 && (
        <div className="absolute right-0 top-0 flex flex-col items-center p-1 sm:p-2">
          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-800 sm:px-3">
            🔥
            <span className="ml-1 hidden sm:inline">HOT</span>
          </span>
        </div>
      )}
    </div>
  );
};

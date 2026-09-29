"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionary";

const ink = "#0f380f";

const palettes = {
  charmander: {
    k: ink,
    o: "#e07028",
    d: "#a04018",
    c: "#f8e0a0",
    f: "#f8d030",
    r: "#e03030",
  },
  squirtle: {
    k: ink,
    b: "#3880e0",
    n: "#183868",
    w: "#f8f8f0",
    s: "#e8c878",
    t: "#a07030",
  },
  bulbasaur: {
    k: ink,
    g: "#48a038",
    d: "#206018",
    l: "#90d850",
    p: "#c8e888",
    e: "#f8f8f0",
  },
} as const;

const sprites = {
  charmander: [
    "................",
    "......kkkk......",
    ".....koooook....",
    ".....kooeeok....",
    ".....koooook....",
    "......kooook....",
    ".....kooccok....",
    "....koooooook...",
    "....koodoookk...",
    ".....kkkk.kfk...",
    ".......k..krk...",
    ".......k.frrk...",
    ".......k..ffk...",
    ".......kkkk.....",
    "................",
    "................",
  ],
  squirtle: [
    "................",
    ".....kkkkkk.....",
    "....kbbbbbbk....",
    "....kbbeeebk....",
    "....kbbbbbbk....",
    ".....kwwwwk.....",
    "....kkkkkbbk....",
    "...ksttkkbbk....",
    "...kstttkbbk....",
    "...kstttkbbk....",
    "....ktttkbbk....",
    ".....kkkkkk.....",
    "......k..k......",
    "......k..k......",
    ".....kk..kk.....",
    "................",
  ],
  bulbasaur: [
    "......llll......",
    ".....llggll.....",
    "......llll......",
    ".......kk.......",
    ".....kkggkk.....",
    "....kggeeegk....",
    "....kggggggk....",
    "...kkggpggkk....",
    "...kgggggggk....",
    "...kggdggdgk....",
    "....kkkkkkk.....",
    ".....k.k.k......",
    ".....k.k.k......",
    "....kk.kk.kk....",
    "................",
    "................",
  ],
} as const;

type StarterId = keyof typeof sprites;

const order: StarterId[] = ["charmander", "squirtle", "bulbasaur"];

function PixelMon({ id }: { id: StarterId }) {
  const rows = sprites[id];
  const palette = palettes[id] as Record<string, string>;
  const cells: { x: number; y: number; fill: string }[] = [];
  rows.forEach((row, y) => {
    row.split("").forEach((cell, x) => {
      if (cell === ".") return;
      const fill = cell === "e" ? "#181818" : palette[cell];
      if (!fill) return;
      cells.push({ x, y, fill });
    });
  });

  return (
    <svg viewBox="0 0 16 16" className="h-16 w-16 [image-rendering:pixelated]" aria-hidden="true">
      <rect width="16" height="16" fill="#9bbc0f" />
      {cells.map((cell) => (
        <rect key={`${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width="1" height="1" fill={cell.fill} />
      ))}
    </svg>
  );
}

export function StarterPick({ copy }: { copy: Dictionary }) {
  const [choice, setChoice] = useState<StarterId | null>(null);
  const good = choice === "charmander" || choice === "squirtle";
  const bad = choice === "bulbasaur";

  return (
    <div className="space-y-3">
      <p>{copy.dex.starterPrompt}</p>
      <div className="grid grid-cols-3 gap-2">
        {order.map((id) => {
          const selected = choice === id;
          const motion = selected && good ? "dex-happy" : selected && bad ? "dex-bad" : "";
          return (
            <button
              key={id}
              type="button"
              onClick={() => setChoice(id)}
              className={`border-[3px] border-[#0f380f] px-1 py-1 ${selected ? "bg-[#0f380f] text-[#9bbc0f]" : "bg-[#9bbc0f]"}`}
            >
              <span className={`mx-auto block w-fit bg-[#9bbc0f] ${motion}`}>
                <PixelMon id={id} />
              </span>
              <span className="mt-1 block text-center font-[family-name:var(--font-pixel)] text-[10px] capitalize">
                {id}
              </span>
            </button>
          );
        })}
      </div>
      {choice ? (
        <p className={`border-[3px] border-[#0f380f] px-2 py-2 text-xl leading-6 ${bad ? "dex-flash-bad" : "dex-flash-good"}`}>
          {good ? copy.dex.starterGood : copy.dex.starterBad}
        </p>
      ) : null}
      {choice ? (
        <button
          type="button"
          onClick={() => setChoice(null)}
          className="font-[family-name:var(--font-pixel)] text-[11px] underline"
        >
          {copy.dex.starterAgain}
        </button>
      ) : null}
    </div>
  );
}

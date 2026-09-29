function hash(seed: string) {
  let h = 2166136261;
  for (const char of seed) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function next(state: { n: number }) {
  state.n = Math.imul(state.n ^ (state.n >>> 15), 2246822519) >>> 0;
  state.n = Math.imul(state.n ^ (state.n >>> 13), 3266489917) >>> 0;
  return state.n / 4294967296;
}

export function Sprite({ seed }: { seed: string }) {
  const state = { n: hash(seed) };
  const rows = 7;
  const half = 4;
  const bits: boolean[][] = [];
  for (let y = 0; y < rows; y += 1) {
    const row: boolean[] = [];
    for (let x = 0; x < half; x += 1) {
      row.push(next(state) > 0.4);
    }
    bits.push(row);
  }

  const cells: { x: number; y: number; shade: string }[] = [];
  bits.forEach((row, y) => {
    row.forEach((on, x) => {
      if (!on) return;
      const shade = next(state) > 0.55 ? "#9bbc0f" : "#8bac0f";
      cells.push({ x, y, shade });
      if (x !== half - 1) cells.push({ x: 6 - x, y, shade });
    });
  });

  return (
    <svg viewBox="0 0 7 7" className="h-14 w-14 [image-rendering:pixelated]" aria-hidden="true">
      <rect width="7" height="7" fill="#0f380f" />
      {cells.map((cell) => (
        <rect key={`${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width="1" height="1" fill={cell.shade} />
      ))}
    </svg>
  );
}

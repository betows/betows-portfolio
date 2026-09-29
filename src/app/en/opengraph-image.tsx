import { ImageResponse } from "next/og";

export const alt = "Roberto Amaral — landing pages and systems that convert";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function EnglishOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3EFE6",
          padding: 72,
          color: "#2A2A2A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "#4D8DFF",
            }}
          />
          betows
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 650, lineHeight: 1.05, maxWidth: 960 }}>
            Landing pages and systems that convert.
          </div>
          <div style={{ fontSize: 28, color: "#6D675F", maxWidth: 760 }}>
            Roberto Amaral · full-stack developer · Brazil
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 220,
            height: 48,
            borderRadius: 999,
            background: "#E7F08C",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          github.com/betows
        </div>
      </div>
    ),
    size,
  );
}

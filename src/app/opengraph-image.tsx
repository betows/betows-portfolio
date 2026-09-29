import { ImageResponse } from "next/og";

export const alt = "betowdex — Roberto Amaral, landing pages e sistemas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#14090c",
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: 36,
            background: "#d62828",
            padding: 36,
          }}
        >
          <div style={{ display: "flex", color: "white", fontSize: 28 }}>betowdex</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: "#07182c",
              borderRadius: 18,
              padding: 36,
              color: "#e7f4ff",
            }}
          >
            <div style={{ fontSize: 22, color: "#7fd3ff" }}>Nº 000 · perfil</div>
            <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.05 }}>
              Landing pages e sistemas que convertem.
            </div>
            <div style={{ fontSize: 24, color: "#8eb4d4" }}>Roberto Amaral · Brasil</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

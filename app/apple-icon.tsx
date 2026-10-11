import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The "IH" monogram from icon.svg, drawn as boxes so it renders without a font.
const bars = [
  { left: 34, top: 39, width: 20, height: 102 },
  { left: 73, top: 39, width: 20, height: 102 },
  { left: 127, top: 39, width: 20, height: 102 },
  { left: 73, top: 80, width: 74, height: 20 },
];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#1b3ce3" }}>
        {bars.map((bar) => (
          <div key={`${bar.left}-${bar.top}`} style={{ position: "absolute", background: "#f5f7fa", ...bar }} />
        ))}
      </div>
    ),
    size,
  );
}

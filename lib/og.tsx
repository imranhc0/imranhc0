import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Hex equivalents of the light theme tokens; Satori does not understand oklch().
const color = {
  paper: "#f5f7fa",
  ink: "#12161f",
  ink2: "#484d58",
  ink3: "#646972",
  accent: "#1b3ce3",
};

/** Fetches a subset of Archivo at build time. Falls back to the default font when offline. */
async function loadArchivo(text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@118,750&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const font = await fetch(src);
    return font.ok ? font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

interface OgCardProps {
  kicker: string;
  title: string;
  footer: string;
}

export async function renderOgImage({ kicker, title, footer }: OgCardProps) {
  const font = await loadArchivo(`${kicker}${title}${footer}${profile.name}`);
  const titleSize = title.length > 48 ? 68 : title.length > 26 ? 84 : 112;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: color.paper,
          color: color.ink,
          fontFamily: font ? "Archivo" : "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 22,
            borderBottom: `2px solid ${color.ink}`,
            fontSize: 26,
            color: color.ink3,
          }}
        >
          <span>{kicker}</span>
          <span style={{ color: color.ink }}>{profile.name}</span>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 1000,
            fontSize: titleSize,
            lineHeight: 1,
            letterSpacing: "-0.035em",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, color: color.ink2 }}>
          <div style={{ width: 30, height: 30, background: color.accent }} />
          <span>{footer}</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: font ? [{ name: "Archivo", data: font, weight: 700, style: "normal" }] : undefined,
    },
  );
}

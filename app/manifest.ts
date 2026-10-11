import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} · ${profile.role}`,
    short_name: "Imran Hossen",
    description: profile.description,
    start_url: "/",
    display: "browser",
    background_color: "#f5f7fa",
    theme_color: "#f5f7fa",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

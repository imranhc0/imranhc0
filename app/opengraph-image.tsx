import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { profile } from "@/lib/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: `${profile.currentTitle} · ${profile.utcOffset}`,
    title: profile.name,
    footer: "Microservices, event-driven systems, security SaaS. Open to roles in Europe.",
  });
}

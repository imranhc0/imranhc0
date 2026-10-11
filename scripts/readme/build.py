#!/usr/bin/env python3
"""Generate the artwork for the GitHub profile README (.github/readme/*.svg).

All text is converted to vector outlines, because GitHub's image proxy blocks web fonts.
Every image is written in a light and a dark variant for <picture> elements.

    python3 -m venv .venv
    .venv/bin/pip install -r scripts/readme/requirements.txt
    .venv/bin/python scripts/readme/build.py

Edit the CONTENT section below, then re-run. Fragment Mono is downloaded from Google Fonts
on the first run and cached in scripts/readme/.cache/.
"""

from __future__ import annotations

import io
import re
import urllib.request
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / ".github" / "readme"
CACHE = Path(__file__).resolve().parent / ".cache"
ARCHIVO = ROOT / "app" / "fonts" / "archivo-latin-var.woff2"
MONO_CSS = "https://fonts.googleapis.com/css2?family=Fragment+Mono"

# ---------------------------------------------------------------- CONTENT

SITE = "imranhc0.vercel.app"
LOCATION = "Dhaka · UTC+6"
KICKER = "Team Lead, Software Engineering · Pipeline Co., Ltd"
NAME = ("Md Imran", "Hossen")
ROLE = "Full-Stack Engineer & Team Lead"
TAGLINE = "Cybersecurity SaaS · API-first microservices"
CORE_STACK = "Node.js · Python · TypeScript · React · Kafka · PostgreSQL"
FACTS = [
    ("CURRENT ROLE", ["Team Lead, Software Engineering", "Pipeline Co., Ltd"]),
    ("EXPERIENCE", ["3.5+ years in production", "Promoted twice in three years"]),
    ("OPEN TO", ["Roles in Europe", "Relocation or remote, CET overlap"]),
]
CARDS = [
    {
        "slug": "risksensor",
        "title": "RiskSensor",
        "domain": "Attack surface",
        "summary": ["External attack-surface and", "supply-chain risk platform"],
        "role": "Backend architecture · full-stack",
        "stack": "Django · Express · Go · PostgreSQL · Pinecone",
    },
    {
        "slug": "threatidr",
        "title": "ThreatIDR",
        "domain": "DNS security",
        "summary": ["Blocks malware, phishing and C2", "at the DNS layer, before connection"],
        "role": "Backend engineer",
        "stack": "Flask · Celery · TimescaleDB · WebSockets",
    },
]
CONTACT = {
    "headline": ("Hiring in Europe?", "Let’s talk."),
    "email": "imranhosein.cse@gmail.com",
    "details": ["Dhaka, Bangladesh · UTC+6", "Relocation or remote", "References on request"],
}

# The site's light and dark tokens, as hex.
PALETTES = {
    "light": dict(paper="#f5f7fa", ink="#12161f", ink2="#484d58", ink3="#646972", line="#d5d7dd",
                  accent="#1b3ce3", signal="#e62e1e", band="#1938d7", on_band="#f5f7fa"),
    "dark": dict(paper="#0d0f15", ink="#e8ebf1", ink2="#b0b4bc", ink3="#888c94", line="#2a2e35",
                 accent="#85a6ff", signal="#fa6b52", band="#122caa", on_band="#f3f5f9"),
}

# ---------------------------------------------------------------- TYPE


def num(value: float, digits: int = 2) -> str:
    text = f"{value:.{digits}f}".rstrip("0").rstrip(".")
    return "0" if text in ("-0", "") else text


class Font:
    """A static font that shapes text with HarfBuzz and returns glyph outlines."""

    count = 0

    def __init__(self, tt: TTFont):
        Font.count += 1
        self.id = f"f{Font.count}"
        buffer = io.BytesIO()
        tt.flavor = None
        tt.save(buffer)
        data = buffer.getvalue()
        self.tt = TTFont(io.BytesIO(data))
        self.upm = self.tt["head"].unitsPerEm
        self.glyphs = self.tt.getGlyphSet()
        self.order = self.tt.getGlyphOrder()
        self.hb = hb.Font(hb.Face(data))

    def _shape(self, text: str):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hb, buf, {"kern": True, "liga": True})
        return buf.glyph_infos, buf.glyph_positions

    def width(self, text: str, size: float, tracking: float = 0.0) -> float:
        _, positions = self._shape(text)
        units = sum(p.x_advance for p in positions) + tracking * self.upm * (len(positions) - 1)
        return units * size / self.upm

    def layout(self, text: str, tracking: float = 0.0):
        """Glyph names with x/y offsets in font units, plus the total advance."""
        infos, positions = self._shape(text)
        cursor, placed = 0.0, []
        for info, pos in zip(infos, positions):
            placed.append((self.order[info.codepoint], cursor + pos.x_offset, pos.y_offset))
            cursor += pos.x_advance + tracking * self.upm
        return placed

    def outline(self, glyph: str) -> str:
        pen = SVGPathPen(self.glyphs, ntos=num)
        self.glyphs[glyph].draw(pen)
        return pen.getCommands()


def archivo(weight: float, width: float) -> Font:
    return Font(instantiateVariableFont(TTFont(ARCHIVO), {"wght": weight, "wdth": width}))


def fragment_mono() -> Font:
    CACHE.mkdir(exist_ok=True)
    cached = CACHE / "FragmentMono-Regular.ttf"
    if not cached.exists():
        css = urllib.request.urlopen(MONO_CSS).read().decode()
        url = re.search(r"url\((https://[^)]+\.ttf)\)", css).group(1)
        cached.write_bytes(urllib.request.urlopen(url).read())
    return Font(TTFont(cached))


DISPLAY = archivo(760, 122)
SEMI = archivo(620, 108)
BODY = archivo(400, 100)
MONO = fragment_mono()


class Doc:
    """One SVG file. Each glyph outline is defined once in <defs> and placed with <use>."""

    def __init__(self):
        self.defs: dict[str, str] = {}

    def text(self, font: Font, value: str, x: float, y: float, size: float, fill: str, tracking: float = 0.0,
             anchor: str = "start", max_width: float | None = None, extra: str = "") -> str:
        width = font.width(value, size, tracking)
        if max_width is not None:
            assert width <= max_width, f"{value!r} is {width:.0f}px wide, limit {max_width}px"
        x -= width if anchor == "end" else width / 2 if anchor == "middle" else 0
        scale = size / font.upm
        uses = []
        for glyph, gx, gy in font.layout(value, tracking):
            ref = f"{font.id}-{font.order.index(glyph)}"
            if ref not in self.defs:
                outline = font.outline(glyph)
                if not outline:
                    continue  # spaces and other empty glyphs
                self.defs[ref] = f'<path id="{ref}" d="{outline}"/>'
            if ref in self.defs:
                y_attr = f' y="{num(gy)}"' if gy else ""
                uses.append(f'<use href="#{ref}" x="{round(gx)}"{y_attr}/>')
        return (f'<g transform="translate({num(x)} {num(y)}) scale({num(scale, 6)} {num(-scale, 6)})" '
                f'fill="{fill}"{extra}>{"".join(uses)}</g>')

    def svg(self, width: int, height: int, title: str, body: str) -> str:
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" '
            f'height="{height}" role="img" aria-label="{title}"><title>{title}</title>'
            "<style>@media (prefers-reduced-motion: reduce){.packet,.flash{display:none}}</style>"
            f'<defs>{"".join(self.defs.values())}</defs>{body}</svg>\n'
        )


def dots(pattern_id: str, color: str, opacity: float = 0.14) -> str:
    return (
        f'<pattern id="{pattern_id}" width="14" height="14" patternUnits="userSpaceOnUse">'
        f'<circle cx="1" cy="1" r="0.8" fill="{color}" opacity="{opacity}"/></pattern>'
    )


def arrow(x: float, y: float, color: str) -> str:
    return (f'<path d="M{num(x)} {num(y)}h13M{num(x + 9)} {num(y - 4)}l4 4-4 4" fill="none" '
            f'stroke="{color}" stroke-width="1.5"/>')


# ---------------------------------------------------------------- DNS FIGURE
# Same geometry and timing as components/dns-figure.tsx, in a 420 x 312 box.

COL, ROW, BOX = [62, 210, 358], [46, 156, 266], (94, 42)
CYCLE, QUERY_MOVE = 8, 3.0
STEP_X, STEP_Y = COL[1] - COL[0], ROW[1] - ROW[0]
AT_POLICY = (STEP_X + STEP_Y) / (2 * STEP_X + STEP_Y) * QUERY_MOVE
NODES = [
    (0, 0, "client", "endpoint", False), (1, 0, "resolver", "dns :53", False), (2, 0, "feeds", "threat intel", False),
    (0, 1, "sinkhole", "nxdomain", False), (1, 1, "policy", "allow / block", True), (2, 1, "upstream", "recursive", False),
    (0, 2, "store", "timescaledb", False), (1, 2, "workers", "celery", False), (2, 2, "dashboard", "websocket", False),
]
QUERIES = [(0, "allow"), (0.8, "allow"), (1.5, "block"), (2.3, "allow"), (3.1, "allow"), (3.9, "allow"),
           (4.6, "block"), (5.4, "allow"), (6.2, "allow"), (7.1, "block")]


def motion(path: str, begin: float, move: float) -> str:
    return (f'<animateMotion path="{path}" begin="{begin:.2f}s" dur="{CYCLE}s" keyPoints="0;1;1" '
            f'keyTimes="0;{move / CYCLE:.3f};1" calcMode="linear" repeatCount="indefinite"/>')


def dns_figure(doc: Doc, p: dict, ox: float, oy: float) -> str:
    left = lambda c: COL[c] - BOX[0] / 2
    right = lambda c: COL[c] + BOX[0] / 2
    top = lambda r: ROW[r] - BOX[1] / 2
    bottom = lambda r: ROW[r] + BOX[1] / 2
    mid_x = (COL[0] + COL[1]) / 2 - COL[0]
    edges = [
        (f"M{right(0)} {ROW[0]}H{left(1)}", "query", COL[0] + mid_x, ROW[0] - 6, "middle", False),
        (f"M{COL[1]} {bottom(0)}V{top(1)}", None, 0, 0, "middle", False),
        (f"M{COL[2]} {bottom(0)}V100H{COL[1] + 22}V{top(1)}", "rules", 296, 94, "middle", True),
        (f"M{right(1)} {ROW[1]}H{left(2)}", "allow", COL[1] + mid_x, ROW[1] - 6, "middle", False),
        (f"M{left(1)} {ROW[1]}H{right(0)}", "block", COL[0] + mid_x, ROW[1] - 6, "middle", False),
        (f"M{COL[1]} {bottom(1)}V{top(2)}", "event", COL[1] + 7, (bottom(1) + top(2)) / 2 + 4, "start", False),
        (f"M{left(1)} {ROW[2]}H{right(0)}", "write", COL[0] + mid_x, ROW[2] - 6, "middle", False),
        (f"M{right(1)} {ROW[2]}H{left(2)}", "push", COL[1] + mid_x, ROW[2] - 6, "middle", False),
    ]
    out = [f'<g transform="translate({num(ox)} {num(oy)})">',
           f'<defs>{dots("fig-dots", p["ink"])}<marker id="fig-arrow" viewBox="0 0 8 8" refX="8" refY="4" '
           f'markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8z" fill="{p["ink3"]}"/></marker></defs>',
           '<rect width="420" height="312" fill="url(#fig-dots)"/>']
    for d, label, lx, ly, anchor, control in edges:
        dash = ' stroke-dasharray="3 3"' if control else ""
        out.append(f'<path d="{d}" fill="none" stroke="{p["ink3"]}" stroke-width="1"{dash} marker-end="url(#fig-arrow)"/>')
        if label:
            out.append(doc.text(MONO, label, lx, ly, 10, p["ink3"], anchor=anchor))
    # Packets sit underneath the boxes, so they appear to enter and leave each service.
    for begin, verdict in QUERIES:
        color = p["accent"] if verdict == "allow" else p["signal"]
        dx = STEP_X if verdict == "allow" else -STEP_X
        out.append(f'<circle class="packet" cx="{COL[0]}" cy="{ROW[0]}" r="4" fill="{color}">'
                   f'{motion(f"M0 0h{STEP_X}v{STEP_Y}h{dx}", begin, QUERY_MOVE)}</circle>')
        for leg in (-STEP_X, STEP_X):
            out.append(f'<rect class="packet" x="{COL[1] - 2.5}" y="{ROW[1] - 2.5}" width="5" height="5" fill="{p["ink"]}">'
                       f'{motion(f"M0 0v{STEP_Y}h{leg}", begin + AT_POLICY, AT_POLICY)}</rect>')
    diamond = f"{COL[2]},{ROW[0] - 4} {COL[2] + 4},{ROW[0]} {COL[2]},{ROW[0] + 4} {COL[2] - 4},{ROW[0]}"
    out.append(f'<polygon class="packet" points="{diamond}" fill="{p["ink"]}">'
               f'{motion(f"M0 0v{100 - ROW[0]}h{COL[1] + 22 - COL[2]}v{ROW[1] - 100}", 5.4, 2.6)}</polygon>')
    for c, r, label, sub, core in NODES:
        fill, fg, sub_fg = (p["ink"], p["paper"], p["paper"]) if core else (p["paper"], p["ink"], p["ink3"])
        out.append(f'<rect x="{left(c)}" y="{top(r)}" width="{BOX[0]}" height="{BOX[1]}" fill="{fill}" stroke="{p["ink"]}"/>')
        out.append(doc.text(MONO, label, COL[c], ROW[r] - 2, 13, fg, anchor="middle", max_width=BOX[0] - 6))
        out.append(doc.text(MONO, sub, COL[c], ROW[r] + 12, 10.5, sub_fg, anchor="middle", max_width=BOX[0] - 6,
                        extra=' opacity="0.75"' if core else ""))
    for begin, verdict in QUERIES:
        if verdict == "block":
            t = QUERY_MOVE / CYCLE
            out.append(f'<rect class="flash" x="{left(0)}" y="{top(1)}" width="{BOX[0]}" height="{BOX[1]}" fill="none" '
                       f'stroke="{p["signal"]}" stroke-width="2" opacity="0"><animate attributeName="opacity" '
                       f'values="0;0;1;0;0" keyTimes="0;{t - 0.001:.3f};{t:.3f};{t + 0.11:.3f};1" begin="{begin}s" '
                       f'dur="{CYCLE}s" repeatCount="indefinite"/></rect>')
    out.append("</g>")
    return "".join(out)


# ---------------------------------------------------------------- ARTWORK


def banner(p: dict) -> str:
    doc, (W, H, pad) = Doc(), (960, 520, 32)
    out = [f'<rect width="{W}" height="{H}" fill="{p["paper"]}"/>',
           doc.text(MONO, SITE, pad, 26, 12.5, p["ink"]),
           doc.text(MONO, LOCATION, W - pad, 26, 12.5, p["ink3"], anchor="end"),
           f'<path d="M0 40.5H{W}" stroke="{p["line"]}"/>',
           doc.text(MONO, KICKER, pad, 82, 12.5, p["ink3"], max_width=450)]
    # Name lockup with the accent full stop, as on the site.
    out.append(doc.text(DISPLAY, NAME[0], pad - 2, 164, 76, p["ink"], tracking=-0.045, max_width=450))
    out.append(doc.text(DISPLAY, NAME[1], pad - 2, 238, 76, p["ink"], tracking=-0.045, max_width=430))
    dot_x = pad - 2 + DISPLAY.width(NAME[1], 76, -0.045) + 2
    out.append(f'<rect x="{num(dot_x)}" y="222" width="15" height="15" fill="{p["accent"]}"/>')
    out.append(doc.text(SEMI, ROLE, pad, 292, 21, p["ink"], tracking=-0.01, max_width=450))
    out.append(doc.text(BODY, TAGLINE, pad, 320, 17, p["ink2"], max_width=450))
    out.append(doc.text(MONO, CORE_STACK, pad, 382, 12, p["ink3"], max_width=450))
    # Figure panel.
    out.append(f'<rect x="496.5" y="56.5" width="431" height="344" fill="{p["paper"]}" stroke="{p["ink"]}"/>')
    out.append(doc.text(MONO, "FIG. 01", 512, 78, 12, p["ink"]))
    out.append(doc.text(MONO, "dns firewall · simplified", 912, 78, 12, p["ink3"], anchor="end"))
    out.append(f'<path d="M497 88.5H928" stroke="{p["ink"]}"/>')
    out.append(dns_figure(doc, p, 502, 88))
    # Spec strip.
    out.append(f'<path d="M0 416.5H{W}" stroke="{p["ink"]}"/>')
    col_w = (W - 2 * pad) / len(FACTS)
    for i, (label, lines) in enumerate(FACTS):
        x = pad + i * col_w + (16 if i else 0)
        if i:
            out.append(f'<path d="M{num(pad + i * col_w)} 417V{H}" stroke="{p["line"]}"/>')
        out.append(doc.text(MONO, label, x, 448, 11.5, p["ink3"], tracking=0.06))
        for j, line in enumerate(lines):
            out.append(doc.text(BODY, line, x, 476 + j * 22, 16, p["ink"], max_width=col_w - 24))
    out.append(f'<rect x="0.5" y="0.5" width="{W - 1}" height="{H - 1}" fill="none" stroke="{p["ink"]}"/>')
    return doc.svg(W, H, "Md Imran Hossen, Full-Stack Engineer and Team Lead", "".join(out))


def card(p: dict, index: int, c: dict) -> str:
    doc, (W, H, pad) = Doc(), (480, 260, 22)
    out = [f'<defs>{dots("card-dots", p["ink"], 0.11)}</defs>',
           f'<rect width="{W}" height="{H}" fill="{p["paper"]}"/>',
           f'<rect x="250" y="39" width="{W - 251}" height="174" fill="url(#card-dots)"/>',
           doc.text(MONO, f"CASE STUDY · {index:02d}", pad, 25, 11.5, p["ink3"], tracking=0.06),
           doc.text(MONO, c["domain"].upper(), W - pad, 25, 11.5, p["ink3"], tracking=0.06, anchor="end"),
           f'<path d="M0 38.5H{W}" stroke="{p["ink"]}"/>',
           doc.text(DISPLAY, c["title"], pad - 1, 102, 46, p["ink"], tracking=-0.04, max_width=W - 2 * pad)]
    for j, line in enumerate(c["summary"]):
        out.append(doc.text(BODY, line, pad, 138 + j * 22, 16, p["ink2"], max_width=W - 2 * pad))
    out.append(doc.text(MONO, c["role"], pad, 196, 12, p["ink"], max_width=W - 2 * pad))
    out.append(f'<path d="M0 213.5H{W}" stroke="{p["line"]}"/>')
    out.append(doc.text(MONO, c["stack"], pad, 241, 11.5, p["ink3"], max_width=330))
    label_w = SEMI.width("Case study", 14)
    out.append(doc.text(SEMI, "Case study", W - pad - 20, 241, 14, p["accent"], anchor="end"))
    out.append(arrow(W - pad - 14, 236.5, p["accent"]))
    out.append(f'<rect x="0.5" y="0.5" width="{W - 1}" height="{H - 1}" fill="none" stroke="{p["ink"]}"/>')
    assert label_w < 100
    return doc.svg(W, H, f"{c['title']} case study", "".join(out))


def contact(p: dict) -> str:
    doc, (W, H, pad) = Doc(), (960, 240, 32)
    fg = p["on_band"]
    out = [f'<rect width="{W}" height="{H}" fill="{p["band"]}"/>',
           doc.text(MONO, "CONTACT", pad, 44, 11.5, fg, tracking=0.06, extra=' opacity="0.75"'),
           doc.text(DISPLAY, CONTACT["headline"][0], pad - 1, 104, 44, fg, tracking=-0.04, max_width=560),
           doc.text(DISPLAY, CONTACT["headline"][1], pad - 1, 152, 44, fg, tracking=-0.04, max_width=560),
           doc.text(BODY, CONTACT["email"], pad, 204, 21, fg)]
    email_w = BODY.width(CONTACT["email"], 21)
    out.append(f'<rect x="{pad}" y="210" width="{num(email_w)}" height="1" fill="{fg}" opacity="0.5"/>')
    for j, line in enumerate(CONTACT["details"]):
        out.append(doc.text(MONO, line, W - pad, 104 + j * 24, 12.5, fg, anchor="end", extra=' opacity="0.85"'))
    out.append(doc.text(BODY, SITE, W - pad, 204, 16, fg, anchor="end"))
    return doc.svg(W, H, "Hiring in Europe? Let's talk. " + CONTACT["email"], "".join(out))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for mode, palette in PALETTES.items():
        files = {f"banner-{mode}.svg": banner(palette), f"contact-{mode}.svg": contact(palette)}
        for i, c in enumerate(CARDS, start=1):
            files[f"card-{c['slug']}-{mode}.svg"] = card(palette, i, c)
        for name, content in files.items():
            (OUT / name).write_text(content)
            print(f"{name:32} {len(content) / 1024:6.1f} KB")


if __name__ == "__main__":
    main()

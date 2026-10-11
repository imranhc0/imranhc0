/**
 * Hero figure: a simplified DNS firewall request path, animated with SMIL so it
 * needs no JavaScript. Packets render underneath the node boxes, so they appear
 * to enter and leave each service. Hidden under prefers-reduced-motion.
 */

const CYCLE = 8; // seconds; every packet repeats on the same cycle
const COL = [62, 210, 358];
const ROW = [46, 156, 266];
const BOX = { w: 94, h: 42 };
const left = (col: number) => COL[col] - BOX.w / 2;
const right = (col: number) => COL[col] + BOX.w / 2;
const top = (row: number) => ROW[row] - BOX.h / 2;
const bottom = (row: number) => ROW[row] + BOX.h / 2;

const nodes = [
  { x: COL[0], y: ROW[0], label: "client", sub: "endpoint" },
  { x: COL[1], y: ROW[0], label: "resolver", sub: "dns :53" },
  { x: COL[2], y: ROW[0], label: "feeds", sub: "threat intel" },
  { x: COL[0], y: ROW[1], label: "sinkhole", sub: "nxdomain" },
  { x: COL[1], y: ROW[1], label: "policy", sub: "allow / block", core: true },
  { x: COL[2], y: ROW[1], label: "upstream", sub: "recursive" },
  { x: COL[0], y: ROW[2], label: "store", sub: "timescaledb" },
  { x: COL[1], y: ROW[2], label: "workers", sub: "celery" },
  { x: COL[2], y: ROW[2], label: "dashboard", sub: "websocket" },
];

const gapX = (COL[0] + COL[1]) / 2 - COL[0]; // label offset between two columns

const edges = [
  { d: `M${right(0)} ${ROW[0]} H${left(1)}`, label: "query", lx: COL[0] + gapX, ly: ROW[0] - 6 },
  { d: `M${COL[1]} ${bottom(0)} V${top(1)}` },
  {
    d: `M${COL[2]} ${bottom(0)} V100 H${COL[1] + 22} V${top(1)}`,
    label: "rules",
    lx: 296,
    ly: 94,
    control: true,
  },
  { d: `M${right(1)} ${ROW[1]} H${left(2)}`, label: "allow", lx: COL[1] + gapX, ly: ROW[1] - 6 },
  { d: `M${left(1)} ${ROW[1]} H${right(0)}`, label: "block", lx: COL[0] + gapX, ly: ROW[1] - 6 },
  {
    d: `M${COL[1]} ${bottom(1)} V${top(2)}`,
    label: "event",
    lx: COL[1] + 7,
    ly: (bottom(1) + top(2)) / 2 + 4,
    anchor: "start" as const,
  },
  { d: `M${left(1)} ${ROW[2]} H${right(0)}`, label: "write", lx: COL[0] + gapX, ly: ROW[2] - 6 },
  { d: `M${right(1)} ${ROW[2]} H${left(2)}`, label: "push", lx: COL[1] + gapX, ly: ROW[2] - 6 },
];

// Queries travel client → resolver → policy → upstream/sinkhole at a constant speed.
const STEP_X = COL[1] - COL[0];
const STEP_Y = ROW[1] - ROW[0];
const QUERY_MOVE = 3;
const QUERY_LENGTH = STEP_X * 2 + STEP_Y;
const AT_POLICY = ((STEP_X + STEP_Y) / QUERY_LENGTH) * QUERY_MOVE;
const EVENT_MOVE = AT_POLICY; // policy → workers → store/dashboard is the same distance

const queries: { begin: number; verdict: "allow" | "block" }[] = [
  { begin: 0, verdict: "allow" },
  { begin: 0.8, verdict: "allow" },
  { begin: 1.5, verdict: "block" },
  { begin: 2.3, verdict: "allow" },
  { begin: 3.1, verdict: "allow" },
  { begin: 3.9, verdict: "allow" },
  { begin: 4.6, verdict: "block" },
  { begin: 5.4, verdict: "allow" },
  { begin: 6.2, verdict: "allow" },
  { begin: 7.1, verdict: "block" },
];

const fraction = (seconds: number) => (seconds / CYCLE).toFixed(3);

function Motion({ path, begin, move }: { path: string; begin: number; move: number }) {
  return (
    <animateMotion
      path={path}
      begin={`${begin.toFixed(2)}s`}
      dur={`${CYCLE}s`}
      keyPoints="0;1;1"
      keyTimes={`0;${fraction(move)};1`}
      calcMode="linear"
      repeatCount="indefinite"
    />
  );
}

export function DnsFigure() {
  return (
    <figure className="border border-ink bg-paper">
      <div className="flex items-center justify-between border-b border-ink px-4 py-2.5">
        <span className="t-meta text-ink">FIG. 01</span>
        <span className="t-meta">dns firewall · simplified</span>
      </div>

      <svg
        viewBox="0 0 420 312"
        className="block h-auto w-full"
        role="img"
        aria-labelledby="fig1-title fig1-desc"
      >
        <title id="fig1-title">DNS firewall request path</title>
        <desc id="fig1-desc">
          A client query reaches the resolver and is checked against policy rules fed by threat
          intelligence. Allowed queries resolve upstream, blocked ones are answered by a sinkhole.
          Every decision is emitted as an event, processed by Celery workers, written to
          TimescaleDB and pushed to a live dashboard over WebSockets.
        </desc>

        <defs>
          <pattern id="fig1-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" className="fig-bg" />
          </pattern>
          <marker
            id="fig1-arrow"
            viewBox="0 0 8 8"
            refX="8"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8 z" className="fig-arrow" />
          </marker>
        </defs>

        <rect width="420" height="312" fill="url(#fig1-dots)" />

        {edges.map((edge) => (
          <g key={edge.d}>
            <path
              d={edge.d}
              className={`fig-edge ${edge.control ? "fig-edge-control" : ""}`}
              markerEnd="url(#fig1-arrow)"
            />
            {edge.label ? (
              <text x={edge.lx} y={edge.ly} textAnchor={edge.anchor ?? "middle"} className="fig-edge-label">
                {edge.label}
              </text>
            ) : null}
          </g>
        ))}

        <g aria-hidden="true">
          {queries.map(({ begin, verdict }) => (
            <g key={begin}>
              <circle cx={COL[0]} cy={ROW[0]} r="4" className={`fig-packet fig-${verdict}`}>
                <Motion
                  path={`M0 0 h${STEP_X} v${STEP_Y} h${verdict === "allow" ? STEP_X : -STEP_X}`}
                  begin={begin}
                  move={QUERY_MOVE}
                />
              </circle>
              {[-STEP_X, STEP_X].map((dx) => (
                <rect
                  key={dx}
                  x={COL[1] - 2.5}
                  y={ROW[1] - 2.5}
                  width="5"
                  height="5"
                  className="fig-packet fig-event"
                >
                  <Motion path={`M0 0 v${STEP_Y} h${dx}`} begin={begin + AT_POLICY} move={EVENT_MOVE} />
                </rect>
              ))}
            </g>
          ))}
          <polygon
            points={`${COL[2]},${ROW[0] - 4} ${COL[2] + 4},${ROW[0]} ${COL[2]},${ROW[0] + 4} ${COL[2] - 4},${ROW[0]}`}
            className="fig-packet fig-event"
          >
            <Motion path={`M0 0 v${100 - ROW[0]} h${COL[1] + 22 - COL[2]} v${ROW[1] - 100}`} begin={5.4} move={2.6} />
          </polygon>
        </g>

        {nodes.map((node) => (
          <g key={node.label} className={`fig-node ${node.core ? "fig-node-core" : ""}`}>
            <rect x={node.x - BOX.w / 2} y={node.y - BOX.h / 2} width={BOX.w} height={BOX.h} />
            <text x={node.x} y={node.y - 2} textAnchor="middle" className="fig-label">
              {node.label}
            </text>
            <text x={node.x} y={node.y + 12} textAnchor="middle" className="fig-sub">
              {node.sub}
            </text>
          </g>
        ))}

        <g aria-hidden="true">
          {queries
            .filter((query) => query.verdict === "block")
            .map(({ begin }) => (
              <rect
                key={begin}
                x={COL[0] - BOX.w / 2}
                y={ROW[1] - BOX.h / 2}
                width={BOX.w}
                height={BOX.h}
                opacity="0"
                className="fig-flash"
              >
                <animate
                  attributeName="opacity"
                  values="0;0;1;0;0"
                  keyTimes={`0;${fraction(QUERY_MOVE - 0.01)};${fraction(QUERY_MOVE)};${fraction(QUERY_MOVE + 0.9)};1`}
                  begin={`${begin}s`}
                  dur={`${CYCLE}s`}
                  repeatCount="indefinite"
                />
              </rect>
            ))}
        </g>
      </svg>

      <figcaption className="border-t border-line px-4 py-3">
        <ul className="t-meta flex flex-wrap gap-x-4 gap-y-1">
          <li className="flex items-center gap-1.5">
            <span className="fig-swatch-allow inline-block size-2 rounded-full" /> allowed
          </li>
          <li className="flex items-center gap-1.5">
            <span className="fig-swatch-block inline-block size-2 rounded-full" /> blocked
          </li>
          <li className="flex items-center gap-1.5">
            <span className="fig-swatch-event inline-block size-1.5" /> event
          </li>
          <li className="flex items-center gap-1.5">
            <span className="inline-block w-4 border-t border-dashed border-ink-3" /> control plane
          </li>
        </ul>
        <p className="t-meta mt-2 text-ink-2">
          Queries are allowed or sinkholed at the policy layer. Every decision becomes an event
          for storage and live monitoring. Modelled on ThreatIDR.
        </p>
      </figcaption>
    </figure>
  );
}

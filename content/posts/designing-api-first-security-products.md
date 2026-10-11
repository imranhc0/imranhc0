---
title: Designing API-First Security Products
description: A practical approach to structuring microservices and contracts for high-risk domains.
date: 2026-02-16
tags: [architecture, security, microservices]
---

Security products fail when boundaries are fuzzy. API-first architecture enforces clear contracts between services and teams.

## Three layers to optimise

I optimise around three layers, and each release should improve all three:

1. **Transport stability.** Versioned endpoints, predictable error shapes, timeouts and retries that are designed rather than discovered.
2. **Business invariants.** The rules that must never break, such as "a blocked domain is never resolved", are encoded in the contract, not scattered across handlers.
3. **Observability.** Every decision a service makes can be traced back to the request that caused it.

## Make the contract executable

A contract only helps if both sides can enforce it. In TypeScript services I keep the schema next to the route and derive the types from it, so the boundary is validated at runtime and checked at compile time:

```ts
import { z } from "zod";

export const PolicyRule = z.object({
  domain: z.string().toLowerCase().regex(/^(?:[a-z0-9-]+\.)+[a-z]{2,}$/),
  action: z.enum(["block", "allow", "monitor"]),
  category: z.enum(["malware", "phishing", "c2", "custom"]),
  expiresAt: z.string().datetime().nullable(),
});

export type PolicyRule = z.infer<typeof PolicyRule>;

// Anything past this line can trust its input.
export function parsePolicyRule(input: unknown): PolicyRule {
  return PolicyRule.parse(input);
}
```

The same schema can generate OpenAPI docs for the frontend team, so there is one source of truth instead of three.

## Start from the threat model

Start from threat models, then derive API contracts and ownership. This keeps scale from becoming operational chaos: when a new service appears, the first question is which boundary it sits behind and who owns it, not which framework it uses.

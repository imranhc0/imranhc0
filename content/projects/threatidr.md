---
title: ThreatIDR
summary: Enterprise zero-day attack protection. A DNS firewall that blocks malicious domains before a connection is made, with live threat monitoring on top.
role: Backend engineer
company: Pipeline Co., Ltd
domain: DNS security
stack: [Python, Flask, Celery, PostgreSQL, TimescaleDB, WebSockets]
featured: true
order: 2
---

## Context

Almost every connection on a network starts with a DNS lookup, which makes DNS one of the earliest points where an attack can be stopped. ThreatIDR is an enterprise DNS firewall built to protect against zero-day and emerging threats: it combines DNS-layer blocking, attack visibility and policy-based control, so infrastructure is protected before compromise rather than cleaned up after it.

## What I built

- **Backend services.** Backend systems in Python (Flask), with Celery handling asynchronous task queueing and processing, so heavy work stays off the request path.
- **Real-time monitoring.** WebSocket channels that push threat activity to the monitoring interface as it happens, instead of having it poll.
- **Time-series storage.** TimescaleDB on top of PostgreSQL for storing and analysing DNS and threat events over time.

## How it fits together

A simplified, conceptual view:

```text
endpoint ──► DNS firewall ─┬─ allow ──► upstream
                           ├─ block ──► sinkhole
                           └─ event ──► Celery workers ──► TimescaleDB
                                        (async tasks)           │
                                                                ▼
live monitoring ◄── WebSockets ◄─────────────────────────── Flask API
```

## Design notes

- **Blocking at DNS is cheap and early.** A blocked lookup never produces a connection, so phishing pages, command-and-control servers and malware downloads are stopped before any traffic reaches them.
- **Async by default.** Enrichment and analysis run as Celery tasks. Bursts of DNS activity queue up instead of slowing the API.
- **Time-series data in a relational home.** Threat telemetry is append-heavy and almost always queried by time window. TimescaleDB adds time-partitioned tables and time-bucketed aggregation while keeping everything queryable with plain PostgreSQL.

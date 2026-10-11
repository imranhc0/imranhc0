---
title: ThreatIDR
summary: DNS security platform that blocks malware, phishing, C2 and DGA traffic before a connection is made, using threat intelligence refreshed every 60 seconds.
role: Backend engineer
company: Pipeline Co., Ltd
domain: DNS security
stack: [Python, Flask, Celery, PostgreSQL, TimescaleDB, WebSockets]
featured: true
order: 2
live: https://www.ppln.co/threatidr
---

## Context

Almost every connection starts with a DNS lookup, which makes DNS one of the earliest points where an attack can be stopped. ThreatIDR is PIPELINE's preventive-defence platform built on that idea: instead of detecting and cleaning up after an infection, it blocks malicious domains and downloads at the DNS layer, before anything reaches the endpoint.

What the product does:

- **Blocks threats before infection.** Malware and ransomware, phishing and spear phishing, botnet traffic and DGA (domain generation algorithm) domains are refused at resolution time.
- **Cuts off command and control.** Communication with detected C2 servers is blocked automatically.
- **Detects the unknown by behaviour.** Unknown threats are identified from behaviour patterns, not only from known indicators.
- **Stays current.** Threat intelligence from global sources is refreshed every 60 seconds, where conventional products update daily or weekly.
- **Deploys in minutes.** There is no hardware to install, so customers can roll it out on their own schedule.

## What I built

- **Backend services.** Backend systems in Python (Flask), with Celery handling asynchronous task queueing and processing so heavy work stays off the request path.
- **Real-time monitoring.** WebSocket channels that push threat activity to the monitoring interface as it happens, instead of having it poll.
- **Time-series storage.** TimescaleDB on top of PostgreSQL for storing and analysing DNS and threat events over time.

## How it fits together

A simplified, conceptual view:

```text
          threat intel feeds
                   │ refreshed every 60 s
                   ▼
endpoint ──► DNS firewall ─┬─ allow ──► upstream
                           ├─ block ──► sinkhole
                           └─ event ──► Celery workers ──► TimescaleDB
                                        (async tasks)           │
                                                                ▼
live monitoring ◄── WebSockets ◄─────────────────────────── Flask API
```

## Design notes

- **Blocking at DNS is cheap and early.** A refused lookup never becomes a connection, so the endpoint never talks to the phishing page, C2 server or malware host at all.
- **Async by default.** Enrichment and analysis run as Celery tasks. Bursts of DNS activity queue up instead of slowing the API.
- **Time-series data in a relational home.** Threat telemetry is append-heavy and almost always queried by time window. TimescaleDB adds time-partitioned tables and time-bucketed aggregation while keeping everything queryable with plain PostgreSQL.

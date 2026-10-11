---
title: RiskSensor
summary: External cyber-risk platform that continuously maps an organisation's exposure, from leaked data and shadow IT to vulnerable public services, across subsidiaries and suppliers.
role: Backend architecture, full-stack
company: Pipeline Co., Ltd
domain: Attack surface & supply-chain risk
stack: [Python (Django), Node.js (Express), TypeScript, Go (Gin), PostgreSQL, DynamoDB, Pinecone, React, AWS, Docker, GitHub Actions]
featured: true
order: 1
live: https://www.ppln.co/risksensor
---

## Context

Most of a company's cyber risk is visible from the outside long before an attack: a forgotten subdomain, an unpatched public service, credentials on a leak site, a lookalike domain set up for phishing. RiskSensor is PIPELINE's platform for making that exposure visible and turning it into something management can act on.

What the product covers:

- **Exposure monitoring.** Leaked information and dark-web exposure, shadow IT and unmanaged assets, vulnerabilities and misconfigurations, phishing and impersonation risk, and the state of public-facing services.
- **The whole organisation.** The parent company, its affiliates and its contractors, so risk in a subsidiary or supplier is not a blind spot.
- **Change over time.** Continuous checks track how each risk moves, which issues to prioritise and what has been fixed.
- **Reporting for decision makers.** Risk scores, trends and remediation status for board reporting, audits and conversations with business partners.

## What I built

- **Backend and cloud.** Architected the backend across Python (Django), Node.js (Express, TypeScript) and Go (Gin), and managed infrastructure and deployments with AWS, Docker and GitHub Actions.
- **Data engineering.** Designed the data models across PostgreSQL, DynamoDB and Pinecone for high-speed threat-data retrieval and vector similarity search.
- **Frontend integration.** Delivered the React and TypeScript frontend on top of clean, documented and secure APIs, owning both sides of the integration.

## Architecture

A simplified, conceptual view:

```text
external signals ──► services ─┬─► PostgreSQL
leaks, dark web,     Django    ├─► DynamoDB (high-speed retrieval)
exposed services     Express   └─► Pinecone (vector similarity search)
                     Go (Gin)
                        │
                        ▼
                   REST APIs ──► React + TypeScript dashboards
                                    (risk scores, trends, reports)
```

## Design notes

- **One store per access pattern.** Relational data and integrity constraints live in PostgreSQL, high-volume lookups in DynamoDB, and embeddings in Pinecone. Each store does the job it is best at.
- **Similarity, not just matching.** Vector search over threat data surfaces related records even when nothing matches exactly.
- **The API is the product boundary.** Owning both the services and the frontend made it easy to keep the API documented and stable, because I was its first consumer.

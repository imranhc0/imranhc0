---
title: Risk Sensor
summary: Real-time cyber threat-intelligence SaaS. A polyglot backend in Django, Express and Go, with vector similarity search over threat data.
role: Backend architecture, full-stack
company: Pipeline Co., Ltd
domain: Threat intelligence
stack: [Python (Django), Node.js (Express), TypeScript, Go (Gin), PostgreSQL, DynamoDB, Pinecone, React, AWS, Docker, GitHub Actions]
featured: true
order: 1
---

## Context

Risk Sensor gives security teams real-time visibility into suspicious DNS and network behaviour through interactive dashboards and actionable alerts. The goal is to surface threat indicators fast enough that responders can act while an event is still unfolding.

## What I built

- **Backend and cloud.** Architected the backend across Python (Django), Node.js (Express, TypeScript) and Go (Gin), and managed infrastructure and deployments with AWS, Docker and GitHub Actions.
- **Data engineering.** Designed the data models across PostgreSQL, DynamoDB and Pinecone for fast threat-data retrieval and vector similarity search.
- **Frontend integration.** Delivered the React and TypeScript frontend on top of clean, documented and secure APIs, owning both sides of the integration.

## Architecture

A simplified, conceptual view:

```text
threat data ──► services ─┬─► PostgreSQL
                Django    ├─► DynamoDB
                Express   └─► Pinecone (vector similarity)
                Go (Gin)
                   │
                   ▼
              REST APIs ──► React + TypeScript
```

## Design notes

- **One store per access pattern.** Relational data and integrity constraints live in PostgreSQL, high-volume key-based lookups in DynamoDB, and embeddings in Pinecone. Each store does the one job it is best at.
- **Similarity, not just matching.** Vector search finds threat data that is related to a known indicator even when nothing matches exactly.
- **The API is the product boundary.** Owning both the services and the frontend made it easy to keep the API documented and stable, because I was its first consumer.

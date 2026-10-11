---
title: CI/CD Pipelines That Actually Reduce Risk
description: Shipping fast is only useful when rollback, validation, and traceability are built in.
date: 2026-02-16
tags: [devops, ci-cd, reliability]
---

CI/CD should not only push code faster. It should reduce blast radius.

## My baseline

- **Test gates.** Nothing merges without passing unit and integration tests.
- **Typed contracts.** Type checks run on every pull request, so a broken API shape fails in CI, not in production.
- **Migration checks.** Database migrations are applied to a throwaway database before they get anywhere near a real one.
- **Progressive deployment.** New versions reach a small slice of traffic first, with a rollback that is one command away.

Add observability and runbooks into the deployment workflow itself, so the person deploying can see the effect of their change while it rolls out.

## What that looks like in GitHub Actions

A trimmed version of the shape I use. Each job is a gate, and deploy only runs when every gate is green:

```yaml
name: ci

on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run typecheck
      - run: npm test -- --coverage

  migrations:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env: { POSTGRES_PASSWORD: ci }
        ports: ["5432:5432"]
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:ci@localhost:5432/postgres

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: [verify, migrations]
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/deploy.sh --canary 10
```

## Pipelines are product infrastructure

Velocity and safety are not trade-offs when the pipeline is engineered as product infrastructure. Treat it like any other service: give it an owner, review changes to it and measure it.

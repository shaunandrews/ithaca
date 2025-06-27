# Odie Prototype

This repository contains a small prototype of **Odie**, a platform for building, managing and improving AI-powered Agents. Odie offers a unified interface, consistent design language and tools for iteration and oversight.

## Core Features

- **Agents** – the main units that follow instructions and use Tools and Experts to complete tasks.
- **Experts** – self‑contained mini agents focused on narrow responsibilities.
- **Tools** – integrations that allow Agents and Experts to retrieve data or perform actions.
- **Activity and Review** – review an Agent's history of interactions and provide structured feedback.
- **Insights and Dashboards** – visibility into performance trends and usage metrics.
- **Versioning and Experimentation** – track every version and compare performance between versions.

See [docs/ProductOverview.md](docs/ProductOverview.md) for the full product overview.

## Prototype status

This project is an early front‑end prototype built with Vue 3 + Vite. It relies entirely on mock data found in `src/data` and changes are **not** persisted. Any "Save" buttons in the UI are decorative only.

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

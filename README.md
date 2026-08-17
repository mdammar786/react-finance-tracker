# Finance Tracker

A personal finance tracking application built with React and TypeScript. Track transactions, manage budgets, and visualize spending patterns across categories.

## Getting Started

### Prerequisites

- Node.js 20
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

### Build

```bash
npm run build
```

### Tests

```bash
npm test
```

### Lint

```bash
npm run lint
```

### Type Check

```bash
npm run typecheck
```

## Project Structure

```
src/
├── types/           Transaction, Budget, User type definitions
├── utils/           Formatters, validators, calculations, constants
├── services/        API and local storage service layers
├── hooks/           useTransactions, useBudget, useAuth, useFilter, useLocalStorage
├── context/         AuthContext, TransactionContext, FilterContext
├── components/
│   ├── ui/          Button, Input, Modal, Card, Badge, Select
│   ├── TransactionList
│   ├── BudgetCard
│   ├── FilterBar
│   ├── SummaryCard
│   ├── AddTransactionForm
│   └── ChartContainer
├── pages/           Dashboard, Transactions, Budgets, Settings, Login, Reports
├── __tests__/       Unit and component tests
├── App.tsx
└── index.tsx
```

## Features

- **Transaction Management** — Add, edit, remove, and filter transactions by type, category, date range, and amount
- **Budget Tracking** — Set spending limits per category with utilization progress and status indicators
- **Dashboard** — Overview with balance, income, expense summaries and spending breakdown charts
- **Reports** — Monthly expense trends and top spending category visualizations
- **Authentication** — Login flow with token persistence and preference management
- **Responsive Layout** — Adaptive grid layouts for varying screen sizes.

## Tech Stack

- React 18
- TypeScript
- React Scripts (CRA)
- Jest + React Testing Library

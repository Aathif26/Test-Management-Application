# Test Management Application

A modern web application for creating, managing, and publishing tests with an intuitive question editor and preview system.

## Tech Stack

- **Framework**: [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/) 8
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix Nova)
- **Routing**: [React Router](https://reactrouter.com/) v7
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── common/          # Shared components (Header, Footer)
│   └── layout/          # Layout wrappers (AuthLayout, AppLayout)
├── constants/           # App-wide constants & configuration
├── features/            # Feature-based modules
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Route page components
├── services/            # API clients & service layer
├── types/               # Shared TypeScript types
├── router.tsx           # Route definitions
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Global styles & design tokens
```

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | User authentication |
| `/` | Dashboard | Test list and overview |
| `/tests/new` | Create Test | Create a new test |
| `/tests/:id/edit` | Edit Test | Edit an existing test |
| `/tests/:id/questions` | Add Questions | Add questions to a test |
| `/tests/:id/preview` | Preview & Publish | Preview and publish a test |

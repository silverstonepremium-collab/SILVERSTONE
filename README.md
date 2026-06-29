# SILVERSTONE - Logistics & Delivery Platform

## Overview

SILVERSTONE is a modern, full-featured logistics and delivery management platform built with Next.js, TypeScript, and Tailwind CSS. It provides real-time tracking, route optimization, fleet management, and intelligent shipment handling.

## Features

- 📦 **Shipment Management** - Track packages from warehouse to delivery
- 🚚 **Fleet Management** - Monitor vehicles, drivers, and assignments
- 🗺️ **Route Optimization** - AI-powered routing for maximum efficiency
- 👥 **Driver Management** - Manage driver profiles, availability, and assignments
- 📊 **Analytics Dashboard** - Real-time metrics and performance insights
- 🔔 **Real-time Notifications** - Updates on shipment status changes
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Frontend Framework**: Next.js 16.2.6
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.2.0
- **UI Components**: Lucide React, shadcn/ui
- **Database**: Neon (Serverless PostgreSQL)
- **Analytics**: Vercel Analytics

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── dashboard/       # Analytics and overview dashboard
│   ├── shipments/       # Shipment management interface
│   ├── drivers/         # Driver management
│   ├── vehicles/        # Fleet management
│   └── layout.tsx       # Root layout
├── components/          # Reusable React components
│   ├── ui/              # UI primitives
│   ├── forms/           # Form components
│   └── common/          # Shared components
├── lib/                 # Utilities and helpers
│   ├── types/           # TypeScript types and interfaces
│   ├── api/             # API client functions
│   ├── db/              # Database queries (Neon)
│   └── utils.ts         # Helper functions
└── styles/              # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/silverstonepremium-collab/SILVERSTONE.git
cd SILVERSTONE
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your configuration:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=your-neon-database-url
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@host/database
VERCEL_ANALYTICS_ID=your-id
API_SECRET_KEY=your-secret-key
```

## Database Setup

This project uses Neon for serverless PostgreSQL. Create migrations in the `src/lib/db/migrations` folder.

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with descriptive messages
4. Push and create a Pull Request

## License

MIT

## Support

For support, email support@silverstone.dev or create an issue in the repository.

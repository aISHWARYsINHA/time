# Digital Clock Application

## Overview

This is a full-stack TypeScript application that displays a real-time digital clock with automatic timezone detection. The application uses a modern tech stack with React for the frontend, Express for the backend, and is configured for PostgreSQL database with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with `/api` prefix
- **Development**: TSX for TypeScript execution in development
- **Production**: ESBuild for server bundling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Configured for PostgreSQL (Neon Database)
- **Migrations**: Drizzle Kit for schema management
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Frontend Components
- **Clock Display**: Real-time digital clock with 70% screen width and timezone tooltip on hover
- **Time Format Toggle**: Customizable 12-hour or 24-hour time format with instant switching
- **Bottom Controls**: Smooth slider for clock size (8-20vw in 0.2vw increments), time format toggle, and theme toggle button
- **Error Handling**: Graceful fallback for time display failures
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Pre-configured dark theme with proper text contrast (white text on dark, black text on light)
- **Typography**: Lexend font throughout the application for improved readability

### Backend Components
- **Express Server**: Main application server with middleware for JSON parsing and logging
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **User Management**: Basic user schema with username/password fields
- **Route Registration**: Modular route handling system
- **Development Tools**: Vite integration for hot reloading in development

### Shared Components
- **Schema Definitions**: Drizzle schema with Zod validation
- **Type Safety**: Shared TypeScript types between frontend and backend

## Data Flow

1. **Client Request**: Browser requests are handled by Vite dev server (development) or Express static serving (production)
2. **API Calls**: Frontend makes authenticated requests to `/api` endpoints
3. **Storage Layer**: Backend uses storage interface for data operations
4. **Database Operations**: Drizzle ORM handles database queries and migrations
5. **Response Handling**: JSON responses with error handling and logging

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, Class Variance Authority, CLSX
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Date Handling**: Date-fns for date manipulation

### Backend Dependencies
- **Server**: Express.js with session management
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Session Storage**: Connect-pg-simple for PostgreSQL session store
- **Development**: TSX for TypeScript execution

### Development Dependencies
- **Build Tools**: Vite, ESBuild, TypeScript
- **Linting/Formatting**: Configured for TypeScript strict mode
- **Development Server**: Hot reload with Vite middleware integration

## Deployment Strategy

### Development Mode
- Vite dev server with hot reload
- TSX for server execution
- Integrated development experience with Replit

### Production Build
- Frontend: Vite build outputs to `dist/public`
- Backend: ESBuild bundles server to `dist/index.js`
- Static file serving through Express
- Environment-specific configuration

### Database Setup
- Drizzle migrations in `/migrations` directory
- Environment variable for DATABASE_URL
- PostgreSQL connection through Neon serverless driver

### Key Configuration Files
- `vite.config.ts`: Frontend build configuration with aliases
- `drizzle.config.ts`: Database migration configuration
- `tsconfig.json`: TypeScript configuration with path mapping
- `tailwind.config.ts`: UI styling configuration
- `components.json`: Shadcn/ui component configuration

The application is designed for easy deployment on platforms like Replit, with clear separation between development and production environments, and a scalable architecture that can grow from the current clock application to more complex features.
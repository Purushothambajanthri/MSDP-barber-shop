# Sreeramulu Classic Cuts - Barber Shop Web Application

## Overview

This is a full-featured barber shop web application called "Sreeramulu Classic Cuts" for a traditional barber shop located in Kristipadu village, Anantapur district, Andhra Pradesh, India. The application provides a comprehensive booking system with service selection, barber selection, chair selection, scheduling, and payment processing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with a clear separation between frontend and backend:

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **Session Management**: Express sessions with PostgreSQL store

## Key Components

### Database Schema
The application uses PostgreSQL with the following main entities:
- **Users**: Authentication and user profiles (required for Replit Auth)
- **Barbers**: Staff information with specialties and contact details
- **Chairs**: Barber chair management
- **Services**: Service catalog with pricing
- **Bookings**: Appointment management
- **Booking Services**: Many-to-many relationship between bookings and services
- **Sessions**: Session storage for authentication

### Authentication System
- Implements Replit Auth using OpenID Connect
- Passport.js integration for authentication middleware
- Session-based authentication with PostgreSQL session store
- Protected routes requiring authentication for booking functionality

### Booking System
Multi-step booking flow:
1. Service selection with pricing
2. Barber selection with profiles and experience
3. Chair selection with visual representation
4. Date and time scheduling with availability checking
5. Contact information collection
6. Payment method selection (cash or UPI)

### UI Components
- Custom theme with barber shop branding
- Responsive design with mobile-first approach
- Reusable UI components from shadcn/ui
- Interactive booking flow with progress indicators
- Image integration for barbers and chairs

## Data Flow

1. **User Authentication**: Users must authenticate via Replit Auth to access booking features
2. **Service Selection**: Users browse and select services from the catalog
3. **Booking Configuration**: Step-by-step selection of barber, chair, and time slot
4. **Availability Check**: Real-time availability validation for selected date/time/barber/chair
5. **Payment Processing**: Choice between cash payment and UPI with QR code
6. **Booking Confirmation**: Final booking creation with confirmation messages

## External Dependencies

### Core Dependencies
- **Database**: Neon serverless PostgreSQL
- **UI Framework**: Radix UI primitives and shadcn/ui components
- **Authentication**: Replit Auth with OpenID Connect
- **Development**: Vite with React plugin and TypeScript support

### Payment Integration
- UPI payment with QR code display
- Payment details: BAJANTHRI MALLESWARI (9573761730)
- Cash payment option with in-person settlement

### Assets
- Barber profile images
- Chair images for selection
- QR code for UPI payments
- Responsive image handling with placeholder support

## Deployment Strategy

### Development Environment
- Replit-optimized development setup
- Hot module replacement with Vite
- TypeScript compilation and type checking
- Database migrations with Drizzle Kit

### Production Build
- Vite production build for frontend assets
- esbuild bundling for Node.js server
- Static asset serving with Express
- Environment variable configuration for database and authentication

### Key Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `REPL_ID`: Replit environment identifier
- `ISSUER_URL`: OpenID Connect issuer URL

### Build Commands
- Development: `npm run dev`
- Production build: `npm run build`
- Production start: `npm start`
- Database push: `npm run db:push`

The application is designed to run efficiently on Replit's infrastructure with proper error handling, logging, and development tooling integration.
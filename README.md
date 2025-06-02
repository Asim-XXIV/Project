# Custom Fashion Platform

A full-stack web platform for selling customizable garments to both B2B (stores) and B2C (consumers).

## Features

- 👤 Role-based authentication (Admin, Store, Consumer)
- 🧵 Product customization with visualization
- 📦 Order management and delivery tracking
- 💬 Real-time messaging with WebSockets
- 🧠 AI-powered tutorials and recommendations
- 🛒 Storefront with cart and checkout
- 🧑‍💼 Admin dashboard

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS, Lucide React
- **Backend**: NestJS with TypeScript
- **Database**: MongoDB
- **Authentication**: JWT with HTTP-only cookies
- **Real-time**: WebSockets with SSL
- **AI Integration**: Open-source models for measurements and recommendations

## Project Structure

The project is organized into two main directories:
- `frontend/`: React application
- `backend/`: NestJS application

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend
3. Set up environment variables
4. Run the development servers

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Run frontend dev server
cd ../frontend
npm run dev

# Run backend dev server
cd ../backend
npm run start:dev
```

## Development Roadmap

### Phase 1: Core Setup
- Project structure and configuration
- Authentication system
- Basic user management

### Phase 2: Product & Customization
- Product catalog
- Customization options
- Measurement system

### Phase 3: Order & Delivery
- Cart and checkout
- Order management
- Delivery tracking

### Phase 4: AI Integration
- Measurement assistance
- Product recommendations
- Interactive tutorials

### Phase 5: Real-time Features
- WebSocket messaging
- Notifications
- Live updates

### Phase 6: Refinement
- UI/UX improvements
- Performance optimization
- Security enhancements
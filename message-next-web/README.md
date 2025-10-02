# Message Web Platform

**A comprehensive full-stack messaging platform with modern web technologies**

 Featuring real-time chat, user management, and advanced security across both frontend and backend systems.

## 🎯 Features

- **Real-time Messaging**: Powered by Socket.IO for instant communication
- **Multi-media Sharing**: Supports files, images, and documents
- **User Management**: Efficient friend and contact organization
- **Security**: JWT-based authentication with role-based access control
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern UI/UX**: Sleek interface with dark/light theme support

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 4, Radix UI
- **Real-time**: Socket.IO client
- **Forms**: React Hook Form with Zod validation
- **API**: Axios with interceptors

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO server
- **Authentication**: JWT with refresh tokens
- **File Upload**: Multer for media handling
- **Validation**: Joi or Zod for request validation
- **Security**: bcrypt for password hashing, CORS configuration

### Development & Deployment
- **Code Quality**: ESLint, Prettier
- **Containerization**: Docker & Docker Compose
- **Version Control**: Git
- **API Documentation**: Swagger/OpenAPI (if implemented)

## 🏛️ Architecture

### System Overview
```
┌─────────────────┐    HTTP/WebSocket    ┌─────────────────┐
│   Frontend      │◄────────────────────►│   Backend       │
│   (Next.js)     │                      │   (Express.js)  │
│   Port: 3000    │                      │   Port: 8000    │
└─────────────────┘                      └─────────────────┘
         │                                        │
         │                                        │
         ▼                                        ▼
┌─────────────────┐                      ┌─────────────────┐
│   Browser       │                      │   MongoDB       │
│   (Client)      │                      │   (Database)    │
└─────────────────┘                      └─────────────────┘
```

### API Endpoints
- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Users**: `/api/users/profile`, `/api/users/search`
- **Messages**: `/api/messages/send`, `/api/messages/history`
- **Friends**: `/api/friends/add`, `/api/friends/requests`
- **Socket.IO**: Real-time events for messaging and notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Frontend Setup

```bash
# Navigate to frontend directory
cd message-next-web

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Update NEXT_PUBLIC_API_URL and NEXT_PUBLIC_SOCKET_URL

# Run development server
npm run dev
```

**Frontend Access**: `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend directory (separate repository)
cd message-backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Update MONGODB_URI, JWT_SECRET, PORT

# Run development server
npm run dev
```

**Backend API**: `http://localhost:8000`
**Socket.IO**: `http://localhost:8000`

### Full Stack with Docker

```bash
# Run both frontend and backend
docker-compose up --build
```

## 📋 Scripts

### Frontend Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint checks |

### Backend Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Express development server |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run start` | Run production server |
| `npm run test` | Run test suite |
| `npm run lint` | Run ESLint checks |

## 🔒 Security

- JWT authentication
- Auto token refresh
- Protected routes
- Input validation
- CORS configuration

## 📱 Platform Support

- **Desktop**: Full functionality
- **Mobile/Tablet**: Responsive, touch-optimized

## 📈 Status

Production-ready with active feature development.

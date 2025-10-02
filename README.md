# Message Web Platform

**A robust, real-time messaging platform built with modern web technologies**

A scalable, enterprise-grade solution for seamless communication, featuring real-time chat, multi-media support, and advanced security.

## 🎯 Features

- **Real-time Messaging**: Powered by Socket.IO for instant communication
- **Multi-media Sharing**: Supports files, images, and documents
- **User Management**: Efficient friend and contact organization
- **Security**: JWT-based authentication with role-based access control
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern UI/UX**: Sleek interface with dark/light theme support

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 4, Radix UI
- **Real-time**: Socket.IO client
- **Forms**: React Hook Form with Zod validation
- **API**: Axios with interceptors
- **Code Quality**: ESLint, modular component architecture

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Update NEXT_PUBLIC_API_URL and NEXT_PUBLIC_SOCKET_URL

# Run development server
npm run dev
```

**Access**: `http://localhost:3000`

## 📋 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production server |
| `npm run lint` | Run code quality checks |

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

# Better Auth + Prisma + Express + Next.js Monorepo

A production-grade Turborepo monorepo implementing a complete authentication and authorization system using Better Auth, Prisma, Express, Next.js, and shadcn/ui with Role-Based Access Control (RBAC).

## 🚀 Features

### Authentication (Better Auth)
- ✅ Email/Password authentication
- ✅ Social OAuth providers (Google, GitHub)
- ✅ Email verification support
- ✅ Password reset functionality
- ✅ Session management
- ✅ Two-factor authentication (2FA) support via plugins

### RBAC System
- ✅ Hierarchical role system
- ✅ Granular permissions
- ✅ Role-based route protection
- ✅ Admin user management

### Roles
| Role | Description |
|------|-------------|
| `SUPER_ADMIN` | Full system access with all permissions |
| `ADMIN` | Administrative access to manage users |
| `MANAGER` | Can manage resources and view users |
| `USER` | Standard user access |
| `GUEST` | Limited read-only access |

### Permissions
- `user:read`, `user:create`, `user:update`, `user:delete`
- `admin:access`, `admin:manage_users`, `admin:manage_roles`
- `resource:read`, `resource:create`, `resource:update`, `resource:delete`

## 📁 Project Structure

```
├── apps/
│   ├── web/                    # Next.js frontend (port 3000)
│   │   ├── app/
│   │   │   ├── (auth)/         # Auth routes (login, register, etc.)
│   │   │   ├── (dashboard)/    # Protected dashboard routes
│   │   │   ├── admin/          # Admin-only routes
│   │   │   └── api/auth/       # Better Auth API route
│   │   ├── components/
│   │   └── lib/
│   │
│   └── api/                    # Express.js backend (port 3001)
│       └── src/
│           ├── routes/
│           ├── middleware/
│           └── lib/
│
├── packages/
│   ├── database/               # Prisma schema and client
│   ├── auth/                   # Shared auth configuration & RBAC
│   ├── ui/                     # Shared UI components (shadcn/ui)
│   ├── typescript-config/      # Shared TypeScript configs
│   └── eslint-config/          # Shared ESLint configs
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Monorepo | Turborepo |
| Frontend | Next.js 15 (App Router) |
| Backend | Express.js |
| Database | PostgreSQL + Prisma |
| Authentication | Better Auth |
| UI Components | shadcn/ui + Tailwind CSS |
| Validation | Zod |
| Package Manager | pnpm |

## 📦 Installation

### Prerequisites
- Node.js 18+
- pnpm 9+
- PostgreSQL database

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd better-auth-prisma-express-nextjs
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-min-32-characters-long"
BETTER_AUTH_URL="http://localhost:3000"

# API URL (for frontend to connect to backend)
NEXT_PUBLIC_API_URL="http://localhost:3001"

# OAuth Providers (optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

4. **Setup the database**
```bash
pnpm db:generate
pnpm db:push
```

5. **Start development servers**
```bash
pnpm dev
```

This will start:
- Next.js frontend at `http://localhost:3000`
- Express backend at `http://localhost:3001`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push schema to database |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:studio` | Open Prisma Studio |

## 🔐 API Endpoints

### Authentication (Better Auth)
All auth endpoints are handled by Better Auth at `/api/auth/*`

### User Routes (Protected)
| Method | Endpoint | Description | Required Permission |
|--------|----------|-------------|---------------------|
| GET | `/api/users` | List all users | `admin:manage_users` |
| GET | `/api/users/:id` | Get user by ID | `user:read` |
| PATCH | `/api/users/:id` | Update user | `user:update` |
| DELETE | `/api/users/:id` | Delete user | `user:delete` |
| PATCH | `/api/users/:id/role` | Update user role | Super Admin only |

### Admin Routes
| Method | Endpoint | Description | Required Permission |
|--------|----------|-------------|---------------------|
| GET | `/api/admin/stats` | Dashboard stats | `admin:access` |
| POST | `/api/admin/users/ban` | Ban user | `admin:access` |
| POST | `/api/admin/users/unban` | Unban user | `admin:access` |

## 🎨 Frontend Pages

### Public Pages
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset form

### Protected Pages
- `/dashboard` - User dashboard
- `/profile` - User profile management
- `/settings` - Account settings

### Admin Pages
- `/admin` - Admin dashboard with stats
- `/admin/users` - User management
- `/admin/roles` - Role & permissions overview

## 🔧 Configuration

### Adding OAuth Providers

To enable GitHub OAuth:
1. Create a GitHub OAuth App at https://github.com/settings/developers
2. Set the callback URL to `http://localhost:3000/api/auth/callback/github`
3. Add credentials to `.env`:
```env
GITHUB_CLIENT_ID="your-client-id"
GITHUB_CLIENT_SECRET="your-client-secret"
```

To enable Google OAuth:
1. Create credentials at https://console.cloud.google.com/apis/credentials
2. Set the callback URL to `http://localhost:3000/api/auth/callback/google`
3. Add credentials to `.env`:
```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Environment Variables for Production
Make sure to set these in your production environment:
- `DATABASE_URL` - Production PostgreSQL connection string
- `BETTER_AUTH_SECRET` - A strong random secret (min 32 chars)
- `BETTER_AUTH_URL` - Your production URL
- `NEXT_PUBLIC_API_URL` - Your production API URL

### Running in Production
```bash
# Start the Next.js frontend
pnpm --filter @repo/web start

# Start the Express backend
pnpm --filter @repo/api start
```

## 🏗️ Architecture

### Authentication Flow
1. User submits credentials to Next.js frontend
2. Better Auth handles authentication via `/api/auth/*`
3. Session is created and stored in database
4. Cookie is set for session management
5. Subsequent requests include session cookie
6. RBAC middleware validates permissions

### RBAC Implementation
```typescript
// Check if user has permission
const hasAccess = hasPermission(user.role, Permission.ADMIN_ACCESS);

// Middleware usage
app.get("/api/admin/stats", requireAuth, requireAdmin, handler);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details
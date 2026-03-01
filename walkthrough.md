# 🚀 Project Walkthrough — Community Hub

This document provides a comprehensive walkthrough of the **Community Hub** project, covering its functional features, technical architecture, and end-to-end data flow.

---

## 🏗 Functional Walkthrough

The Community Hub is designed with two primary user journeys: **Residents** and **Administrators**.

### 1. Resident Experience (Public)
Residents can access the platform without any login, ensuring maximum reach and engagement for community updates.

- **Homepage**: A central hub featuring a hero section, the latest announcements, and a preview of upcoming events and a media gallery.
- **Events Listing**: A dedicated page (`/events`) showing all scheduled community activities.
- **Event Details**: Deep-dive into specific events (`/events/[id]`) with full descriptions and metadata.
- **Announcements**: A chronological feed of all community-wide broadcasts.
- **Media Gallery**: A visual showcase of community life, displaying images and videos from past events.

### 2. Admin Experience (Protected)
Administrators have full CRUD (Create, Read, Update, Delete) capabilities to keep the community informed.

- **Secure Login**: Access via `/admin/login` using encrypted credentials.
- **Admin Dashboard**: A high-level overview of community engagement and content status.
- **Content Management**: Interactive tables and forms to manage:
  - **Events**: Creating new events, updating dates/locations, and managing cover images.
  - **Announcements**: Posting urgent or routine updates to the resident feed.
  - **Media**: Uploading and associating media with events.

---

## 🛠 Technical Walkthrough

### 1. Technology Stack Details
- **Next.js 16 (App Router)**: The backbone of the app. It uses **Server Components** for faster initial loads and **Client Components** (with Framer Motion) for interactive UI elements.
- **Tailwind CSS 4**: Implements a customized design system. The `globals.css` file defines tokens for glassmorphism effects (blur, transparency, borders).
- **Prisma ORM**: Acts as the bridge between the application and the PostgreSQL database. It provides a type-safe API for all database interactions.
- **Framer Motion**: Used for micro-animations (hover effects on cards, page transitions, and staggered list entries) to provide a premium feel.
- **JWT (JSON Web Tokens)**: Used for stateless session management. Upon login, a token is stored in a secure cookie, which the middleware checks for every `/admin` request.

### 2. End-to-End Data Flow
1. **User Action**: An admin submits a "Create Event" form.
2. **Frontend Logic**: The form data is validated and sent as a JSON payload to `/api/events` via a `POST` request.
3. **API Layer**: The Next.js route handler receives the request, verifies the JWT for authorization, and extracts the payload.
4. **ORM Layer**: Prisma's `prisma.event.create()` method is called with the validated data.
5. **Database**: PostgreSQL executes the insert and returns the created record.
6. **Response**: The API returns a `201 Created` status, and the frontend updates the UI (often triggering a revalidation of the public events page).

---

## 📥 Installation & Connection Details

### 1. Dependency Management
The project uses `npm` for package management. Core dependencies are installed via:
```bash
npm install
```
Key packages include `@prisma/client` for DB access and `lucide-react` for iconography.

### 2. Database Connection
- **Provider**: PostgreSQL.
- **Connection String**: Defined in `.env` as `DATABASE_URL`. This string includes the protocol, user, password, host, port, and database name.
- **Schema Synchronization**: `npx prisma db push` is used during development to sync the `schema.prisma` file with the actual database structure.

#### Vercel Deployment (Neon Database)
For production deployment on Vercel, the app uses a Neon cloud database:
- **Neon Provider**: PostgreSQL hosted on AWS (us-east-1)
- **Connection**: Configured via Vercel Environment Variables
- **Seeding**: Use `seed-vercel.ts` script to populate data:
  ```bash
  set DATABASE_URL=postgresql://neondb_owner:password@ep-xxx.aws.neon.tech/neondb?sslmode=require
  npx tsx seed-vercel.ts
  ```

### 3. Authentication & Security
- **JWT Secret**: A unique `JWT_SECRET` is required in `.env` to sign and verify session tokens.
- **Middleware**: The `src/middleware.ts` file intercepts requests to `/admin/*` and redirects to `/admin/login` if a valid token is missing.

---

## 👤 User & Seed Details

### Default Administrator
When the database is seeded (`npx prisma db seed`), a default admin account is created:
- **Email**: `admin@community.com`
- **Password**: `admin123` (Hashed using `bcryptjs` for security).
- **Role**: `ADMIN`

### Seed Data Parameters
The seeding process creates:
- **3+ Sample Events**: Featuring diverse categories (Social, Workshop, General).
- **5+ Announcements**: Ranging from urgent alerts to general news.
- **Sample Media**: Mock URLs associated with the generated events.

---

## 🔗 Navigation & Routing
- **Dynamic Routes**: `/events/[id]` uses Next.js dynamic routing to fetch and display data based on the UUID of the event.
- **API Endpoints**: Located in `src/app/api/`, following RESTful conventions for clean separation of concerns.

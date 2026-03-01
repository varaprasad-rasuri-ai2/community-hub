# 🏢 Community Hub — Resident Presence & Admin Management

A premium, modern internal web application designed for residential communities. This platform enables administrators to seamlessly manage community events, announcements, and media, while providing residents with a beautiful, real-time interface to stay informed and engaged—all without requiring a resident login.

---

## ✨ Features at a Glance

- **Admin Control Center**: Secure dashboard for managing the community's pulse.
- **Resident-Focused Experience**: Public-facing views for events, announcements, and a media gallery.
- **Premium Aesthetics**: Built with a "Glassmorphism" design language, featuring smooth animations and a curated color palette.
- **Instant Engagement**: Real-time updates for the community's latest happenings.

For a deep-dive into the functional and technical architecture, check out our **[Project Walkthrough](file:///c:/code/temp/community-hub/walkthrough.md)**.

---

## 📖 How to Use

### 🏠 For Residents (Public)
1. **Browse Homepage**: See the hero section for a snapshot of the community's current state.
2. **View Announcements**: Stay informed with a feed of important community-wide updates.
3. **Explore Events**: Visit the `/events` page to find upcoming activities and filter for details.
4. **Gallery**: Preview and view images and videos from past community highlights.

### 🛡️ For Administrators (Private)
1. **Login**: Go to `/admin/login` and use your secure credentials.
2. **Dashboard Overview**: Monitor community engagement at a glance.
3. **Manage Content**: Create, edit, and delete events and announcements.
4. **Media Management**: Associate new images and videos with specific events via the dashboard.

---

## 🛠 Technology Stack

The project leverages a modern, high-performance stack for a seamless developer and user experience:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) — Utilizing server components and optimized routing.
- **Language**: [TypeScript](https://www.typescriptlang.org/) — Ensuring type safety and robust code.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) — For rapid, modern UI development with utility-first classes.
- **Database ORM**: [Prisma](https://www.prisma.io/) — A type-safe ORM for PostgreSQL.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) — Powering smooth, high-end transitions and micro-interactions.
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs) — Secure admin access and password hashing.
- **Icons**: [Lucide React](https://lucide.dev/) — A clean and consistent icon set.

---

## 🏗 Architecture & Configurations

### 📂 Project Structure

- **`/prisma`**: Contains the database schema (`schema.prisma`) and seeding scripts.
- **`/src/app`**: The core of the Next.js App Router, containing pages and API routes.
- **`/src/components`**: Reusable UI building blocks (Cards, Navbar, etc.).
- **`/src/lib`**: Shared utilities like the Prisma client and authentication helpers.
- **`middleware.ts`**: Handles route protection for the `/admin` section.

### 🗄 Database Schema

The database is powered by PostgreSQL and managed via Prisma. Key models include:

- **`User`**: Stores admin credentials (Name, Email, Hashed Password, Role).
- **`Event`**: Community events with details like Title, Description, Date, and Location.
- **`Announcement`**: Important updates broadcasted to all residents.
- **`Media`**: Images and videos associated with specific events.

---

## 🚦 Getting Started

### 1. Prerequisites
- **Node.js**: Version 18.0.0 or higher.
- **Database**: A PostgreSQL instance (local or hosted like Neon/Vercel Postgres).

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/community_hub"
JWT_SECRET="your_secure_random_string"
```

For Vercel deployment, use Neon database:
```env
DATABASE_URL="postgresql://neondb_owner:password@ep-xxx.aws.neon.tech/neondb?sslmode=require"
```

### 4. Database Setup
Initialize the database and generate the Prisma client:
```bash
npx prisma generate
npx prisma db push
```

### 5. Seeding Initial Data (Optional)
Populate your database with a default admin user and sample content:

**Local Development:**
```bash
npx prisma db seed
```

**Vercel/Neon Database:**
```bash
# Set the Neon database URL
set DATABASE_URL=postgresql://neondb_owner:password@ep-xxx.aws.neon.tech/neondb?sslmode=require
npx tsx seed-vercel.ts
```
**Default Admin Credentials:**
- **Email**: `admin@community.com`
- **Password**: `admin123`

### 6. Development Mode
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with hot-reloading. |
| `npm run build` | Builds the application for production. |
| `npm run start` | Starts the production server after building. |
| `npm run lint` | Runs ESLint to identify and fix code quality issues. |

---

## ✅ Verification & Testing

### Automated Checks
- **Linting**: Ensure code consistency by running `npm run lint`.
- **Build Verification**: Run `npm run build` to catch any TypeScript or build-time errors.

### Manual Walkthrough
1. **Public View**: Access the homepage to see the latest announcements and event previews.
2. **Admin Portal**: Navigate to `/admin/login` and authenticate using the default credentials.
3. **Management**: Test creating/editing an event or announcement via the dashboard.
4. **Responsive Design**: Verify the experience across mobile, tablet, and desktop views.

---

## 🗺 Roadmap

- [x] Initial Phase 1 MVP Core Features.
- [ ] Integration with Cloudinary for seamless media uploads.
- [ ] Rich Text Editor support for detailed event descriptions.
- [ ] Integrated search and advanced filtering for events.
- [ ] Push notifications for new community announcements.

---

## 📝 License

This project is licensed for internal community use.

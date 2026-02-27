# 📄 COMMUNITY HUB — PHASE 1 MVP

Deliver a **working internal web app** for your community that allows:
* Admin to manage events, announcements, and media
* Residents to **view everything without login**
* Platform deployed and usable within your apartment

---

## 🚀 Technical Highlights

- **Next.js 16 (App Router)**: Modern structure with full TypeScript and Tailwind CSS integration.
- **Prisma ORM**: Ready-to-use schema for Events, Announcements, and Users.
- **Glassmorphism UI**: A premium, modern aesthetic for both residents and admins.
- **Secure Authentication**: JWT-based login with middleware protection for admin routes.
- **Modular Components**: Reusable `EventCard`, `AnnouncementCard`, `Navbar`, and more.

---

## 📁 Project Structure

### Backend Infrastructure
- [schema.prisma](file:///c:/code/temp/community-hub/prisma/schema.prisma): Database definitions.
- [src/lib](file:///c:/code/temp/community-hub/src/lib/): Database client and authentication helpers.
- [src/app/api](file:///c:/code/temp/community-hub/src/app/api/): RESTful endpoints for Auth, Events, and Announcements.

### Frontend Components
- [src/components](file:///c:/code/temp/community-hub/src/components/): Core UI building blocks with Framer Motion animations.
- [src/app/globals.css](file:///c:/code/temp/community-hub/src/app/globals.css): Custom design tokens and utility classes.

### Pages
- [Homepage](file:///c:/code/temp/community-hub/src/app/page.tsx): Main resident landing page.
- [Events Page](file:///c:/code/temp/community-hub/src/app/events/page.tsx): Interactive list of community activities.
- [Admin Portal](file:///c:/code/temp/community-hub/src/app/admin/login/page.tsx): Secure management interface.

---

## 🛠 Features Implemented

### Project Setup
- Next.js project initialized with Tailwind CSS and TypeScript.
- Essential dependencies: `prisma`, `lucide-react`, `framer-motion`, `jsonwebtoken`, `bcryptjs`, etc.

### Database & Auth
- User, Event, Media, and Announcement models.
- JWT-based authentication flow with cookie management.

### API Routes
- Events: CRUD operations.
- Announcements: List and Create.
- User Login: Secure authentication.

### UI & UX
- Sticky navigation with glassmorphism.
- Premium responsive cards and grids for Events and Gallery.
- Hero sections and animated transitions.

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js installed.
- PostgreSQL or any SQL database reachable via URI.

### 2. Setup
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-postgresql-url"
JWT_SECRET="your-super-secret-key"
```

### 4. Database Initialization
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Project
```bash
npm run dev
```

---

## ✅ Verification Plan

### Automated
- Basic health check of API endpoints.

### Manual
1. **Admin login**: Verify logout/login works and protects routes.
2. **Content Creation**: Create events and announcements via admin dashboard.
3. **Resident View**: Verify the latest content appears on the public homepage.
4. **Responsive Check**: Ensure the UI looks premium on both mobile and desktop.

---

## 🗺️ Project Roadmap & Tracking

This section serves as the living document for project progress.

### ✅ Phase 1: MVP Core (COMPLETED)
- [x] **Project Setup**: Next.js 16, TypeScript, Tailwind CSS 4.
- [x] **Database Schema**: Prisma models for User, Event, Announcement, and Media.
- [x] **Authentication**: JWT-based secure login with middleware protection.
- [x] **Resident UI**: Responsive Homepage, Events list, and Gallery preview.
- [x] **Admin Dashboard**: Overview layout with statistics and management tables.
- [x] **Core API**: Endpoints for Events and Announcements management.

### 🏗️ Phase 2: Refinement (IN PROGRESS)
- [ ] **Data Seeding**: Script to create the initial Admin user and sample content.
- [ ] **Form Validations**: Advanced client-side and server-side validation for admin forms.
- [ ] **Detailed Error Handling**: User-friendly toasts and error states across the app.
- [ ] **Route Protection**: Fine-tuning middleware for all administrative sub-routes.

### 🚀 Future Roadmap (TO DO)
- [ ] **Cloudinary Integration**: Real image/video uploads for the Gallery.
- [ ] **Rich Text Editor**: Add Tiptap or similar for Event descriptions.
- [ ] **Social Sharing**: Meta tags and share buttons for community events.
- [ ] **Search & Filtering**: Fully functional search for the Events page.
- [ ] **Deployment**: One-click deploy setup for Vercel and Railway.

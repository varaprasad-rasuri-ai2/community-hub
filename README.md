# 📄 COMMUNITY HUB — PHASE 1 MVP

A **working internal web app** for your community that allows:
* Admin to manage events, announcements, and media
* Residents to **view everything without login**
* Platform deployed and usable within your apartment

---

## ✅ Build Status

- **Lint**: ✅ Passing
- **Build**: ✅ Successful

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
- `prisma/schema.prisma`: Database definitions (User, Event, Announcement, Media models)
- `src/lib/db.ts`: Prisma client singleton
- `src/lib/auth.ts`: JWT authentication helpers
- `src/middleware.ts`: Route protection middleware
- `src/app/api/`: RESTful endpoints for Auth, Events, and Announcements

### Frontend Components
- `src/components/`: Core UI building blocks with Framer Motion animations
  - `EventCard.tsx`: Event display card with hover animations
  - `AnnouncementCard.tsx`: Announcement display card
  - `Navbar.tsx`: Responsive navigation with glassmorphism
- `src/app/globals.css`: Custom design tokens and utility classes

### Pages
- `/`: Homepage with hero, announcements, events preview, and gallery
- `/events`: Full events listing page
- `/events/[id]`: Individual event details page
- `/announcements`: All announcements page
- `/gallery`: Media gallery page
- `/admin/login`: Admin authentication page
- `/admin/dashboard`: Admin management interface

---

## 🛠 Features Implemented

### Project Setup
- Next.js project initialized with Tailwind CSS 4 and TypeScript.
- Essential dependencies: `prisma`, `lucide-react`, `framer-motion`, `jsonwebtoken`, `bcryptjs`, etc.

### Database & Auth
- User, Event, Media, and Announcement models in Prisma schema.
- JWT-based authentication flow with cookie management.
- Password hashing with bcryptjs.

### API Routes
- **Events**: CRUD operations (GET all, GET by id, POST, PUT, DELETE)
- **Announcements**: List and Create
- **User Login**: Secure authentication with JWT tokens

### UI & UX
- Sticky navigation with glassmorphism effect.
- Premium responsive cards and grids for Events and Gallery.
- Hero sections with animated transitions using Framer Motion.
- Mobile-responsive design with hamburger menu.

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js 18+ installed
- PostgreSQL or any SQL database reachable via URI

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

### 5. Seed Data (Optional)
This will create sample events, announcements, and an admin user:
```bash
npx prisma db seed
```

**Admin Credentials:**
- Email: `admin@community.com`
- Password: `admin123`

### 6. Run the Project
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (includes Prisma generate) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## ✅ Verification Plan

### Automated
- Run `npm run lint` to check code quality
- Run `npm run build` to verify TypeScript and build process

### Manual
1. **Admin login**: Navigate to `/admin/login` and login with:
   - Email: `admin@community.com`
   - Password: `admin123`
2. **Content Creation**: Create events and announcements via admin dashboard.
3. **Resident View**: Verify the latest content appears on the public homepage.
4. **Responsive Check**: Ensure the UI looks premium on both mobile and desktop.

---

## 🗺️ Project Roadmap & Tracking

### ✅ Phase 1: MVP Core (COMPLETED)
- [x] **Project Setup**: Next.js 16, TypeScript, Tailwind CSS 4.
- [x] **Database Schema**: Prisma models for User, Event, Announcement, and Media.
- [x] **Authentication**: JWT-based secure login with middleware protection.
- [x] **Resident UI**: Responsive Homepage, Events list, and Gallery preview.
- [x] **Admin Dashboard**: Overview layout with statistics and management tables.
- [x] **Core API**: Endpoints for Events and Announcements management.

### ✅ Phase 2: Refinement (COMPLETED)
- [x] **Project Documentation**: README.md with full documentation
- [x] **Data Seeding**: Script to create the initial Admin user and sample content.
- [ ] **Form Validations**: Advanced client-side and server-side validation for admin forms.
- [ ] **Detailed Error Handling**: User-friendly toasts and error states across the app.
- [x] **Route Protection**: Fine-tuning middleware for all administrative sub-routes.

### 🚀 Future Roadmap (TO DO)
- [ ] **Cloudinary Integration**: Real image/video uploads for the Gallery.
- [ ] **Rich Text Editor**: Add Tiptap or similar for Event descriptions.
- [ ] **Social Sharing**: Meta tags and share buttons for community events.
- [ ] **Search & Filtering**: Fully functional search for the Events page.
- [ ] **Deployment**: One-click deploy setup for Vercel and Railway.

---

## 📝 License

This project is for internal community use.

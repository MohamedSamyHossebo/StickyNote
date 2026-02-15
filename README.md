# 📝 Notes App

A full-stack notes management application built with **Next.js 16**, **TanStack Query**, and **shadcn/ui**. Features user authentication, CRUD operations on notes, and a responsive Arabic (RTL) interface.

## ✨ Features

- **Authentication** — Register, Login, Logout with JWT tokens
- **Notes CRUD** — Create, Read, Update, Delete notes
- **Notes Table** — TanStack Table with view/edit/delete actions
- **Notes Cards** — Responsive card grid with skeleton loading
- **Note Detail** — Dynamic route for viewing single notes (`/notes/[id]`)
- **Toast Notifications** — Success/error feedback via react-toastify
- **RTL Support** — Full Arabic interface
- **Loading & 404 Pages** — Polished loading state and custom 404

## 🛠️ Tech Stack

| Layer         | Technology                |
| ------------- | ------------------------- |
| Framework     | Next.js 16 (App Router)   |
| Language      | TypeScript                |
| UI Components | shadcn/ui (Radix Lyra)    |
| Styling       | Tailwind CSS v4           |
| Data Fetching | TanStack Query            |
| Table         | TanStack Table            |
| Forms         | Formik + Yup              |
| HTTP Client   | Axios (with interceptors) |
| Auth          | JWT + js-cookie           |
| Icons         | Lucide React              |
| Notifications | React Toastify            |

## 📁 Project Structure

```
├── app/
│   ├── home/           # Home page with notes table
│   ├── login/          # Login page
│   ├── register/       # Register page
│   ├── notes/          # Notes list page
│   │   └── [id]/       # Note detail page (dynamic segment)
│   ├── loading.tsx     # Global loading state
│   ├── not-found.tsx   # Custom 404 page
│   └── layout.tsx      # Root layout
├── api/
│   ├── models/         # TypeScript interfaces
│   └── services/       # API service functions (auth, notes, user)
├── components/
│   ├── auth/           # Login & Register forms
│   ├── notes/          # NotesTable, NoteCard, AddNoteDialog, EditNoteDialog, CreateNoteForm
│   └── ui/             # shadcn/ui components
├── hooks/
│   ├── auth/           # useAuth, useLogout
│   └── notes/          # useNotes, useGetNote, useCreateNote, useUpdateNote, useDeleteNote
├── lib/                # Axios instance, utils
├── providers/          # TanStack Query provider
└── middleware.ts       # Auth middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
NEXT_PUBLIC_BASE_URL=https://your-api-domain.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

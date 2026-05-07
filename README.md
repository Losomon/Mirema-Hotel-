# Mirema Hotel 🏨

[![Astro](https://img.shields.io/badge/Astro-4.15.9-purple)](https://astro.build)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node-20-green)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://typescriptlang.org)
[![MIT License](https://img.shields.io/github/license/solom-mirema/Mirema-Hotel-)](LICENSE)
[![Issues](https://img.shields.io/github/issues/solom-mirema/Mirema-Hotel-)](https://github.com/solom-mirema/Mirema-Hotel-/issues)

Mirema Hotel is a modern full-stack web platform for hotel management and online booking. Featuring a responsive frontend built with Astro, React, TypeScript, and Tailwind CSS, integrated with Wix CMS/members, and a Node.js/Express/MongoDB backend API for rooms and bookings.

## ✨ Features

### Frontend
- Responsive hotel homepage, room listings, gallery, services, contact pages
- Modern UI components (Radix UI + Tailwind)
- Wix integrations: CMS (ecom), Members (auth)
- Client-side routing, forms with validation
- Mobile-first design, optimized performance

### Backend
- REST API: `/api/rooms` (full CRUD, MongoDB), `/api/bookings` (full CRUD)
- JWT authentication with admin/member roles
- Express server with CORS, health checks
- Mongoose ODM with validation

### Additional
- Testing with Vitest
- ESLint/Prettier standards
- Deployment-ready (Cloudflare, Vercel, etc.)

Live demo: [TBD](https://mirema-hotel.com)

## 📁 Project Structure

```
Mirema-Hotel-/
├── README.md              # This file
├── LICENSE                # MIT License
├── TODO.md               # Progress tracker
├── backend/               # Node/Express API
│   ├── server.js
│   ├── package.json
│   └── README.md
├── frontend/              # Astro/React app
│   ├── src/
│   ├── integrations/      # Wix CMS/Members
│   ├── package.json
│   └── README.md
└── .github/               # Templates & policies
    ├── ISSUE_TEMPLATE/
    ├── pull_request_template.md
    ├── CONTRIBUTING.md
    └── ...
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn
- MongoDB (local/Atlas for backend)
- Wix account (frontend integrations)

### Frontend
```bash
cd frontend
npm install
npm run dev  # http://localhost:4321
```

### Backend
```bash
cd backend
cp .env.example .env  # Set MONGO_URI
npm install
npm run dev  # http://localhost:5000
```

### Full Stack
Run both servers, frontend proxies API or update base URL.

## 🛠️ Tech Stack

| Category | Tech |
|----------|------|
| Frontend | Astro, React, TypeScript, Tailwind CSS, Radix UI, Zustand, React Hook Form + Zod |
| Backend | Node.js, Express, Mongoose/MongoDB |
| Tools | Vite, Vitest, ESLint, PostCSS |
| Integrations | Wix CMS, Members |
| Deployment | Cloudflare Pages, Vercel, Railway |

## 🔧 Development

- `npm run dev` (frontend/backend)
- `npm run build` & `npm run preview`
- `npm run test:run`
- Commit linting: husky optional

## 🚀 Deployment

- **Frontend**: `npm run build` → Cloudflare/Vercel/Netlify
- **Backend**: Railway/Render/Heroku → Set env vars

## 🤝 Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines. Welcome all contributions!

## 📄 License

This project is [MIT licensed](LICENSE).

## 🙌 Acknowledgments

- [Astro](https://astro.build), [Wix Vibe](https://wix.dev), Tailwind, Radix UI
- Built with ❤️ for Mirema Hotel

---

⭐ Star on GitHub if useful! Questions? [Open an issue](https://github.com/solom-mirema/Mirema-Hotel-/issues/new)

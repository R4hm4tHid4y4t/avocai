# AvocAI — Tugas 7: Next.js Company Profile

Platform klasifikasi kematangan alpukat berbasis AI, dibangun dengan **Next.js 14 App Router**.

## Struktur Proyek

```
app/
├── layout.js              # Global layout (Navbar + Footer)
├── page.js                # Halaman utama (/)
├── about/page.js          # Halaman tentang kami (/about)
├── services/page.js       # Halaman layanan & harga (/services)
├── contact/page.js        # Halaman kontak (/contact)
├── blog/
│   ├── page.js            # Daftar artikel (/blog)
│   └── [slug]/page.js     # Detail artikel — dynamic route
└── api/contact/route.js   # API endpoint POST /api/contact

components/
├── Navbar.jsx             # Client Component (scroll + mobile menu)
├── Footer.jsx             # Server Component
└── ContactForm.jsx        # Client Component (form interaktif)

data/
└── articles.json          # Data artikel blog (local JSON)
```

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Deploy ke Vercel

1. Push ke GitHub
2. Import repo di [vercel.com](https://vercel.com)
3. Framework preset: **Next.js** (auto-detect)
4. Klik Deploy

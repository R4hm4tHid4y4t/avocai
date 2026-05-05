# AvocAI — Platform Klasifikasi Kematangan Alpukat

Platform klasifikasi kematangan alpukat berbasis AI, dibangun dengan **Next.js 14 App Router**.

---

## Tugas Modul 7: Next.js Company Profile

Membangun halaman company profile lengkap dengan Next.js App Router.

### Struktur Proyek

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

---

## Tugas Modul 8: MVP dengan Supabase

Mengimplementasikan **Minimum Viable Product** dengan fitur form interaktif yang terhubung ke database Supabase.

### Fitur yang Diimplementasikan

- ✅ **Core Feature** — Form kontak interaktif dengan validasi
- ✅ **Supabase Setup** — Tabel `messages` + koneksi API Key
- ✅ **Server Action** — Fungsi `kirimPesan()` menyimpan data ke database
- ✅ **Loading State** — Spinner animasi saat form dikirim
- ✅ **Notifikasi Sukses/Error** — Feedback visual setelah submit

### Tambahan Struktur Modul 8

```
app/contact/
├── page.js                # Halaman kontak (diperbarui)
├── contact-form.jsx       # Client Component — form + UX feedback
├── actions.js             # Server Action — simpan ke Supabase
└── contact.module.css     # Styling CSS Module

lib/
└── supabase.js            # Supabase client
```

### Environment Variables

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Deploy ke Vercel

1. Push ke GitHub
2. Import repo di [vercel.com](https://vercel.com)
3. Tambahkan environment variables di Vercel dashboard
4. Framework preset: **Next.js** (auto-detect)
5. Klik Deploy

## Links

- **GitHub:** https://github.com/R4hm4tHid4y4t/avocai
- **Vercel:** https://avocai.vercel.app
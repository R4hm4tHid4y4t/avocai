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

# Tugas Minggu 9 — The Professional Upgrade

Panduan integrasi semua file ke dalam project **avocai** (Next.js + Supabase).

---

## 📁 Struktur File yang Perlu Ditambahkan

```
avocai/
├── middleware.ts                        ← Task 1 (root project)
├── app/
│   ├── lib/
│   │   └── validations.ts               ← Task 2 (Zod schemas)
│   ├── actions/
│   │   └── chat-actions.ts              ← Task 2 (Server Actions + Zod)
│   ├── components/
│   │   ├── SearchBar.tsx                ← Task 3 (URL as State)
│   │   ├── ChatForm.tsx                 ← Task 2 (Form + error display)
│   │   └── DataList.tsx                 ← Task 4 (Optimistic UI)
│   ├── dashboard/
│   │   ├── page.tsx                     ← Halaman utama (semua task)
│   │   └── loading.tsx                  ← Task 4 (Skeleton UI)
│   └── login/
│       └── page.tsx                     ← Halaman login
```

---

## 🚀 Langkah Integrasi

### 1. Install Zod
```bash
npm install zod
```

### 2. Salin semua file ke project kamu
Salin setiap file sesuai path yang tertera di struktur di atas.

### 3. Sesuaikan nama tabel Supabase
Di dalam `app/actions/chat-actions.ts` dan `app/dashboard/page.tsx`,
ganti `.from("chats")` dengan nama tabel yang kamu buat di Minggu 8.

### 4. Sesuaikan nama cookie session
Di `middleware.ts`, pastikan nama cookie sesuai dengan yang di-set oleh
Supabase Auth di project kamu. Biasanya:
- `sb-<project-ref>-auth-token`
- Atau `sb-access-token`

Cek nama cookie di browser DevTools → Application → Cookies setelah login.

### 5. Pastikan `app/lib/supabase/server.ts` sudah ada
File ini dari Tugas Minggu 8. Jika belum ada, buat dengan:
```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

---

## ✅ Definition of Done — Checklist

| Syarat | File yang Mengimplementasikan |
|--------|-------------------------------|
| ✅ Dashboard tidak bisa dibuka tanpa login | `middleware.ts` |
| ✅ Form error jika format salah | `ChatForm.tsx` + `chat-actions.ts` + `validations.ts` |
| ✅ Hasil pencarian tersimpan di URL | `SearchBar.tsx` + `dashboard/page.tsx` |
| ✅ Hapus data terasa instan (Optimistic UI) | `DataList.tsx` |
| ✅ Skeleton Loading saat berpindah rute | `dashboard/loading.tsx` |

---

## 📌 Catatan Penting

- **`middleware.ts` harus di root project** (sejajar dengan folder `app/`), bukan di dalam `app/`.
- `loading.tsx` bekerja **otomatis** — Next.js App Router menampilkannya saat Server Component sedang fetch data. Kamu tidak perlu memanggil komponen ini secara manual.
- `useOptimistic` di `DataList.tsx` membutuhkan React 19 (sudah bundle di Next.js 15).
- Semua validasi Zod berjalan di **server** (dalam Server Action), bukan di client, sehingga lebih aman.

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

# Tugas Modul 9 — The Professional Upgrade

## Struktur File Baru

```
middleware.js                          ← Task 1: Route protection
app/
├── login/
│   ├── page.js                        ← Halaman login admin
│   ├── actions.js                     ← Server Action login/logout
│   └── login.module.css
├── dashboard/
│   ├── page.js                        ← Dashboard (Server Component)
│   ├── search-bar.jsx                 ← Task 3: URL as State
│   ├── messages-list.jsx              ← Task 4: Optimistic UI
│   ├── loading.js                     ← Task 4: Skeleton Loading
│   ├── actions.js                     ← Server Action: hapus pesan
│   └── dashboard.module.css
├── contact/
│   ├── actions.js                     ← Task 2: Zod Validation (UPDATE)
│   ├── contact-form.jsx               ← Task 2: Field errors (UPDATE)
│   └── contact.module.css             ← Tambah style error (UPDATE)
lib/
└── supabase-admin.js                  ← Supabase server client
sql/
└── update-rls.sql                     ← Update RLS Supabase
```

## Langkah Setup

### 1. Install Zod
```bash
npm install zod
```

### 2. Update RLS di Supabase
Buka Supabase SQL Editor → paste isi `sql/update-rls.sql` → Run

### 3. Salin Semua File
Salin file-file di atas ke project sesuai path-nya.

### 4. Jalankan & Test
```bash
npm run dev
```

Test checklist:
- [ ] Buka `/dashboard` tanpa login → harus redirect ke `/login`
- [ ] Login dengan admin / avocai2024 → masuk ke dashboard
- [ ] Isi form kontak dengan email salah → muncul error per field
- [ ] Ketik di search box → URL berubah, data terfilter
- [ ] Refresh halaman saat search aktif → hasil tetap ada
- [ ] Klik Hapus → pesan langsung hilang (Optimistic UI)
- [ ] Navigasi ke dashboard → Skeleton Loading muncul sebentar

### 5. Push ke GitHub & Deploy
```bash
git add .
git commit -m "feat: professional upgrade - modul 9 (middleware, zod, url state, optimistic ui)"
git push origin main
```

## Kredensial Admin
- Username: `admin`
- Password: `avocai2026`

# Tugas Modul 10 — The Grand Launch: Final Release

# 🥑 AvocAI Dashboard

> **Sistem Deteksi Tingkat Kematangan Buah Alpukat Berbasis Algoritma Convolutional Neural Network (CNN)**

AvocAI adalah platform *Software as a Service* (SaaS) berbasis web yang dirancang untuk mengklasifikasikan varietas dan tingkat kematangan buah alpukat secara instan. Menggunakan arsitektur Convolutional Neural Network (CNN), sistem ini membantu mengoptimalkan proses pemilahan pasca-panen dengan cepat, akurat, dan efisien.

---

## ✨ Fitur Utama

* **🧠 Klasifikasi AI Instan:** Mengunggah gambar alpukat dan mendapatkan hasil inferensi tingkat kematangan secara *real-time* dengan model CNN.
* **📊 Analitik & Visualisasi:** Dasbor interaktif yang melacak performa model, akurasi rata-rata, dan statistik deteksi harian.
* **🔐 Autentikasi Aman:** Sistem *login* dan *register* yang dilindungi oleh Next.js Middleware dan dieksekusi melalui *Server Actions*.
* **📱 UI/UX Modern:** Antarmuka responsif level *enterprise* yang dibangun menggunakan Tailwind CSS, dilengkapi animasi mulus (*animate-fade-in*) dan desain *glassmorphism*.
* **💳 Manajemen Langganan (Billing):** Simulasi pelacakan penggunaan API klasifikasi dan paket *Pro Plan*.

---

## 🥑 Kategori Kematangan Algoritma

Sistem klasifikasi ini dilatih untuk mengidentifikasi 4 fase utama pasca-panen buah alpukat:

| Status | Indikator Visual | Deskripsi | Rekomendasi |
| :--- | :--- | :--- | :--- |
| ⚪ **Mentah** | Abu-abu / Slate | Tekstur sangat keras, warna kulit belum merata. | Belum siap panen / tunggu beberapa hari. |
| 🟡 **Setengah Matang** | Kuning / Amber | Mulai sedikit melunak, namun belum sempurna. | Peram 2-3 hari lagi di suhu ruang. |
| 🟢 **Matang** | Hijau / Green | Tekstur lembut ideal, siap dikupas. | Kondisi paling optimal untuk dikonsumsi. |
| 🔴 **Terlalu Matang** | Merah / Red | Sangat lunak, kulit cenderung gelap/rusak. | Sangat cocok diolah menjadi jus atau *smoothie*. |

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan *stack* teknologi web modern:

* **Framework Utama:** [Next.js 14+](https://nextjs.org/) (App Router, Server Actions)
* **Bahasa Pemrograman:** TypeScript & JavaScript
* **Desain Antarmuka:** [Tailwind CSS v3](https://tailwindcss.com/)
* **Deployment & Infrastruktur:** [Vercel](https://vercel.com/)
* **Keamanan:** Next.js Middleware untuk proteksi rute halaman

---

## 🚀 Panduan Instalasi (Local Development)

Untuk menjalankan proyek ini secara lokal di mesin Anda, ikuti langkah-langkah berikut:

1. **Kloning Repositori**
   ```bash
   git clone [https://github.com/r4hm4thid4y4t/avocai.git](https://github.com/r4hm4thid4y4t/avocai.git)
   cd avocai

2. **Instalasi Dependensi**
    **Pastikan Anda menggunakan Node.js versi terbaru, lalu jalankan:**
    ```bash
    npm install
    
3.  **Jalankan Server Mode Pengembangan**
    ```bash
    npm run dev

4.  **Akses Aplikasi**
    **Buka http://localhost:3000 di peramban (browser) Anda.**

**(Catatan: Anda dapat masuk ke dasbor menggunakan kombinasi kredensial uji coba: Email admin@avocai.id dan Password avocai2026).**

**👨‍💻 Pengembang Utama**
**Proyek ini dikembangkan sebagai prototipe sistem cerdas yang mengintegrasikan Machine Learning ke dalam ekosistem aplikasi web modern.**

**Rahmat Hidayat Mahasiswa Program Studi D4 Teknologi Rekayasa Perangkat Lunak**

**Politeknik Negeri Padang**

**© 2026 AvocAI Project. All rights reserved.**
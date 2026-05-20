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

> **Sistem Deteksi Varietas dan Tingkat Kematangan Buah Alpukat Berbasis Algoritma Convolutional Neural Network (CNN)**

AvocAI adalah platform *Software as a Service* (SaaS) berbasis web yang dirancang untuk mengklasifikasikan varietas dan tingkat kematangan buah alpukat secara instan dalam satu kali proses inferensi. Menggunakan arsitektur Convolutional Neural Network (CNN), sistem ini membantu mengoptimalkan proses pemilahan pasca-panen dengan cepat, akurat, dan efisien untuk kebutuhan industri agritech.

---

## ✨ Fitur Utama

* **🧠 Klasifikasi Multi-Kelas AI Instan:** Mengunggah foto buah untuk mengekstrak fitur fisik guna mendeteksi jenis varietas sekaligus fase kematangan secara *real-time*.
* **📊 Analitik & Visualisasi:** Dasbor interaktif yang melacak performa model, akurasi rata-rata, dan statistik distribusi hasil klasifikasi harian.
* **🔐 Autentikasi Aman:** Sistem *login* dan *register* yang dilindungi oleh Next.js Middleware dan dieksekusi secara efisien melalui *Server Actions*.
* **📱 UI/UX Modern:** Antarmuka responsif level *enterprise* yang dibangun menggunakan Tailwind CSS, dilengkapi animasi mulus (*animate-fade-in*) dan tata letak simetris (*centered layout*).
* **💳 Manajemen Langganan (Billing):** Simulasi pelacakan penggunaan kuota API klasifikasi dan pengelolaan paket *Pro Plan*.

---

## 🤖 Cakupan Klasifikasi Model CNN

Model cerdas pada sistem AvocAI dilatih secara khusus untuk mengenali kombinasi dari varietas buah dan karakteristik fisik luar sebagai berikut:

### 1. Klasifikasi Varietas Buah
Sistem mampu mengidentifikasi 2 jenis varietas alpukat unggulan yang paling banyak dibudidayakan:
* **Alpukat Miki:** Karakteristik buah cenderung bulat, ukuran sedang, dengan permukaan kulit yang relatif halus.
* **Alpukat Aligator:** Karakteristik bentuk buah memanjang (berbentuk seperti gada), berukuran besar, dengan tekstur kulit yang cenderung lebih bergelombang.

### 2. Kategori Tingkat Kematangan Pasca-Panen
Fase kematangan dibagi menjadi 4 tingkatan baku yang dilengkapi dengan indikator warna sistem:

| Status | Indikator Visual | Deskripsi Karakteristik | Rekomendasi Tindakan |
| :--- | :--- | :--- | :--- |
| ⚪ **Mentah** | Abu-abu / Slate | Tekstur sangat keras, kandungan pati tinggi, warna kulit hijau terang merata. | Belum siap panen / lakukan proses penyimpanan lebih lanjut. |
| 🟡 **Setengah Matang** | Kuning / Amber | Buah mulai sedikit melunak di beberapa bagian, namun belum merata sempurna. | Peram selama 2-3 hari lagi pada suhu ruang. |
| 🟢 **Matang** | Hijau / Green | Tekstur lembut ideal saat ditekan perlahan, aroma khas keluar, siap dikupas. | Kondisi paling optimal untuk konsumsi langsung atau distribusi pasar. |
| 🔴 **Terlalu Matang** | Merah / Red | Tekstur sangat lunak, kulit cenderung gelap. | Memiliki tingkat kemanisan tertinggi, sangat cocok diolah menjadi jus/smoothie. |

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan *stack* teknologi web modern:

* **Framework Utama:** [Next.js 14+](https://nextjs.org/) (App Router, Server Actions)
* **Bahasa Pemrograman:** TypeScript & JavaScript
* **Desain Antarmuka:** [Tailwind CSS v3](https://tailwindcss.com/)
* **Deployment & Infrastruktur:** [Vercel](https://vercel.com/)
* **Keamanan Rute:** Next.js Middleware untuk proteksi hak akses halaman dasbor

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
import Link from 'next/link';
import styles from './services.module.css';

export const metadata = {
  title: 'Layanan',
  description: 'Paket layanan AvocAI — dari Starter gratis hingga Enterprise untuk skala besar.',
};

const paketHarga = [
  {
    nama: 'Starter',
    harga: 'Gratis',
    periode: 'Selamanya',
    populer: false,
    fitur: [
      '100 klasifikasi / bulan',
      'Unggah gambar manual',
      '4 kelas kematangan',
      'Riwayat 7 hari',
      'Dukungan via email',
    ],
  },
  {
    nama: 'Pro',
    harga: 'Rp 299rb',
    periode: 'per bulan, tagih tahunan',
    populer: true,
    fitur: [
      'Klasifikasi tak terbatas',
      'Kamera real-time',
      'Laporan & ekspor CSV',
      'Akses API penuh',
      'Riwayat 1 tahun',
      'Dukungan prioritas',
    ],
  },
  {
    nama: 'Enterprise',
    harga: 'Kustom',
    periode: 'Hubungi kami',
    populer: false,
    fitur: [
      'Semua fitur Pro',
      'Model AI kustom',
      'Integrasi ERP / WMS',
      'SLA 99.9% uptime',
      'Onboarding dedicated',
      'Account manager',
    ],
  },
];

const daftarLayanan = [
  {
    ikon: '📷',
    judul: 'Klasifikasi via Kamera',
    deskripsi:
      'Hubungkan kamera IP atau USB langsung ke platform kami. Deteksi kematangan berjalan otomatis pada setiap frame tanpa intervensi manual.',
  },
  {
    ikon: '🖼️',
    judul: 'Unggah Gambar',
    deskripsi:
      'Upload foto satu per satu atau dalam batch. Sistem memproses dan mengembalikan hasil klasifikasi beserta confidence score dalam hitungan detik.',
  },
  {
    ikon: '🔌',
    judul: 'REST API',
    deskripsi:
      'Integrasikan kecerdasan AvocAI ke dalam sistem Anda sendiri. API kami mendukung JSON, multipart upload, dan webhook untuk notifikasi real-time.',
  },
  {
    ikon: '📈',
    judul: 'Analitik & Laporan',
    deskripsi:
      'Dashboard interaktif untuk memantau tren kualitas, distribusi kelas, dan perbandingan antar periode. Ekspor data ke CSV kapan saja.',
  },
];

export default function HalamanServices() {
  return (
    <>
      {/* Header */}
      <section className={styles.headerHalaman}>
        <div className="container">
          <span className="badge">🛠️ Layanan Kami</span>
          <h1 className="judul-seksi" style={{ marginTop: 12 }}>
            Solusi Lengkap untuk Setiap Skala
          </h1>
          <p className="subjudul-seksi" style={{ marginTop: 12 }}>
            Dari petani perorangan hingga perusahaan distribusi besar — AvocAI punya paket
            yang tepat untuk kebutuhan Anda.
          </p>
        </div>
      </section>

      {/* Daftar layanan */}
      <section>
        <div className="container">
          <div className="kepala-seksi">
            <span className="badge">⚙️ Apa yang Kami Tawarkan</span>
            <h2 className="judul-seksi">Empat Cara Menggunakan AvocAI</h2>
          </div>
          <div className={styles.gridLayanan}>
            {daftarLayanan.map((l) => (
              <div key={l.judul} className={styles.kartuLayanan}>
                <div className={styles.ikonLayanan}>{l.ikon}</div>
                <h3 className={styles.judulLayanan}>{l.judul}</h3>
                <p className={styles.deskripsiLayanan}>{l.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Harga */}
      <section id="harga" style={{ background: 'var(--krem-gelap)' }}>
        <div className="container">
          <div className="kepala-seksi">
            <span className="badge">💰 Harga Transparan</span>
            <h2 className="judul-seksi">Pilih Paket yang Sesuai</h2>
            <p className="subjudul-seksi">
              Semua paket sudah termasuk uji coba gratis 14 hari. Tidak perlu kartu kredit.
            </p>
          </div>

          <div className={styles.gridHarga}>
            {paketHarga.map((paket) => (
              <div
                key={paket.nama}
                className={`${styles.kartuHarga} ${paket.populer ? styles.populer : ''}`}
              >
                {paket.populer && (
                  <span className={styles.labelPopuler}>⭐ Paling Populer</span>
                )}
                <p className={styles.namaPaket}>{paket.nama}</p>
                <p className={styles.hargaNominal}>{paket.harga}</p>
                <p className={styles.hargaPeriode}>{paket.periode}</p>
                <hr className={styles.garisPembatas} />
                <ul className={styles.daftarFiturHarga}>
                  {paket.fitur.map((f) => (
                    <li key={f}>
                      <span className={styles.centang}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={paket.populer ? styles.tombolPilihPopuler : styles.tombolPilih}
                >
                  {paket.harga === 'Kustom' ? 'Hubungi Sales' : paket.harga === 'Gratis' ? 'Daftar Gratis' : 'Mulai Uji Coba'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import styles from './about.module.css';

export const metadata = {
  title: 'Tentang Kami',
  description: 'Kenali tim dan misi di balik platform klasifikasi alpukat AvocAI.',
};

const anggotaTim = [
  { nama: 'Rizki Pratama', peran: 'CEO & Co-founder', inisial: 'RP', warna: '#52b788' },
  { nama: 'Sari Utami', peran: 'Head of AI Research', inisial: 'SU', warna: '#e9c46a' },
  { nama: 'Bima Hendra', peran: 'Lead Backend Engineer', inisial: 'BH', warna: '#f4a261' },
  { nama: 'Dinda Ayu', peran: 'Product Designer', inisial: 'DA', warna: '#2d6a4f' },
];

const nilaiPerusahaan = [
  { ikon: '🌱', judul: 'Berdampak Nyata', deskripsi: 'Setiap fitur yang kami bangun harus memberikan manfaat konkret bagi petani di lapangan.' },
  { ikon: '🔬', judul: 'Berbasis Data', deskripsi: 'Keputusan produk dan teknologi kami selalu didukung oleh riset dan pengujian yang ketat.' },
  { ikon: '🤝', judul: 'Kolaboratif', deskripsi: 'Kami percaya solusi terbaik lahir dari mendengarkan pengguna dan bermitra dengan komunitas tani.' },
];

// Server Component — data diambil langsung, tidak ada interaksi browser
export default function HalamanAbout() {
  return (
    <>
      {/* Header halaman */}
      <section className={styles.headerHalaman}>
        <div className="container">
          <span className="badge">🏢 Tentang Kami</span>
          <h1 className="judul-seksi" style={{ marginTop: 12 }}>
            Membangun Masa Depan Agritech Indonesia
          </h1>
          <p className="subjudul-seksi" style={{ marginTop: 12 }}>
            AvocAI lahir dari keresahan nyata: terlalu banyak alpukat berkualitas baik yang
            terbuang karena proses grading manual yang lambat dan tidak konsisten.
          </p>
        </div>
      </section>

      {/* Cerita */}
      <section>
        <div className="container">
          <div className={styles.gridCerita}>
            <div className={styles.tekscerita}>
              <h2 className="judul-seksi">Dari Kebun ke Teknologi</h2>
              <p>
                Ide AvocAI bermula pada 2024 ketika pendiri kami menghabiskan sebulan bersama
                petani alpukat di Banyuwangi. Mereka menyaksikan bagaimana proses grading manual
                memakan waktu berjam-jam dan hasilnya pun tidak konsisten antar pekerja.
              </p>
              <p style={{ marginTop: 16 }}>
                Dengan latar belakang machine learning dan semangat untuk memecahkan masalah
                nyata, tim kecil kami mulai membangun model computer vision pertama menggunakan
                ratusan foto alpukat yang kami kumpulkan sendiri. Setelah 8 bulan iterasi,
                AvocAI resmi diluncurkan pada Maret 2025.
              </p>
            </div>
            <div className={styles.kotakVisi}>
              <div className={styles.itemVisi}>
                <h3>🎯 Misi</h3>
                <p>Memberdayakan petani dan bisnis agritech Indonesia dengan teknologi AI yang terjangkau dan mudah digunakan.</p>
              </div>
              <div className={styles.itemVisi}>
                <h3>🔭 Visi</h3>
                <p>Menjadi infrastruktur AI terpercaya untuk seluruh rantai pasok produk hortikultura di Asia Tenggara.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai perusahaan */}
      <section style={{ background: 'var(--krem-gelap)' }}>
        <div className="container">
          <div className="kepala-seksi">
            <span className="badge">💡 Nilai Kami</span>
            <h2 className="judul-seksi">Prinsip yang Memandu Kami</h2>
          </div>
          <div className={styles.gridNilai}>
            {nilaiPerusahaan.map((n) => (
              <div key={n.judul} className={styles.kartuNilai}>
                <span className={styles.ikonNilai}>{n.ikon}</span>
                <h3 className={styles.judulNilai}>{n.judul}</h3>
                <p className={styles.deskripsiNilai}>{n.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tim */}
      <section>
        <div className="container">
          <div className="kepala-seksi">
            <span className="badge">👥 Tim Kami</span>
            <h2 className="judul-seksi">Orang-orang di Balik AvocAI</h2>
          </div>
          <div className={styles.gridTim}>
            {anggotaTim.map((anggota) => (
              <div key={anggota.nama} className={styles.kartuTim}>
                <div
                  className={styles.avatarTim}
                  style={{ background: anggota.warna }}
                >
                  {anggota.inisial}
                </div>
                <h3 className={styles.namaTim}>{anggota.nama}</h3>
                <p className={styles.peranTim}>{anggota.peran}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

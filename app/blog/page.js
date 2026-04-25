import Link from 'next/link';
import { readFileSync } from 'fs';
import { join } from 'path';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog',
  description: 'Artikel, panduan, dan studi kasus seputar teknologi AI untuk agritech dari tim AvocAI.',
};

// Server Component — baca data langsung di server, tanpa useEffect
function ambilSemuaArtikel() {
  const filePath = join(process.cwd(), 'data', 'articles.json');
  const rawData = readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}

const warnaKategori = {
  Teknologi: { bg: 'rgba(82, 183, 136, 0.12)', teks: '#2d6a4f' },
  Pertanian: { bg: 'rgba(233, 196, 106, 0.2)', teks: '#8a6a00' },
  Developer: { bg: 'rgba(244, 162, 97, 0.15)', teks: '#c0622a' },
  'Studi Kasus': { bg: 'rgba(26, 58, 42, 0.08)', teks: '#1a3a2a' },
};

export default function HalamanBlog() {
  const artikels = ambilSemuaArtikel();
  const [artikelUtama, ...artikelLainnya] = artikels;

  return (
    <>
      {/* Header */}
      <section className={styles.headerHalaman}>
        <div className="container">
          <span className="badge">📝 Blog AvocAI</span>
          <h1 className="judul-seksi" style={{ marginTop: 12 }}>
            Wawasan dari Lapangan & Laboratorium
          </h1>
          <p className="subjudul-seksi" style={{ marginTop: 12 }}>
            Artikel mendalam tentang AI, agritech, dan kisah nyata pengguna AvocAI.
          </p>
        </div>
      </section>

      {/* Konten blog */}
      <section>
        <div className="container">

          {/* Artikel unggulan */}
          <Link href={`/blog/${artikelUtama.slug}`} className={styles.kartuUnggulan}>
            <div className={styles.infoUnggulan}>
              <span
                className={styles.badgeKategori}
                style={warnaKategori[artikelUtama.kategori] ?? {}}
              >
                {artikelUtama.kategori}
              </span>
              <h2 className={styles.judulUnggulan}>{artikelUtama.judul}</h2>
              <p className={styles.ringkasanUnggulan}>{artikelUtama.ringkasan}</p>
              <div className={styles.metaArtikel}>
                <span>✍️ {artikelUtama.penulis}</span>
                <span>📅 {artikelUtama.tanggal}</span>
                <span>⏱ {artikelUtama.waktuBaca}</span>
              </div>
            </div>
            <div className={styles.gambarkUnggulan}>
              <span>🥑</span>
            </div>
          </Link>

          {/* Grid artikel lainnya */}
          <div className={styles.gridArtikel}>
            {artikelLainnya.map((artikel) => (
              <Link key={artikel.id} href={`/blog/${artikel.slug}`} className={styles.kartuArtikel}>
                <div className={styles.headerKartu}>
                  <span
                    className={styles.badgeKategori}
                    style={warnaKategori[artikel.kategori] ?? {}}
                  >
                    {artikel.kategori}
                  </span>
                  <span className={styles.waktuBaca}>⏱ {artikel.waktuBaca}</span>
                </div>
                <h3 className={styles.judulArtikel}>{artikel.judul}</h3>
                <p className={styles.ringkasanArtikel}>{artikel.ringkasan}</p>
                <div className={styles.footerKartu}>
                  <span className={styles.penulis}>✍️ {artikel.penulis}</span>
                  <span className={styles.tanggal}>{artikel.tanggal}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

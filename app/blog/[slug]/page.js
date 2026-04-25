import Link from 'next/link';
import { readFileSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';
import styles from './slug.module.css';

// Server Component — dynamic route /blog/[slug]
function ambilSemuaArtikel() {
  const filePath = join(process.cwd(), 'data', 'articles.json');
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

// Buat semua static path saat build time
export async function generateStaticParams() {
  const artikels = ambilSemuaArtikel();
  return artikels.map((a) => ({ slug: a.slug }));
}

// Metadata dinamis per halaman
export async function generateMetadata({ params }) {
  const artikels = ambilSemuaArtikel();
  const artikel = artikels.find((a) => a.slug === params.slug);
  if (!artikel) return { title: 'Artikel tidak ditemukan' };
  return {
    title: artikel.judul,
    description: artikel.ringkasan,
  };
}

export default function HalamanDetailBlog({ params }) {
  const artikels = ambilSemuaArtikel();
  const artikel = artikels.find((a) => a.slug === params.slug);

  if (!artikel) notFound();

  // Artikel lain untuk rekomendasi
  const artikelLain = artikels.filter((a) => a.slug !== params.slug).slice(0, 2);

  return (
    <div className={styles.wrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        <Link href="/">Beranda</Link>
        <span>›</span>
        <Link href="/blog">Blog</Link>
        <span>›</span>
        <span>{artikel.kategori}</span>
      </nav>

      {/* Header artikel */}
      <header className={styles.headerArtikel}>
        <span className={styles.badgeKategori}>{artikel.kategori}</span>
        <h1 className={styles.judulArtikel}>{artikel.judul}</h1>
        <p className={styles.ringkasan}>{artikel.ringkasan}</p>
        <div className={styles.metaArtikel}>
          <span>✍️ {artikel.penulis}</span>
          <span>📅 {artikel.tanggal}</span>
          <span>⏱ {artikel.waktuBaca}</span>
        </div>
      </header>

      {/* Konten artikel */}
      <article className={styles.kontenArtikel}>
        {artikel.konten.split('. ').reduce((akum, kalimat, i, arr) => {
          // Bagi konten menjadi paragraf tiap ~3 kalimat
          if (i % 3 === 0) {
            const paragraf = arr.slice(i, i + 3).join('. ');
            akum.push(<p key={i}>{paragraf}{i + 3 < arr.length ? '.' : ''}</p>);
          }
          return akum;
        }, [])}
      </article>

      {/* Artikel terkait */}
      {artikelLain.length > 0 && (
        <aside className={styles.artikelTerkait}>
          <h2 className={styles.judulTerkait}>Baca Juga</h2>
          <div className={styles.gridTerkait}>
            {artikelLain.map((a) => (
              <Link key={a.id} href={`/blog/${a.slug}`} className={styles.kartuTerkait}>
                <span className={styles.kategoriKecil}>{a.kategori}</span>
                <h3 className={styles.judulKartuTerkait}>{a.judul}</h3>
                <p className={styles.waktuBaca}>⏱ {a.waktuBaca}</p>
              </Link>
            ))}
          </div>
        </aside>
      )}

      <div className={styles.tombolKembali}>
        <Link href="/blog" className="tombol-sekunder">
          ← Kembali ke Blog
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';
import styles from './Footer.module.css';

const kolomProduk = [
  { label: 'Fitur', href: '/#fitur' },
  { label: 'Cara Kerja', href: '/#cara-kerja' },
  { label: 'Layanan', href: '/services' },
  { label: 'Harga', href: '/services#harga' },
];

const kolomPerusahaan = [
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontak', href: '/contact' },
];

const kolomDukungan = [
  { label: 'Dokumentasi API', href: '#' },
  { label: 'Pusat Bantuan', href: '#' },
  { label: 'Status Layanan', href: '#' },
];

// Footer adalah Server Component — tidak ada interaksi browser
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerAtas}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoFooter}>
              <div className={styles.logoIkon}>🥑</div>
              <span className={styles.logonama}>Avoc<span>AI</span></span>
            </Link>
            <p className={styles.deskripsi}>
              Platform klasifikasi kematangan alpukat berbasis AI yang membantu
              petani dan bisnis agritech meningkatkan efisiensi panen dan distribusi.
            </p>
          </div>

          <div className={styles.kolomWrapper}>
            <KolomLink judul="Produk" items={kolomProduk} />
            <KolomLink judul="Perusahaan" items={kolomPerusahaan} />
            <KolomLink judul="Dukungan" items={kolomDukungan} />
          </div>
        </div>

        <div className={styles.footerBawah}>
          <p className={styles.hakCipta}>© 2026 AvocAI. Hak cipta dilindungi.</p>
          <div className={styles.tautanLegal}>
            <Link href="#">Kebijakan Privasi</Link>
            <Link href="#">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function KolomLink({ judul, items }) {
  return (
    <div className={styles.kolom}>
      <h4 className={styles.judulKolom}>{judul}</h4>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.tautanKolom}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

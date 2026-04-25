import ContactForm from '@/components/ContactForm';
import styles from './contact.module.css';

export const metadata = {
  title: 'Kontak',
  description: 'Hubungi tim AvocAI — kami siap membantu Anda memulai atau menjawab pertanyaan.',
};

const infoKontak = [
  { ikon: '📧', judul: 'Email', nilai: 'halo@avocai.id' },
  { ikon: '📱', judul: 'WhatsApp', nilai: '+62 812-3456-7890' },
  { ikon: '📍', judul: 'Kantor', nilai: 'Jakarta Selatan, Indonesia' },
  { ikon: '🕐', judul: 'Jam Kerja', nilai: 'Sen – Jum, 09.00 – 18.00 WIB' },
];

// Server Component — hanya ContactForm-nya yang Client Component
export default function HalamanKontak() {
  return (
    <>
      {/* Header */}
      <section className={styles.headerHalaman}>
        <div className="container">
          <span className="badge">📬 Hubungi Kami</span>
          <h1 className="judul-seksi" style={{ marginTop: 12 }}>
            Ada yang Bisa Kami Bantu?
          </h1>
          <p className="subjudul-seksi" style={{ marginTop: 12 }}>
            Baik Anda ingin memulai uji coba, bertanya soal fitur, atau mendiskusikan integrasi
            enterprise — tim kami siap menjawab.
          </p>
        </div>
      </section>

      {/* Konten utama */}
      <section>
        <div className="container">
          <div className={styles.layoutKontak}>

            {/* Informasi kontak — Server Component */}
            <aside className={styles.sisiInfo}>
              <h2 className={styles.judulInfo}>Informasi Kontak</h2>
              <p className={styles.subInfo}>
                Kami biasanya merespons dalam 1×24 jam di hari kerja.
              </p>

              <div className={styles.daftarInfo}>
                {infoKontak.map((info) => (
                  <div key={info.judul} className={styles.itemInfo}>
                    <span className={styles.ikonInfo}>{info.ikon}</span>
                    <div>
                      <p className={styles.judulItem}>{info.judul}</p>
                      <p className={styles.nilaiItem}>{info.nilai}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.kotakFaq}>
                <h3 className={styles.judulFaq}>Pertanyaan Umum</h3>
                <p className={styles.tanyaFaq}>Apakah ada uji coba gratis?</p>
                <p className={styles.jawaFaq}>Ya! Semua paket tersedia uji coba gratis 14 hari tanpa kartu kredit.</p>
                <p className={styles.tanyaFaq}>Bagaimana cara integrasi API?</p>
                <p className={styles.jawaFaq}>Dokumentasi lengkap tersedia. Tim kami juga siap bantu onboarding jika diperlukan.</p>
              </div>
            </aside>

            {/* Form kontak — Client Component */}
            <div className={styles.sisiForm}>
              <div className={styles.kartuForm}>
                <h2 className={styles.judulForm}>Kirim Pesan</h2>
                <p className={styles.subForm}>Isi formulir berikut dan kami akan segera menghubungi Anda.</p>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

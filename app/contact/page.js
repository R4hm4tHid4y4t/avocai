// app/contact/page.js
import styles from "./contact.module.css"; //[cite: 14]
import ContactForm from "./contact-form";

export const metadata = {
  title: "Kontak | AvocAI",
  description: "Hubungi tim AvocAI untuk pertanyaan, demo, atau integrasi enterprise.",
};

export default function ContactPage() {
  return (
    <main className={styles.halaman}> {/* Menggunakan class dari CSS Module[cite: 14] */}
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.badge}>📞 HUBUNGI KAMI</span>
          <h1 className={styles.judul}>Ada yang Bisa Kami Bantu?</h1>
          <p className={styles.subjudul}>
            Baik Anda ingin memulai uji coba, bertanya soal fitur, atau
            mendiskusikan integrasi enterprise — tim kami siap menjawab.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.konten}>
        <div className={styles.grid}>
          {/* Info Kontak Panel */}
          <div className={styles.infoPanel}>
            <div>
              <h2 className={styles.infoJudul}>Informasi Kontak</h2>
              <p className={styles.infoSub}>Kami biasanya merespons dalam 1×24 jam di hari kerja.</p>
            </div>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>✉️</div>
                <div>
                  <p className={styles.infoLabel}>EMAIL</p>
                  <p className={styles.infoNilai}>halo@avocai.id</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>💬</div>
                <div>
                  <p className={styles.infoLabel}>WHATSAPP</p>
                  <p className={styles.infoNilai}>+62 812-3456-7890</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📍</div>
                <div>
                  <p className={styles.infoLabel}>KANTOR</p>
                  <p className={styles.infoNilai}>Jakarta Selatan, Indonesia</p>
                </div>
              </div>
            </div>

            {/* FAQ Box */}
            <div className={styles.faqBox}>
              <h3 className={styles.faqJudul}>Pertanyaan Umum</h3>
              <div className={styles.faqItem}>
                <p className={styles.faqPertanyaan}>Apakah ada uji coba gratis?</p>
                <p className={styles.faqJawaban}>Ya! Semua paket tersedia uji coba gratis 14 hari.</p>
              </div>
            </div>
          </div>

          {/* Form Kontak */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
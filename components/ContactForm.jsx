'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

const pilihanPeran = [
  { value: '', label: '-- Pilih peran --', disabled: true },
  { value: 'petani', label: 'Petani / Pekebun' },
  { value: 'distributor', label: 'Distributor / Eksportir' },
  { value: 'perusahaan', label: 'Perusahaan Agritech' },
  { value: 'peneliti', label: 'Peneliti / Akademisi' },
  { value: 'lainnya', label: 'Lainnya' },
];

// Client Component — butuh useState untuk interaksi form
export default function ContactForm() {
  const [formData, setFormData] = useState({ nama: '', email: '', peran: '', pesan: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | sukses | error

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.nama || !formData.email || !formData.peran) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('sukses');
        setFormData({ nama: '', email: '', peran: '', pesan: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sukses') {
    return (
      <div className={styles.pesanSukses}>
        <span className={styles.ikonSukses}>✅</span>
        <h3>Terima kasih, {formData.nama || 'teman'}!</h3>
        <p>Pesan Anda sudah kami terima. Tim AvocAI akan menghubungi Anda dalam 1×24 jam.</p>
        <button
          className={styles.tombolUlang}
          onClick={() => setStatus('idle')}
        >
          Kirim Pesan Lain
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.barisDua}>
        <div className={styles.grupInput}>
          <label className={styles.label} htmlFor="nama">Nama Lengkap</label>
          <input
            className={styles.input}
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="contoh: Budi Santoso"
            required
          />
        </div>
        <div className={styles.grupInput}>
          <label className={styles.label} htmlFor="email">Alamat Email</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="budi@email.com"
            required
          />
        </div>
      </div>

      <div className={styles.grupInput}>
        <label className={styles.label} htmlFor="peran">Peran Anda</label>
        <select
          className={styles.input}
          id="peran"
          name="peran"
          value={formData.peran}
          onChange={handleChange}
          required
        >
          {pilihanPeran.map((p) => (
            <option key={p.value} value={p.value} disabled={p.disabled}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grupInput}>
        <label className={styles.label} htmlFor="pesan">Pesan (opsional)</label>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          id="pesan"
          name="pesan"
          value={formData.pesan}
          onChange={handleChange}
          placeholder="Ceritakan kebutuhan Anda atau pertanyaan yang ingin diajukan..."
          rows={4}
        />
      </div>

      {status === 'error' && (
        <p className={styles.pesanError}>
          Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.
        </p>
      )}

      <button
        type="submit"
        className={styles.tombolKirim}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan →'}
      </button>

      <p className={styles.catatan}>
        Dengan mengirim pesan, Anda menyetujui Kebijakan Privasi kami.
        Tidak ada spam, janji!
      </p>
    </form>
  );
}

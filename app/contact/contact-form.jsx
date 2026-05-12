// app/contact/contact-form.jsx
// Task 2: Tampilkan error validasi Zod per field

"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { kirimPesan } from "./actions";
import styles from "./contact.module.css";

const initialState = { success: false, message: "", errors: {} };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={styles.tombol}>
      {pending ? (
        <>
          <div className={styles.spinner}></div> Mengirim...
        </>
      ) : (
        "Kirim Pesan →"
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(kirimPesan, initialState);
  const safeState = state ?? initialState;
  const errors = safeState.errors || {};
  const formRef = useRef(null);

  useEffect(() => {
    if (safeState.success) {
      formRef.current?.reset();
    }
  }, [safeState.success]);

  return (
    <div className={styles.formPanel}>
      <h2 className={styles.formJudul}>Kirim Pesan</h2>
      <p className={styles.formSub}>
        Isi formulir berikut dan kami akan segera menghubungi Anda.
      </p>

      {/* Notifikasi Status */}
      {safeState.message && (
        <div
          className={
            safeState.success ? styles.notifSukses : styles.notifError
          }
        >
          <span className={styles.notifIcon}>
            {safeState.success ? "✓" : "✕"}
          </span>
          <div>
            <p className={styles.notifJudul}>
              {safeState.success ? "Pesan Terkirim!" : "Gagal Mengirim"}
            </p>
            <p className={styles.notifPesan}>{safeState.message}</p>
          </div>
        </div>
      )}

      <form ref={formRef} action={formAction} className={styles.form}>
        {/* Nama & Email */}
        <div className={styles.baris}>
          {/* Nama Lengkap */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Nama Lengkap <span className={styles.wajib}>*</span>
            </label>
            <input
              type="text"
              name="nama_lengkap"
              required
              placeholder="contoh: Budi Santoso"
              className={`${styles.input} ${errors.nama_lengkap ? styles.inputError : ""}`}
            />
            {/* Error Zod per field */}
            {errors.nama_lengkap && (
              <span className={styles.fieldError}>
                ⚠ {errors.nama_lengkap}
              </span>
            )}
          </div>

          {/* Email */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Alamat Email <span className={styles.wajib}>*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="budi@email.com"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            />
            {errors.email && (
              <span className={styles.fieldError}>⚠ {errors.email}</span>
            )}
          </div>
        </div>

        {/* Peran */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Peran Anda <span className={styles.wajib}>*</span>
          </label>
          <select
            name="peran"
            required
            defaultValue=""
            className={`${styles.select} ${errors.peran ? styles.inputError : ""}`}
          >
            <option value="" disabled>
              -- Pilih peran --
            </option>
            <option value="petani">Petani</option>
            <option value="distributor">Distributor</option>
            <option value="eksportir">Eksportir</option>
            <option value="developer">Developer</option>
            <option value="lainnya">Lainnya</option>
          </select>
          {errors.peran && (
            <span className={styles.fieldError}>⚠ {errors.peran}</span>
          )}
        </div>

        {/* Pesan */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Pesan <span className={styles.catatan}>(opsional)</span>
          </label>
          <textarea
            name="pesan"
            rows={4}
            placeholder="Ceritakan kebutuhan Anda..."
            className={`${styles.textarea} ${errors.pesan ? styles.inputError : ""}`}
          />
          {errors.pesan && (
            <span className={styles.fieldError}>⚠ {errors.pesan}</span>
          )}
        </div>

        <SubmitButton />

        <p className={styles.catatan}>
          Dengan mengirim pesan, Anda menyetujui Kebijakan Privasi kami.
        </p>
      </form>
    </div>
  );
}
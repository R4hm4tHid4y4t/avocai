// app/contact/contact-form.jsx
"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { kirimPesan } from "./actions";
import styles from "./contact.module.css"; //[cite: 14]

const initialState = { success: false, message: "" };

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
  const formRef = useRef(null);

  useEffect(() => {
    if (state.success) { formRef.current?.reset(); }
  }, [state.success]);

  return (
    <div className={styles.formPanel}>
      <h2 className={styles.formJudul}>Kirim Pesan</h2>
      <p className={styles.formSub}>Isi formulir berikut dan kami akan segera menghubungi Anda.</p>

      {/* Notifikasi Status MVP */}
      {state.message && (
        <div className={state.success ? styles.notifSukses : styles.notifError}>
          <span className={styles.notifIcon}>{state.success ? "✓" : "✕"}</span>
          <div>
            <p className={styles.notifJudul}>{state.success ? "Pesan Terkirim!" : "Gagal Mengirim"}</p>
            <p className={styles.notifPesan}>{state.message}</p>
          </div>
        </div>
      )}

      <form ref={formRef} action={formAction} className={styles.form}>
        <div className={styles.baris}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Nama Lengkap <span className={styles.wajib}>*</span></label>
            <input type="text" name="nama_lengkap" required placeholder="contoh: Budi Santoso" className={styles.input} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Alamat Email <span className={styles.wajib}>*</span></label>
            <input type="email" name="email" required placeholder="budi@email.com" className={styles.input} />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Peran Anda <span className={styles.wajib}>*</span></label>
          <select name="peran" required className={styles.select}>
            <option value="" disabled selected>-- Pilih peran --</option>
            <option value="petani">Petani</option>
            <option value="distributor">Distributor</option>
            <option value="developer">Developer</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Pesan <span className={styles.catatan}>(opsional)</span></label>
          <textarea name="pesan" rows={4} placeholder="Ceritakan kebutuhan Anda..." className={styles.textarea} />
        </div>

        <SubmitButton />
        <p className={styles.catatan}>Dengan mengirim pesan, Anda menyetujui Kebijakan Privasi kami.</p>
      </form>
    </div>
  );
}
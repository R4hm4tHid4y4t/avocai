'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { login, register } from '@/app/login/actions';

interface Props {
  onSwitch: () => void;
}

// Komponen tombol terpisah untuk memantau status 'pending'
function SubmitButton({ label, loadingLabel }: { label: string, loadingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{ ...styles.btnPrimary, opacity: pending ? 0.75 : 1, cursor: pending ? 'not-allowed' : 'pointer' }}
    >
      {pending ? loadingLabel : label}
    </button>
  );
}

/* ─── Login Form ─────────────────────────────────── */
export function LoginForm({ onSwitch }: Props) {
  const [state, formAction] = useFormState(login, { success: false, message: '' });

  return (
    <form action={formAction} noValidate style={{ display:'flex', flexDirection:'column', gap:0 }}>
      <h2 className="animate-fade-up" style={styles.title}>Selamat datang 👋</h2>
      <p className="animate-fade-up delay-100" style={styles.subtitle}>Masuk ke akun AvocAI Anda</p>

      {state?.message && !state.success && (
        <div style={styles.errorBanner} role="alert">{state.message}</div>
      )}

      <div className="animate-fade-up delay-100">
        <FormField label="Email / Username">
          <input
            type="text"
            name="email"
            placeholder="admin atau nama@email.com"
            autoComplete="email"
            style={styles.input}
          />
        </FormField>
      </div>

      <div className="animate-fade-up delay-200">
        <FormField
          label="Password"
          labelRight={
            <button type="button" style={styles.forgotBtn} onClick={() => alert('Fitur reset password sedang dalam tahap pengembangan.')}>Lupa password?</button>
          }
        >
          <input
            type="password"
            name="password"
            placeholder="Masukkan password"
            autoComplete="current-password"
            style={styles.input}
          />
        </FormField>
      </div>

      <div className="animate-fade-up delay-200" style={{ marginTop:4 }}>
        <SubmitButton label="Masuk ke AvocAI" loadingLabel="Memverifikasi..." />
      </div>

      <Divider />
      <GoogleButton label="Masuk dengan Google" />

      <p style={styles.footer}>
        Belum punya akun?{' '}
        <button type="button" onClick={onSwitch} style={styles.linkBtn}>Daftar gratis</button>
      </p>
    </form>
  );
}

/* ─── Register Form ──────────────────────────────── */
export function RegisterForm({ onSwitch }: Props) {
  const [state, formAction] = useFormState(register, { success: false, message: '' });
  const [strength, setStrength] = useState(0);

  function checkStrength(val: string) {
    let score = 0;
    if (val.length > 4) score++;
    if (val.length > 8) score++;
    if (/[!@#$%^&*]/.test(val)) score++;
    setStrength(score);
  }

  const barClass = ['', 'weak', 'medium', 'strong'];

  return (
    <form action={formAction} noValidate style={{ display:'flex', flexDirection:'column', gap:0 }}>
      <h2 className="animate-fade-up" style={styles.title}>Buat akun baru ✨</h2>
      <p className="animate-fade-up delay-100" style={styles.subtitle}>Coba gratis 14 hari — tanpa kartu kredit</p>

      {state?.message && !state.success && (
        <div style={styles.errorBanner} role="alert">{state.message}</div>
      )}

      <div className="animate-fade-up delay-100" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <FormField label="Nama Depan">
          <input type="text" name="firstName" placeholder="Rahmat" autoComplete="given-name" style={styles.input} />
        </FormField>
        <FormField label="Nama Belakang">
          <input type="text" name="lastName" placeholder="Hidayat" autoComplete="family-name" style={styles.input} />
        </FormField>
      </div>

      <div className="animate-fade-up delay-100">
        <FormField label="Email">
          <input type="email" name="email" placeholder="nama@email.com" autoComplete="email" style={styles.input} />
        </FormField>
      </div>

      <div className="animate-fade-up delay-200">
        <FormField label="Password">
          <input
            type="password"
            name="password"
            placeholder="Buat password kuat"
            autoComplete="new-password"
            onChange={(e) => checkStrength(e.target.value)}
            style={styles.input}
          />
          <div style={{ display:'flex', gap:4, marginTop:8 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={`strength-bar ${strength >= i ? barClass[strength] : ''}`} />
            ))}
          </div>
          <p style={styles.hint}>Gunakan huruf, angka, dan simbol</p>
        </FormField>
      </div>

      <div className="animate-fade-up delay-300" style={{ marginTop:4 }}>
        <SubmitButton label="Buat Akun Gratis →" loadingLabel="Membuat akun..." />
      </div>

      <Divider />
      <GoogleButton label="Daftar dengan Google" />

      <p style={styles.footer}>
        Sudah punya akun?{' '}
        <button type="button" onClick={onSwitch} style={styles.linkBtn}>Masuk sekarang</button>
      </p>
    </form>
  );
}

/* ─── Shared Sub-components ──────────────────────── */
function FormField({
  label,
  hint,
  labelRight,
  children,
}: {
  label: string;
  hint?: string;
  labelRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:7 }}>
        <label style={styles.label}>{label}</label>
        {labelRight}
      </div>
      {children}
      {hint && <p style={styles.hint}>{hint}</p>}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, margin:'20px 0', color:'#ccc', fontSize:13 }}>
      <div style={{ flex:1, height:1, background:'#e8e5e0' }} />
      atau lanjutkan dengan
      <div style={{ flex:1, height:1, background:'#e8e5e0' }} />
    </div>
  );
}

function GoogleButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => alert('Integrasi OAuth Google segera hadir!')}
      style={styles.btnGoogle}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = '#f9f7f5';
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#d0ccc7';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = '#fff';
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#e8e5e0';
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6A7.8 7.8 0 0 0 17 9.14c0-.57-.05-.96-.15-1.14z" fill="#4285F4" />
        <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853" />
        <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05" />
        <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.31z" fill="#EA4335" />
      </svg>
      {label}
    </button>
  );
}

/* ─── Inline Styles ──────────────────────────────── */
const styles = {
  title: {
    fontFamily: 'var(--font-display)', fontSize:26, fontWeight:700, color:'#111', letterSpacing:'-0.5px', marginBottom:6,
  } as React.CSSProperties,
  subtitle: {
    fontSize:14, color:'rgba(0,0,0,.45)', marginBottom:28, fontWeight:300,
  } as React.CSSProperties,
  label: {
    fontSize:13, fontWeight:500, color:'#444',
  } as React.CSSProperties,
  forgotBtn: {
    background:'none', border:'none', color:'var(--green-700)', fontWeight:500, cursor:'pointer', fontSize:12, fontFamily:'var(--font-body)', padding:0,
  } as React.CSSProperties,
  input: {
    width:'100%', padding:'12px 16px', border:'1.5px solid #e8e5e0', borderRadius:10, fontSize:14, fontFamily:'var(--font-body)', background:'#fff', color:'#1a1a1a', outline:'none', transition:'border-color .2s,box-shadow .2s',
  } as React.CSSProperties,
  hint: {
    fontSize:11, color:'rgba(0,0,0,.35)', marginTop:5,
  } as React.CSSProperties,
  btnPrimary: {
    width:'100%', padding:'13px', background:'var(--green-800)', color:'#fff', border:'none', borderRadius:10, fontSize:15, fontWeight:600, fontFamily:'var(--font-display)', letterSpacing:'0.3px', transition:'all .2s',
  } as React.CSSProperties,
  btnGoogle: {
    width:'100%', padding:'11px', background:'#fff', color:'#444', border:'1.5px solid #e8e5e0', borderRadius:10, fontSize:14, fontWeight:500, fontFamily:'var(--font-body)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, transition:'all .2s',
  } as React.CSSProperties,
  footer: {
    textAlign:'center', marginTop:20, fontSize:13, color:'rgba(0,0,0,.4)',
  } as React.CSSProperties,
  linkBtn: {
    background:'none', border:'none', color:'var(--green-700)', fontWeight:500, cursor:'pointer', fontSize:13, fontFamily:'var(--font-body)', padding:0,
  } as React.CSSProperties,
  errorBanner: {
    background:'#fef2f2', border:'1px solid #fecaca', borderRadius:8, padding:'10px 14px', fontSize:13, color:'#dc2626', marginBottom:16,
  } as React.CSSProperties,
};
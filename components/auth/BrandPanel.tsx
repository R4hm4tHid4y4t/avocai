'use client';

const STATS = [
  { num: '96%',    label: 'Akurasi klasifikasi' },
  { num: '50rb+',  label: 'Gambar pelatihan' },
  { num: '<200ms', label: 'Waktu inferensi' },
  { num: '500+',   label: 'Pengguna aktif' },
];

export function BrandPanel() {
  return (
    <aside
      aria-label="Informasi AvocAI"
      style={{
        width: 400,
        flexShrink: 0,
        background: 'var(--green-950)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 36px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{ position:'absolute', top:-100, left:-100, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(61,158,96,.2) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div aria-hidden style={{ position:'absolute', bottom:-80, right:-60, width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle,rgba(90,191,122,.12) 0%,transparent 70%)', pointerEvents:'none' }} />

      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:10, position:'relative', zIndex:1 }}>
        <div style={{ width:38, height:38, background:'var(--green-500)', borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
          🥑
        </div>
        <span style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:'#fff', letterSpacing:'-0.5px' }}>
          Avoc<span style={{ color:'var(--green-400)' }}>AI</span>
        </span>
      </div>

      {/* Hero copy */}
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-block', background:'rgba(90,191,122,.15)', color:'var(--green-300)', fontSize:10, fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', padding:'5px 11px', borderRadius:100, marginBottom:18, border:'1px solid rgba(90,191,122,.25)' }}>
          🌿 AI untuk Agritech Indonesia
        </div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:800, color:'#fff', lineHeight:1.15, marginBottom:14, letterSpacing:'-0.5px' }}>
          Deteksi<br/>Kematangan<br/>
          <span style={{ color:'var(--green-400)' }}>Lebih Cepat</span>
        </h1>
        <p style={{ fontSize:14, color:'rgba(255,255,255,.5)', lineHeight:1.7, fontWeight:300 }}>
          Platform computer vision untuk mengklasifikasikan 4 tingkat
          kematangan alpukat — akurat, instan, dan terintegrasi langsung
          ke lini produksi Anda.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, position:'relative', zIndex:1 }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)', borderRadius:11, padding:'13px 14px' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'#fff', marginBottom:3 }}>
              {s.num}
            </div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,.4)', fontWeight:300, letterSpacing:'0.5px' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
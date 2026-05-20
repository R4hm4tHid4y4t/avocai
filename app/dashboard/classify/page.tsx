// app/dashboard/classify/page.tsx

"use client";

import { useState, useRef } from "react";

const RESULTS = [
  { label: "Mentah", color: "bg-slate-400", desc: "Sangat keras, belum siap panen.", textColor: "text-slate-700" },
  { label: "Setengah Matang", color: "bg-amber-400", desc: "Peram 2-3 hari lagi di suhu ruang.", textColor: "text-amber-700" },
  { label: "Matang", color: "bg-green-500", desc: "Siap konsumsi, tekstur lembut ideal.", textColor: "text-green-700" },
  { label: "Terlalu Matang", color: "bg-red-500", desc: "Tekstur sangat lunak, sangat cocok untuk diolah menjadi jus.", textColor: "text-red-700" },
];

export default function ClassifyPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | typeof RESULTS[0] & { confidence: number }>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);
    setLoading(true);
    
    // Simulasi waktu proses algoritma CNN
    setTimeout(() => {
      const pick = RESULTS[Math.floor(Math.random() * RESULTS.length)]; 
      setResult({ ...pick, confidence: 85 + Math.random() * 14 });
      setLoading(false);
    }, 2500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Klasifikasi AI</h1>
        <p className="text-gray-500 mt-1">Deteksi tingkat kematangan alpukat secara instan menggunakan arsitektur CNN.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom Kiri: Upload Area */}
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !loading && inputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden ${
              preview ? "border-gray-200 bg-gray-50" : "border-green-300 bg-green-50/30 cursor-pointer hover:bg-green-50/80 hover:border-green-400"
            }`}
          >
            {preview ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <img src={preview} alt="Preview" className="max-h-72 rounded-xl object-contain shadow-sm border border-gray-200 z-10" />
                {!loading && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setPreview(null); setResult(null); }}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur text-gray-600 p-2 rounded-full shadow hover:text-red-500 transition-colors z-20"
                    title="Hapus gambar"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                  <span className="text-4xl">🥑</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Pilih atau letakkan gambar</h3>
                <p className="text-gray-500 text-sm mt-2 max-w-xs leading-relaxed">Mendukung format JPG, PNG, atau WEBP dengan resolusi optimal.</p>
                <div className="mt-6 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm">
                  Cari File
                </div>
              </>
            )}
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); }} />
          </div>
        </div>

        {/* Kolom Kanan: Result Panel */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[400px] flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Laporan Inferensi
          </h2>

          {/* Kondisi 1: Belum ada gambar */}
          {!preview && !loading && !result && (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <p className="text-gray-500 font-medium">Sistem menunggu masukan gambar.</p>
            </div>
          )}

          {/* Kondisi 2: Proses Loading AI */}
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-green-100 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-green-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                <div className="absolute inset-0 flex items-center justify-center text-lg">🧠</div>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900">Menjalankan Model CNN...</p>
                <p className="text-sm text-gray-500 mt-1">Mengekstrak fitur dan pola kematangan</p>
              </div>
              <div className="w-48 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-green-500 h-1.5 rounded-full animate-pulse w-3/4" />
              </div>
            </div>
          )}

          {/* Kondisi 3: Hasil Muncul */}
          {result && !loading && (
            <div className="flex-1 flex flex-col animate-fade-in">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
                <p className="text-sm text-gray-500 mb-1 font-medium">Hasil Prediksi</p>
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${result.color} animate-pulse`} />
                  <span className={`text-3xl font-black tracking-tight ${result.textColor}`}>{result.label}</span>
                </div>
                <p className="text-gray-600 mt-3 font-medium leading-relaxed">{result.desc}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-gray-700">Tingkat Kepercayaan (Confidence)</span>
                  <span className="font-bold text-gray-900">{result.confidence.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${result.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-gray-400 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="font-mono">Engine: CNN-AvocAI v1.0</span>
                  <span>Proses: {(0.8 + Math.random()).toFixed(2)}s</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
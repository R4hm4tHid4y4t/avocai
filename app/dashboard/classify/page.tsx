"use client";

import { useState, useRef } from "react";
import type { Metadata } from "next";

const RESULTS = [
  { label: "Matang", color: "bg-green-500", desc: "Siap konsumsi / panen" },
  { label: "Setengah Matang", color: "bg-amber-400", desc: "2-3 hari lagi optimal" },
  { label: "Mentah", color: "bg-red-400", desc: "Belum siap panen" },
  { label: "Busuk", color: "bg-gray-600", desc: "Tidak layak konsumsi" },
];

export default function ClassifyPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { label: string; confidence: number; color: string; desc: string }>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);
    setLoading(true);
    // Simulate CNN inference
    setTimeout(() => {
      const pick = RESULTS[Math.floor(Math.random() * 2)]; // bias toward matang/setengah
      setResult({ ...pick, confidence: 85 + Math.random() * 14 });
      setLoading(false);
    }, 2200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Klasifikasi Alpukat</h1>
        <p className="text-gray-500 mt-1">Upload foto alpukat untuk analisis kematangan dengan CNN.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-all min-h-64 flex flex-col items-center justify-center"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-56 rounded-xl object-contain" />
            ) : (
              <>
                <div className="text-5xl mb-4">📷</div>
                <p className="text-gray-600 font-medium">Drag & drop foto alpukat</p>
                <p className="text-gray-400 text-sm mt-1">atau klik untuk memilih file</p>
                <p className="text-gray-300 text-xs mt-2">JPG, PNG, WEBP — max 10MB</p>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>

          {preview && (
            <button
              onClick={() => { setPreview(null); setResult(null); }}
              className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕ Hapus gambar
            </button>
          )}
        </div>

        {/* Result Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm min-h-64 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hasil Analisis</h2>

          {!preview && !loading && !result && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
              <div className="text-4xl mb-2">🥑</div>
              <p className="text-sm">Upload gambar untuk memulai analisis</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">Model CNN sedang menganalisis...</p>
              <div className="w-48 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-green-500 h-1.5 rounded-full animate-pulse w-3/4" />
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className={`w-4 h-4 rounded-full ${result.color}`} />
                <span className="text-2xl font-bold text-gray-900">{result.label}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Tingkat Kepercayaan</span>
                  <span className="font-semibold text-green-600">{result.confidence.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">{result.desc}</p>
              </div>
              <div className="text-xs text-gray-400 flex gap-4">
                <span>Model: CNN v2.4-stable</span>
                <span>Waktu: {(0.8 + Math.random()).toFixed(2)}s</span>
              </div>
              <button
                onClick={() => { setPreview(null); setResult(null); }}
                className="mt-auto bg-green-600 text-white py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Analisis Gambar Lain
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Classifications */}
      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Klasifikasi Terbaru</h2>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">12</span>
        </div>
        <div className="space-y-2">
          {[
            { result: "Matang", conf: 97.2, type: "Hass", time: "2 mnt lalu", color: "bg-green-500" },
            { result: "Setengah Matang", conf: 84.1, type: "Mentega", time: "15 mnt lalu", color: "bg-amber-400" },
            { result: "Mentah", conf: 91.8, type: "Hass", time: "32 mnt lalu", color: "bg-red-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-sm font-medium text-gray-700">{item.result}</span>
                <span className="text-xs text-gray-400">— Alpukat {item.type}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-green-600 font-medium">{item.conf}%</span>
                <span className="text-gray-400 text-xs">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
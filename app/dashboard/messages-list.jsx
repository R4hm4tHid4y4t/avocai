// app/dashboard/messages-list.jsx
// Task 4: Optimistic UI — Hapus pesan terasa instan

"use client";

import { useOptimistic, useTransition } from "react";
import { hapusPesan } from "./actions";
import styles from "./dashboard.module.css";

function formatTanggal(tanggal) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function badgePeran(peran) {
  const map = {
    petani: { label: "🌿 Petani", kelas: styles.badgePetani },
    distributor: { label: "🚚 Distributor", kelas: styles.badgeDistributor },
    eksportir: { label: "✈️ Eksportir", kelas: styles.badgeEksportir },
    developer: { label: "💻 Developer", kelas: styles.badgeDeveloper },
    lainnya: { label: "👤 Lainnya", kelas: styles.badgeLainnya },
  };
  return map[peran] || { label: peran, kelas: styles.badgeLainnya };
}

export default function MessagesList({ messages }) {
  const [isPending, startTransition] = useTransition();

  // useOptimistic: UI langsung berubah sebelum server merespons
  const [optimisticMessages, removeOptimistic] = useOptimistic(
    messages,
    (state, idToRemove) => state.filter((msg) => msg.id !== idToRemove)
  );

  const handleHapus = (id) => {
    startTransition(async () => {
      // Langsung hapus dari UI (Optimistic Update)
      removeOptimistic(id);
      // Jalankan Server Action di background
      await hapusPesan(id);
    });
  };

  if (optimisticMessages.length === 0) {
    return (
      <div className={styles.kosong}>
        <div className={styles.kosongIcon}>📭</div>
        <p className={styles.kosongTeks}>Tidak ada pesan ditemukan</p>
        <p className={styles.kosongSub}>
          Coba ubah kata kunci pencarian atau tunggu pesan baru masuk.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Pengirim</th>
            <th>Peran</th>
            <th>Pesan</th>
            <th>Waktu</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {optimisticMessages.map((msg) => {
            const badge = badgePeran(msg.peran);
            return (
              <tr key={msg.id} className={styles.tableRow}>
                <td>
                  <div className={styles.pengirimInfo}>
                    <div className={styles.avatar}>
                      {msg.nama_lengkap?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={styles.nama}>{msg.nama_lengkap}</p>
                      <p className={styles.email}>{msg.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.badge} ${badge.kelas}`}>
                    {badge.label}
                  </span>
                </td>
                <td>
                  <p className={styles.pesanTeks}>
                    {msg.pesan || (
                      <span className={styles.tidakAdaPesan}>
                        Tidak ada pesan
                      </span>
                    )}
                  </p>
                </td>
                <td>
                  <p className={styles.tanggal}>
                    {formatTanggal(msg.created_at)}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleHapus(msg.id)}
                    className={styles.tombolHapus}
                    title="Hapus pesan"
                  >
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
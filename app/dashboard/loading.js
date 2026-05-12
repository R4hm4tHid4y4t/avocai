// app/dashboard/loading.js
// Task 4: Skeleton UI — otomatis tampil saat transisi data di /dashboard

import styles from "./dashboard.module.css";

function SkeletonRow() {
  return (
    <tr className={styles.tableRow}>
      <td>
        <div className={styles.pengirimInfo}>
          <div className={`${styles.avatar} ${styles.skeleton}`} />
          <div>
            <div className={`${styles.skeletonLine} ${styles.skeletonMd}`} />
            <div
              className={`${styles.skeletonLine} ${styles.skeletonSm}`}
              style={{ marginTop: 4 }}
            />
          </div>
        </div>
      </td>
      <td>
        <div className={`${styles.skeletonLine} ${styles.skeletonSm}`} />
      </td>
      <td>
        <div className={`${styles.skeletonLine} ${styles.skeletonLg}`} />
      </td>
      <td>
        <div className={`${styles.skeletonLine} ${styles.skeletonMd}`} />
      </td>
      <td>
        <div className={`${styles.skeletonLine} ${styles.skeletonSm}`} />
      </td>
    </tr>
  );
}

export default function DashboardLoading() {
  return (
    <div className={styles.layout}>
      {/* Navbar Skeleton */}
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>
          <span className={styles.logoIcon}>🥑</span>
          <span className={styles.logoTeks}>
            Avoc<span>AI</span>
          </span>
          <span className={styles.navBadge}>Admin</span>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Header Skeleton */}
        <div className={styles.header}>
          <div>
            <div
              className={`${styles.skeletonLine} ${styles.skeletonXl}`}
              style={{ marginBottom: 8 }}
            />
            <div className={`${styles.skeletonLine} ${styles.skeletonMd}`} />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className={styles.statsGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={`${styles.statCard} ${styles.skeleton}`}>
              <div style={{ height: 60 }} />
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.skeletonLine} ${styles.skeletonMd}`} />
            <div className={styles.searchWrapper}>
              <div
                className={`${styles.skeletonLine} ${styles.skeleton}`}
                style={{ width: 280, height: 40, borderRadius: 12 }}
              />
            </div>
          </div>

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
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
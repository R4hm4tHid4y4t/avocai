-- ============================================
-- Tugas Modul 9 — Update RLS Policy
-- Jalankan di Supabase SQL Editor
-- ============================================

-- Izinkan dashboard membaca messages (aman karena rute dilindungi middleware)
DROP POLICY IF EXISTS "Allow authenticated read" ON messages;

CREATE POLICY "Allow server read" ON messages
  FOR SELECT USING (true);

-- Pastikan insert masih berfungsi
DROP POLICY IF EXISTS "Allow public insert" ON messages;

CREATE POLICY "Allow public insert" ON messages
  FOR INSERT WITH CHECK (true);

-- Pastikan delete berfungsi untuk admin (via service role key atau anon)
CREATE POLICY "Allow delete" ON messages
  FOR DELETE USING (true);
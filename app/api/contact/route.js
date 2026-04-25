import { NextResponse } from 'next/server';

// Route Handler — API endpoint POST /api/contact
export async function POST(request) {
  try {
    const body = await request.json();
    const { nama, email, peran, pesan } = body;

    // Validasi field wajib
    if (!nama || !email || !peran) {
      return NextResponse.json(
        { sukses: false, pesan: 'Field nama, email, dan peran wajib diisi.' },
        { status: 400 }
      );
    }

    // Validasi format email sederhana
    const polEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!polEmail.test(email)) {
      return NextResponse.json(
        { sukses: false, pesan: 'Format email tidak valid.' },
        { status: 400 }
      );
    }

    // Di produksi nyata: kirim ke email / simpan ke database
    // Untuk keperluan demo, log ke console dan kembalikan respons sukses
    console.log('[AvocAI] Pesan masuk:', { nama, email, peran, pesan, waktu: new Date().toISOString() });

    return NextResponse.json(
      {
        sukses: true,
        pesan: `Terima kasih ${nama}! Kami akan menghubungi Anda segera.`,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { sukses: false, pesan: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}

// GET — hanya untuk konfirmasi endpoint aktif
export async function GET() {
  return NextResponse.json({
    status: 'aktif',
    endpoint: '/api/contact',
    metode: ['POST'],
  });
}

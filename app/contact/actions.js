"use server";

import { z } from "zod";
import { createClient } from "@/app/lib/supabase/server";

// QA: Validasi ketat untuk mencegah Naughty User (limit karakter & format)
const pesanSchema = z.object({
  nama_lengkap: z.string().trim().min(2, "Nama minimal 2 karakter").max(50, "Nama maksimal 50 karakter"),
  email: z.string().trim().min(1, "Email wajib diisi").email("Format email tidak valid").max(100, "Email terlalu panjang"),
  peran: z.string().min(1, "Pilih peran Anda"),
  pesan: z.string().trim().max(500, "Pesan maksimal 500 karakter").optional(),
});

export async function kirimPesan(prevState, formData) {
  const rawData = Object.fromEntries(formData.entries());
  const validasi = pesanSchema.safeParse(rawData);

  if (!validasi.success) {
    const fieldErrors = validasi.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Gagal memproses. Periksa kembali input Anda.",
      errors: {
        nama_lengkap: fieldErrors.nama_lengkap?.[0] || null,
        email: fieldErrors.email?.[0] || null,
        peran: fieldErrors.peran?.[0] || null,
        pesan: fieldErrors.pesan?.[0] || null,
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert([validasi.data]);

  // Clean Code: Hapus console.error untuk production deployment
  if (error) {
    return { success: false, message: "Terjadi kesalahan jaringan, silakan coba lagi.", errors: {} };
  }

  return { success: true, message: "Pesan terkirim! Tim AvocAI akan segera menghubungi Anda.", errors: {} };
}
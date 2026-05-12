// app/contact/actions.js
"use server";

import { z } from "zod";
// Kita ganti import-nya menggunakan klien Supabase versi terbaru (Modul 9)
import { createClient } from "@/app/lib/supabase/server"; 

const pesanSchema = z.object({
  nama_lengkap: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama terlalu panjang"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  peran: z
    .string()
    .min(1, "Pilih peran Anda")
    .refine(
      (val) =>
        ["petani", "distributor", "eksportir", "developer", "lainnya"].includes(val),
      "Peran tidak valid"
    ),
  pesan: z.string().max(500, "Pesan maksimal 500 karakter").optional(),
});

export async function kirimPesan(prevState, formData) {
  const rawData = {
    nama_lengkap: formData.get("nama_lengkap"),
    email: formData.get("email"),
    peran: formData.get("peran"),
    pesan: formData.get("pesan") || undefined,
  };

  const validasi = pesanSchema.safeParse(rawData);

  if (!validasi.success) {
    const fieldErrors = validasi.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Mohon perbaiki kesalahan di bawah ini.",
      errors: {
        nama_lengkap: fieldErrors.nama_lengkap?.[0] || null,
        email: fieldErrors.email?.[0] || null,
        peran: fieldErrors.peran?.[0] || null,
        pesan: fieldErrors.pesan?.[0] || null,
      },
    };
  }

  // Panggil Supabase secara dinamis di dalam fungsi (standar Next.js 14)
  const supabase = await createClient();

  const { error } = await supabase.from("messages").insert([
    {
      nama_lengkap: validasi.data.nama_lengkap,
      email: validasi.data.email,
      peran: validasi.data.peran,
      pesan: validasi.data.pesan || null,
    },
  ]);

  if (error) {
    console.error("Supabase error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan server. Silakan coba lagi.",
      errors: {},
    };
  }

  return {
    success: true,
    message: "Pesan berhasil dikirim! Tim kami akan menghubungi Anda dalam 1×24 jam.",
    errors: {},
  };
}
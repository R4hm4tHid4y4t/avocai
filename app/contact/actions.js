// app/contact/actions.js
"use server";

import { supabase } from "@/lib/supabase";

export async function kirimPesan(prevState, formData) {
  const nama_lengkap = formData.get("nama_lengkap");
  const email = formData.get("email");
  const peran = formData.get("peran");
  const pesan = formData.get("pesan");

  // Validasi
  if (!nama_lengkap || !email || !peran) {
    return {
      success: false,
      message: "Mohon lengkapi semua field yang wajib diisi.",
    };
  }

  if (!email.includes("@")) {
    return {
      success: false,
      message: "Format email tidak valid.",
    };
  }

  // Simpan ke Supabase
  const { error } = await supabase.from("messages").insert([
    {
      nama_lengkap,
      email,
      peran,
      pesan: pesan || null,
    },
  ]);

  if (error) {
    console.error("Supabase error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan. Silakan coba lagi.",
    };
  }

  return {
    success: true,
    message:
      "Pesan berhasil dikirim! Tim kami akan menghubungi Anda dalam 1×24 jam.",
  };
}
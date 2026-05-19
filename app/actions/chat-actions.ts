"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/app/lib/supabase/server";

export interface ActionState {
  success: boolean;
  message: string;
  errors?: {
    nama_lengkap?: string[];
    email?: string[];
    peran?: string[];
    pesan?: string[];
  };
}

// QA & Testing: Skema validasi ketat untuk "Naughty User"
const chatSchema = z.object({
  nama_lengkap: z
    .string()
    .trim()
    .min(2, "Nama terlalu pendek")
    .max(50, "Nama maksimal 50 karakter"), // Mencegah payload besar
  email: z
    .string()
    .trim()
    .email("Format email tidak valid")
    .max(100, "Email terlalu panjang"),
  peran: z.string().min(1, "Peran wajib dipilih"),
  pesan: z
    .string()
    .trim()
    .max(500, "Pesan maksimal 500 karakter")
    .optional(),
});

export async function createChatAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    nama_lengkap: formData.get("nama_lengkap"),
    email: formData.get("email"),
    peran: formData.get("peran"),
    pesan: formData.get("pesan"),
  };

  const validatedFields = chatSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Gagal menyimpan. Periksa kembali form Anda.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("messages").insert([
    {
      nama_lengkap: validatedFields.data.nama_lengkap,
      email: validatedFields.data.email,
      peran: validatedFields.data.peran,
      pesan: validatedFields.data.pesan || null,
    },
  ]);

  // Readiness Audit: Menghapus console.error untuk produksi
  if (error) {
    return {
      success: false,
      message: "Terjadi kesalahan pada server database. Silakan coba lagi.",
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Data berhasil ditambahkan ke sistem!",
  };
}

export async function deleteChatAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return { success: false, message: "ID data tidak valid." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    return { success: false, message: "Gagal menghapus data dari server." };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Data berhasil dihapus." };
}
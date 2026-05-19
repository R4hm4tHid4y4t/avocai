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

// Zod Schema untuk menangkal Naughty User
const chatSchema = z.object({
  nama_lengkap: z.string().trim().min(2, "Nama minimal 2 karakter").max(50, "Maksimal 50 karakter"),
  email: z.string().trim().email("Format email tidak valid").max(100, "Email terlalu panjang"),
  peran: z.string().min(1, "Peran wajib dipilih"),
  pesan: z.string().trim().max(500, "Maksimal 500 karakter").optional(),
});

export async function createChatAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = chatSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Gagal menyimpan. Periksa kembali form Anda.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert([validatedFields.data]);

  // Clean Code: Tanpa console.log/error untuk production
  if (error) return { success: false, message: "Terjadi kesalahan pada server database." };

  revalidatePath("/dashboard");
  return { success: true, message: "Data berhasil ditambahkan ke sistem!" };
}

export async function deleteChatAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = formData.get("id");
  if (!id || typeof id !== "string") return { success: false, message: "ID data tidak valid." };

  const supabase = await createClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) return { success: false, message: "Gagal menghapus data dari server." };

  revalidatePath("/dashboard");
  return { success: true, message: "Data berhasil dihapus." };
}
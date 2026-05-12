"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";
import { chatSchema, loginSchema } from "@/app/lib/validations";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: unknown;
};

export async function createChatAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();

  const rawInput = {
    nama_lengkap: formData.get("nama_lengkap"),
    email: formData.get("email"),
    peran: formData.get("peran"),
    pesan: formData.get("pesan"),
  };

  const parsed = chatSchema.safeParse(rawInput);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validasi gagal. Periksa kembali isian form.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase
    .from("messages")
    .insert({
      nama_lengkap: parsed.data.nama_lengkap,
      email: parsed.data.email,
      peran: parsed.data.peran,
      pesan: parsed.data.pesan || null,
    });

  if (error) {
    return {
      success: false,
      message: `Gagal menyimpan data: ${error.message}`,
    };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Data berhasil ditambahkan." };
}

export async function deleteChatAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return { success: false, message: "ID tidak valid." };
  }

  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      message: `Gagal menghapus data: ${error.message}`,
    };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Data berhasil dihapus." };
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const rawInput = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(rawInput);

  if (!parsed.success) {
    return {
      success: false,
      message: "Periksa kembali email dan password.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      message: `Login gagal: ${error.message}`,
    };
  }

  return { success: true, message: "Login berhasil." };
}
// app/dashboard/actions.js
// Server Actions untuk Dashboard

"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function hapusPesan(id) {
  const { error } = await supabaseAdmin
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Gagal menghapus pesan: " + error.message);
  }

  revalidatePath("/dashboard");
  return { success: true };
}
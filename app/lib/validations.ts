import { z } from "zod";

export const chatSchema = z.object({
  nama_lengkap: z
    .string()
    .min(1, "Nama lengkap tidak boleh kosong.")
    .max(100, "Nama maksimal 100 karakter."),
  email: z
    .string()
    .min(1, "Email tidak boleh kosong.")
    .email("Format email tidak valid."),
  peran: z
    .string()
    .min(1, "Peran harus dipilih."),
  pesan: z
    .string()
    .max(5000, "Pesan terlalu panjang.")
    .optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email tidak boleh kosong.")
    .email("Format email tidak valid."),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter.")
    .max(100, "Password terlalu panjang."),
});

export const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(2, "Nama minimal 2 karakter.")
      .max(50, "Nama maksimal 50 karakter."),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

export type ChatInput = z.infer<typeof chatSchema>;
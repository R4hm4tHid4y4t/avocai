"use client";

export default function ProfilePage() {
  const fields = [
    { label: "Nama Lengkap", value: "Rahmat Hidayat", type: "text" },
    { label: "Email", value: "rahmat@avocai.id", type: "email" },
    { label: "Nomor Telepon", value: "+62 812-3456-7890", type: "tel" },
    { label: "Perusahaan", value: "AvocAI Indonesia", type: "text" },
  ];
  const passFields = ["Password Lama", "Password Baru", "Konfirmasi Password"];

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
        <p className="text-gray-500 mt-1">Kelola informasi akun Anda.</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-900 flex items-center justify-center text-white text-xl font-bold">
            RH
          </div>
          <div>
            <p className="font-semibold text-gray-900">Rahmat Hidayat</p>
            <p className="text-sm text-gray-500">Pro Plan</p>
          </div>
          <button className="ml-auto text-sm text-green-600 hover:text-green-700 font-medium">
            Ganti Foto
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Informasi Dasar</h2>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                defaultValue={field.value}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-900"
              />
            </div>
          ))}
        </div>
        <button className="mt-5 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Simpan Perubahan
        </button>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Keamanan</h2>
        <div className="space-y-3">
          {passFields.map((label) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          ))}
        </div>
        <button className="mt-4 border border-green-600 text-green-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
          Ubah Password
        </button>
      </div>
    </div>
  );
}

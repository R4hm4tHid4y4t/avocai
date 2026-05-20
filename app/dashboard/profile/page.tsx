// app/dashboard/profile/page.tsx

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profil Saya</h1>
        <p className="text-gray-500 mt-1">Kelola informasi akun dan pengaturan personal Anda.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Kartu Foto Profil */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-green-50 mb-4">
                <img 
                  src="https://ui-avatars.com/api/?name=Rahmat+Hidayat&background=059669&color=fff&size=128" 
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <button className="absolute bottom-4 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-100 hover:text-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Rahmat Hidayat</h2>
            <p className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full mt-2">Administrator</p>
            <div className="w-full border-t border-gray-50 mt-6 pt-6 text-left space-y-3">
              <div className="flex items-center text-sm text-gray-500 italic">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Status: Aktif
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form Detail */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Informasi Personal
            </h3>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Nama Lengkap</label>
                  <input type="text" defaultValue="Rahmat Hidayat" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                  <input type="email" defaultValue="admin@avocai.id" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-gray-500" readOnly />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Biografi Singkat</label>
                <textarea rows={3} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none resize-none" defaultValue="Full-stack developer fokus pada implementasi AI untuk sektor Agritech Indonesia." />
              </div>

              <div className="pt-4 flex justify-end">
                <button type="button" className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all active:scale-95">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
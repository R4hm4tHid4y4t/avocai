const integrations = [
  { name: 'Supabase', desc: 'Database & Auth', status: 'Connected', icon: '⚡' },
  { name: 'TensorFlow', desc: 'AI Model Engine', status: 'Active', icon: '🧠' },
  { name: 'Vercel', desc: 'Deployment & Edge', status: 'Connected', icon: '▲' },
];

export default function IntegrationsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-500">Hubungkan AvocAI dengan layanan eksternal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div key={item.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                {item.status}
              </span>
            </div>
            <h3 className="font-bold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-6">{item.desc}</p>
            <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold transition-colors">
              Configure
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
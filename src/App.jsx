import { useState } from 'react';

// Icons (আপনি চাইলে lucide-react বা অন্য লাইব্রেরি ব্যবহার করতে পারেন, এখানে আমি ইমোজি দিচ্ছি)
const icons = {
  dashboard: "📊",
  yarn: "🧵",
  gsm: "📏",
  consumption: "👕",
  settings: "⚙️",
  user: "👤"
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* --- Navigation Bar --- */}
      <nav className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-white">T</div>
          <h1 className="text-2xl font-black tracking-tighter italic">Tex<span className="text-emerald-400">Calc</span></h1>
        </div>

        <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest opacity-80">
          <button onClick={() => setActiveTab('dashboard')} className={`hover:text-emerald-400 ${activeTab === 'dashboard' && 'text-emerald-400'}`}>Home</button>
          <button className="hover:text-emerald-400">Tools</button>
          <button className="hover:text-emerald-400">Docs</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs">Rifat</div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* --- Sidebar (Desktop) --- */}
        <aside className="hidden lg:flex w-64 flex-col h-[calc(100vh-72px)] sticky top-[72px] p-6 border-r border-white/5 bg-white/2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Main Menu</p>
          <div className="space-y-2">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: icons.dashboard },
              { id: 'yarn', name: 'Yarn Counter', icon: icons.yarn },
              { id: 'gsm', name: 'GSM Master', icon: icons.gsm },
              { id: 'consumption', name: 'Consumption', icon: icons.consumption },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold ${activeTab === item.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}
              >
                <span>{item.icon}</span> {item.name}
              </button>
            ))}
          </div>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="flex-1 p-6 md:p-12">
          {activeTab === 'dashboard' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-4xl font-black mb-2">Welcome back, Rifat!</h2>
              <p className="opacity-60 mb-10">What would you like to calculate today?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-8 rounded-[2rem] shadow-xl text-white">
                  <h3 className="text-2xl font-bold mb-2 italic underline">TexCalc Pro</h3>
                  <p className="text-sm opacity-80">You are using the latest version of TexCalc with Tailwind v4.</p>
                </div>
                {/* Add more info cards here */}
              </div>
            </section>
          )}

          {activeTab === 'yarn' && (
            <div className="max-w-2xl bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
              <h2 className="text-3xl font-bold mb-6">Yarn Count Calculator</h2>
              <p className="opacity-50">Logic implementation goes here...</p>
            </div>
          )}

          {/* বাকি ট্যাবের জন্য একইভাবে কন্টেন্ট যোগ করবেন */}
        </main>
      </div>

      {/* --- Footer --- */}
      <footer className="py-10 border-t border-white/5 text-center opacity-40 text-[10px] tracking-[0.3em] font-bold uppercase">
        &copy; 2026 TexCalc Systems - Built by Md. Rifat Aslam
      </footer>
    </div>
  );
}

export default App;
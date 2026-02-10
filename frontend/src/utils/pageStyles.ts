export const pageStyles = {
    // Layout-Basis
    layout: "h-full flex flex-col space-y-6 pb-24",
    
    // Header-Bereich
    headerWrapper: "flex items-center justify-between mb-2",
    title: "text-2xl font-bold text-slate-800",
    subtitle: "text-sm text-slate-500",

    // Suchleiste & Inputs
    searchWrapper: "relative group",
    searchInput: "w-full pl-12 pr-12 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white outline-none transition-all text-slate-700",
    formInput: "w-full p-4 bg-white rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
    
    // Karten-Listen-Design
    cardBase: "bg-white border border-slate-200 p-5 rounded-3xl shadow-sm hover:border-indigo-200 transition-colors",
    cardTitle: "font-bold text-lg text-slate-800 leading-tight mb-1",
    cardBadge: "bg-slate-100 px-2 py-0.5 rounded-md text-xs font-medium text-slate-400",

    // Buttons
    primaryBtn: "w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all",
    secondaryBtn: "w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all",
    iconBtn: "p-3 rounded-2xl transition-all active:scale-90",

    // Dynamische Styles (Funktionen)
    statusText: (color: 'green' | 'red' | 'indigo') => `text-[10px] font-bold uppercase tracking-widest text-${color}-500`,
    
    // Floating Container (z.B. für Speichern-Buttons)
    floatingFooter: "fixed bottom-24 left-0 right-0 px-6 pointer-events-none"
};
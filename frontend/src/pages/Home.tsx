import React, { useState, useMemo } from 'react';
import { Plus, Shuffle, Settings, Trash2, Search, X } from 'lucide-react';
import { useSets } from "../hooks/useSets";
import { motion, AnimatePresence } from 'framer-motion';
import { pageStyles as s } from "../utils/pageStyles"; // Unser Style-Alias

interface HomeProps {
    onEdit: (set: any) => void;
    onStudy: (set: any) => void;
}

const Home: React.FC<HomeProps> = ({ onEdit, onStudy }) => {
    const { sets, createNewSet, deleteSet } = useSets();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSets = useMemo(() => 
        sets.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [sets, searchQuery]);

    const handleCreate = () => createNewSet((newSet) => onEdit(newSet));

    return (
        <div className={s.layout}>
            {/* Header */}
            <header className={s.headerWrapper}>
                <div>
                    <h2 className={s.title}>Deine Sets</h2>
                    <p className={s.subtitle}>{sets.length} Sammlungen</p>
                </div>
                <button onClick={handleCreate} className={`${s.iconBtn} bg-indigo-600 text-white shadow-lg shadow-indigo-100`}>
                    <Plus size={24} />
                </button>
            </header>

            {/* Search Bar */}
            <div className={s.searchWrapper}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Sets durchsuchen..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={s.searchInput}
                />
                {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:bg-slate-200 rounded-full">
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* List Area */}
            <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredSets.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
                            {searchQuery ? "Keine Ergebnisse gefunden." : "Noch kein Set vorhanden."}
                        </motion.div>
                    ) : (
                        filteredSets.map(set => (
                            <SetCard 
                                key={set.id} 
                                set={set} 
                                onEdit={() => onEdit(set)} 
                                onStudy={() => onStudy(set)} 
                                onDelete={() => deleteSet(set.id)} 
                            />
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const SetCard = ({ set, onEdit, onStudy, onDelete }: any) => (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={s.cardBase}>
        <div className="flex items-start justify-between mb-4">
            <div className="cursor-pointer flex-1" onClick={onEdit}>
                <h3 className={s.cardTitle}>{set.title}</h3>
                <div className="flex items-center gap-2">
                    <span className={s.cardBadge}>{set.cards.length} Karten</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-400">{new Date(set.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="flex gap-1 ml-2">
                <button onClick={onEdit} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                    <Settings size={18} />
                </button>
                <button onClick={onDelete} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
        <button onClick={onStudy} className={s.secondaryBtn}>
            <Shuffle size={18} /> 
            <span>Lernen starten</span>
        </button>
    </motion.div>
);

export default Home;
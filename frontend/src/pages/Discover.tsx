import React, { useState, useEffect } from 'react';
import { ApiService } from "../services/api";
import { useSets } from "../hooks/useSets";
import { CardSet } from "../types";
import { Globe, Download, Shuffle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageStyles as s } from "../utils/pageStyles"; // Unser Style-Alias

const Discover: React.FC = () => {
    const { upsertSet } = useSets();
    const [publicSets, setPublicSets] = useState<CardSet[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSets = async () => {
        setIsLoading(true);
        try {
            const data = await ApiService.fetchPublicSets();
            setPublicSets(data || []);
        } catch (error) {
            console.error("Fehler beim Laden:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchSets(); }, []);

    const handleDownload = (set: CardSet) => {
        upsertSet(set);
        alert(`"${set.title}" wurde zu deinen Sets hinzugefügt!`);
    };

    return (
        <div className={s.layout}>
            {/* Header */}
            <header className={s.headerWrapper}>
                <div>
                    <h2 className={s.title}>Entdecken</h2>
                    <p className={s.subtitle}>Community-Inhalte laden</p>
                </div>
                <button 
                    onClick={fetchSets} 
                    disabled={isLoading}
                    className={`${s.iconBtn} text-indigo-600 hover:bg-indigo-50 disabled:opacity-50`}
                >
                    <Shuffle className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </header>

            <div className="grid gap-4">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div 
                            key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center py-20 text-slate-400"
                        >
                            <Loader2 className="animate-spin mb-2" size={32} />
                            <p className="text-sm font-medium">Suche globale Sets...</p>
                        </motion.div>
                    ) : publicSets.length === 0 ? (
                        <motion.div 
                            key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400"
                        >
                            <Globe className="mx-auto mb-4 opacity-20" size={48} />
                            <p className="text-sm">Keine öffentlichen Sets verfügbar.</p>
                        </motion.div>
                    ) : (
                        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            {publicSets.map(set => (
                                <PublicSetCard key={set.id} set={set} onDownload={() => handleDownload(set)} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const PublicSetCard = ({ set, onDownload }: { set: CardSet, onDownload: () => void }) => (
    <div className={s.cardBase + " flex items-center justify-between"}>
        <div className="flex-1 pr-4">
            <h3 className={s.cardTitle}>{set.title}</h3>
            <div className="flex items-center gap-2">
                <span className={s.cardBadge}>{set.cards.length} Karten</span>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Community</span>
            </div>
        </div>
        <button 
            onClick={onDownload}
            className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all active:scale-90 shadow-sm"
        >
            <Download size={20} />
        </button>
    </div>
);

export default Discover;
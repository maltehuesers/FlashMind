import React, { useState } from 'react';
import { CardSet } from "../types";
import { useSets } from "../hooks/useSets";
import { generateId } from "../utils/id";
import { Trash2, Save, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageStyles as s } from "../utils/pageStyles"; // Unser Style-Alias

interface EditProps {
    set: CardSet;
    onSave: () => void;
}

const Edit: React.FC<EditProps> = ({ set, onSave }) => {
    const { upsertSet } = useSets();
    const [activeSet, setActiveSet] = useState<CardSet>(set);

    const handleSave = () => {
        if (!activeSet.title.trim()) return alert("Name fehlt!");
        upsertSet(activeSet);
        onSave();
    };

    const addCard = () => {
        setActiveSet(prev => ({
            ...prev,
            cards: [...prev.cards, { id: generateId(), question: '', answer: '' }]
        }));
    };

    const updateCard = (id: string, field: 'question' | 'answer', value: string) => {
        setActiveSet(prev => ({
            ...prev,
            cards: prev.cards.map(c => c.id === id ? { ...c, [field]: value } : c)
        }));
    };

    const removeCard = (id: string) => {
        setActiveSet(prev => ({
            ...prev,
            cards: prev.cards.filter(c => c.id !== id)
        }));
    };

    return (
        <div className="max-w-md mx-auto space-y-6 pb-40">
            <header className="space-y-2">
                <h2 className={s.title}>Set bearbeiten</h2>
                <input
                    type="text"
                    value={activeSet.title}
                    onChange={e => setActiveSet({ ...activeSet, title: e.target.value })}
                    className={s.formInput}
                    placeholder="Titel des Sets..."
                />
            </header>
            
            <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Karten ({activeSet.cards.length})
                </label>
                
                <AnimatePresence initial={false}>
                    {activeSet.cards.map((card) => (
                        <EditCard 
                            key={card.id} 
                            card={card} 
                            onUpdate={updateCard} 
                            onRemove={removeCard} 
                        />
                    ))}
                </AnimatePresence>

                <button 
                    onClick={addCard} 
                    className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center gap-2 font-medium transition-all"
                >
                    <PlusCircle size={20} /> Karte hinzufügen
                </button>
            </div>

            {/* Floating Save Button */}
            <div className={s.floatingFooter}>
                <button onClick={handleSave} className={s.primaryBtn + " pointer-events-auto"}>
                    <Save size={20} /> 
                    <span>Änderungen speichern</span>
                </button>
            </div>
        </div>
    );
};

/**
 * Interne Sub-Komponente für die einzelnen Karten-Inputs
 */
const EditCard = ({ card, onUpdate, onRemove }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95 }}
        className={s.cardBase + " relative space-y-3"}
    >
        <button 
            onClick={() => onRemove(card.id)} 
            className="absolute right-3 top-3 text-slate-300 hover:text-red-500 p-1 transition-colors"
        >
            <Trash2 size={18} />
        </button>

        <div className="space-y-3">
            <div className="space-y-1">
                <span className={s.statusText('indigo')}>Vorderseite</span>
                <input
                    placeholder="Frage..."
                    className="w-full p-2 bg-slate-50 rounded-lg outline-none focus:ring-1 focus:ring-indigo-200 text-slate-700"
                    value={card.question}
                    onChange={e => onUpdate(card.id, 'question', e.target.value)}
                />
            </div>
            <div className="space-y-1">
                <span className={s.statusText('indigo')}>Rückseite</span>
                <textarea
                    placeholder="Antwort..."
                    className="w-full p-2 bg-slate-50 rounded-lg outline-none focus:ring-1 focus:ring-indigo-200 italic resize-none text-slate-600"
                    rows={2}
                    value={card.answer}
                    onChange={e => onUpdate(card.id, 'answer', e.target.value)}
                />
            </div>
        </div>
    </motion.div>
);

export default Edit;
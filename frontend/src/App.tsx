/**
 * Frontend: Hauptanwendung
 */
import React, { useState, useEffect } from 'react';
import { StorageService } from "./services/storage";
import { ApiService } from "./services/api";
import { CardSet, Card, View } from "./types";
import Flashcard from "./components/FlashCard";
import { Plus, Book, Globe, Settings, ArrowLeft, Trash2, Upload, Download, Shuffle, Save } from 'lucide-react';
import { API_NAME } from "./config";
import { StatusBar, Style } from '@capacitor/status-bar';

const generateId = () => {
    return typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Date.now().toString() + Math.random().toString(36).substring(2);
};

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [sets, setSets] = useState<CardSet[]>([]);
    const [activeSet, setActiveSet] = useState<CardSet | null>(null);
    const [studyCards, setStudyCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResults] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });
    const [publicSets, setPublicSets] = useState<CardSet[]>([]);

    // Initialer Ladevorgang
    useEffect(() => {
        setSets(StorageService.getSets());

        // Systemleiste (StatusBar) verstecken
        const hideStatusBar = async () => {
            try {
                await StatusBar.hide();
            } catch (e) {
                console.log("StatusBar hide nicht möglich (evtl. Browser-Modus)");
            }
        };

        hideStatusBar();
    }, []);

    const handleStartStudy = (set: CardSet) => {
        if (set.cards.length === 0) {
            alert("Dieses Set hat keine Karten!");
            return;
        }
        const shuffled = [...set.cards].sort(() => Math.random() - 0.5);
        setStudyCards(shuffled);
        setCurrentIndex(0);
        setResults({ correct: 0, wrong: 0 });
        setActiveSet(set);
        setView('study');
    };

    const handleCardResult = (correct: boolean) => {
        const newResults = correct
            ? { ...results, correct: results.correct + 1 }
            : { ...results, wrong: results.wrong + 1 };

        setResults(newResults);

        if (currentIndex < studyCards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setTimeout(() => {
                alert(`Lernen beendet!\nRichtig: ${newResults.correct}\nFalsch: ${newResults.wrong}`);
                setView('home');
            }, 300);
        }
    };

    const handleCreateNewSet = () => {
        const newSet: CardSet = {
            id: generateId(),
            title: 'Neues Set',
            description: '',
            cards: [{ id: generateId(), question: '', answer: '' }],
            createdAt: Date.now()
        };
        StorageService.upsertSet(newSet);
        setSets(StorageService.getSets());
        setActiveSet(newSet);
        setView('edit');
    };

    const handleSaveSet = () => {
        if (activeSet) {
            StorageService.upsertSet(activeSet);
            setSets(StorageService.getSets());
            setView('home');
        }
    };

    const handleDeleteSet = (id: string) => {
        // String-Konvertierung für sicheren Vergleich
        const targetId = String(id);

        if (window.confirm('Möchtest du dieses Set wirklich löschen?')) {
            // 1. UI sofort aktualisieren (Funktionaler State-Update ist am sichersten)
            setSets(prev => prev.filter(s => String(s.id) !== targetId));

            // 2. Im lokalen Speicher löschen
            StorageService.deleteSet(targetId);

            // 3. Falls wir gerade in diesem Set sind, Ansicht zurücksetzen
            if (activeSet && String(activeSet.id) === targetId) {
                setActiveSet(null);
                setView('home');
            }

            // 4. Im Hintergrund vom Server löschen (falls möglich)
            ApiService.deleteSet(targetId).catch(() => {
                console.log("Hinweis: Set konnte nicht vom Server gelöscht werden (evtl. offline oder nicht vorhanden).");
            });
        }
    };

    const handleUpload = async (set: CardSet) => {
        try {
            await ApiService.uploadSet(set);
            alert('Set erfolgreich hochgeladen!');
        } catch {
            alert('Upload fehlgeschlagen. Ist der Server erreichbar?');
        }
    };

    const handleDiscover = async () => {
        setView('discover');
        const data = await ApiService.fetchPublicSets();
        setPublicSets(data);
    };

    const handleDownload = (set: CardSet) => {
        StorageService.upsertSet(set);
        setSets(StorageService.getSets());
        alert('Set erfolgreich heruntergeladen!');
    };

    const addCardToActiveSet = () => {
        if (activeSet) {
            const newCard: Card = { id: generateId(), question: '', answer: '' };
            setActiveSet({ ...activeSet, cards: [...activeSet.cards, newCard] });
        }
    };

    return (
        <div className="h-screen w-full max-w-full overflow-hidden bg-slate-50 select-none safe-area-top">
            <div className="h-full flex flex-col w-full bg-white relative">
                {/* Header */}
                <header className="safe-header flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 bg-white z-50">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                            <Book className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-lg font-bold text-slate-800">FlashMind</h1>
                    </div>
                    {view !== 'home' && (
                        <button onClick={() => setView('home')} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-slate-600" />
                        </button>
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-1 w-full max-w-full overflow-y-auto scrollbar-hide p-6">
                    {view === 'home' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-800">Deine Sets</h2>
                                <button onClick={handleCreateNewSet} className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>

                            {sets.length === 0 ? (
                                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400">Noch keine Sets vorhanden.</p>
                                    <button onClick={handleCreateNewSet} className="mt-4 text-indigo-600 font-semibold underline">Erstes Set erstellen</button>
                                </div>
                            ) : (
                                <div className="grid gap-4 pb-20">
                                    {sets.map(set => (
                                        <div key={set.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-indigo-200 transition-all group">
                                            <div className="flex items-start gap-2 mb-3 w-full overflow-hidden">
                                                <div
                                                    className="min-w-0 flex-1 cursor-pointer"
                                                    onClick={() => { setActiveSet(set); setView('edit'); }}
                                                >
                                                    <h3 className="font-bold text-lg text-slate-800 leading-snug line-clamp-2 break-words">
                                                        {set.title}
                                                    </h3>

                                                    <p className="text-sm text-slate-500 truncate">
                                                        {set.cards.length} Karten • {new Date(set.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>

                                                <div className="shrink-0 flex items-center gap-1">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleUpload(set); }}
                                                        title="Hochladen"
                                                        className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg"
                                                    >
                                                        <Upload size={18} />
                                                    </button>

                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setActiveSet(set); setView('edit'); }}
                                                        title="Bearbeiten"
                                                        className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                                                    >
                                                        <Settings size={18} />
                                                    </button>

                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteSet(set.id); }}
                                                        title="Löschen"
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleStartStudy(set)}
                                                className="w-full mt-2 py-3 bg-slate-900 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-slate-800 active:scale-[0.98] transition-all"
                                            >
                                                <Shuffle size={18} />
                                                <span>Lernen starten</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {view === 'study' && activeSet && (
                        <div className="h-full flex flex-col items-center">
                            <div className="w-full flex justify-between items-center mb-8 px-2">
                                <span className="text-sm font-medium text-slate-500">Karte {currentIndex + 1} von {studyCards.length}</span>
                                <div className="flex space-x-3 text-sm font-bold">
                                    <span className="text-green-500">✓ {results.correct}</span>
                                    <span className="text-red-500">✗ {results.wrong}</span>
                                </div>
                            </div>
                            <Flashcard
                                key={studyCards[currentIndex].id}
                                card={studyCards[currentIndex]}
                                onResult={handleCardResult}
                            />
                        </div>
                    )}

                    {view === 'edit' && activeSet && (
                        <div className="space-y-6 pb-32">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-800">Set bearbeiten</h2>
                                <button
                                    onClick={() => handleDeleteSet(activeSet.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    title="Ganzes Set löschen"
                                >
                                    <Trash2 size={24} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1">Name des Sets</label>
                                    <input
                                        type="text"
                                        value={activeSet.title}
                                        onChange={e => setActiveSet({ ...activeSet, title: e.target.value })}
                                        className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="z.B. Englisch Vokabeln"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-slate-600">Karten bearbeiten</label>
                                    {activeSet.cards.map((card, idx) => (
                                        <div key={card.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative group overflow-hidden transition-all focus-within:border-indigo-300">
                                            <button
                                                onClick={() => {
                                                    const newCards = activeSet.cards.filter(c => c.id !== card.id);
                                                    setActiveSet({ ...activeSet, cards: newCards });
                                                }}
                                                className="absolute right-2 top-2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-red-500 shadow-sm hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            <input
                                                placeholder="Frage (Vorderseite)"
                                                className="w-full mb-2 p-2 bg-transparent border-b border-slate-200 focus:border-indigo-500 outline-none text-slate-800 font-medium"
                                                value={card.question}
                                                onChange={e => {
                                                    const newCards = [...activeSet.cards];
                                                    newCards[idx].question = e.target.value;
                                                    setActiveSet({ ...activeSet, cards: newCards });
                                                }}
                                            />
                                            <input
                                                placeholder="Antwort (Rückseite)"
                                                className="w-full p-2 bg-transparent focus:border-indigo-500 outline-none italic text-slate-600"
                                                value={card.answer}
                                                onChange={e => {
                                                    const newCards = [...activeSet.cards];
                                                    newCards[idx].answer = e.target.value;
                                                    setActiveSet({ ...activeSet, cards: newCards });
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={addCardToActiveSet}
                                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all font-medium active:scale-[0.99]"
                                    >
                                        + Karte hinzufügen
                                    </button>
                                </div>
                            </div>

                            <div className="sticky bottom-20 w-full p-4 bg-gradient-to-t from-white via-white/90 to-transparent">
                                <button
                                    onClick={handleSaveSet}
                                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 flex items-center justify-center space-x-2 active:scale-95 transition-transform"
                                >
                                    <Save size={20} />
                                    <span>Speichern & Schließen</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {view === 'discover' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-800">Weltweit teilen</h2>
                                <button onClick={handleDiscover} className="text-indigo-600 p-2 hover:bg-indigo-50 rounded-full transition-colors"><Shuffle size={18} /></button>
                            </div>
                            <p className="text-slate-500 text-sm italic">Sets von {API_NAME} herunterladen.</p>

                            <div className="grid gap-4 pb-20">
                                {publicSets.length === 0 ? (
                                    <div className="text-center py-20 text-slate-400">
                                        <Globe className="mx-auto mb-4 opacity-20" size={48} />
                                        <p>Keine öffentlichen Sets gefunden.</p>
                                    </div>
                                ) : (
                                    publicSets.map(set => (
                                        <div
                                            key={set.id}
                                            className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-3 shadow-sm w-full overflow-hidden"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-lg text-slate-800 leading-snug line-clamp-2 break-words">
                                                    {set.title}
                                                </h3>
                                                <p className="text-xs text-slate-400 truncate">{set.cards.length} Karten</p>
                                            </div>

                                            <button
                                                onClick={() => handleDownload(set)}
                                                className="shrink-0 p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors shadow-sm"
                                                aria-label="Download"
                                            >
                                                <Download size={20} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </main>

                {/* Navigation Bar */}
                <nav className="h-20 w-full bg-slate-50 border-t border-slate-100 flex items-center justify-around px-6 shrink-0 z-50">
                    <button
                        onClick={() => setView('home')}
                        className={`flex flex-col items-center space-y-1 transition-colors ${view === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}
                    >
                        <Book size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Meine Sets</span>
                    </button>
                    <button
                        onClick={handleDiscover}
                        className={`flex flex-col items-center space-y-1 transition-colors ${view === 'discover' ? 'text-indigo-600' : 'text-slate-400'}`}
                    >
                        <Globe size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Entdecken</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default App;

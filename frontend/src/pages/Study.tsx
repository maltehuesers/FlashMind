import React, { useState } from 'react';
import { CardSet } from "../types";
import { StorageService } from "../services/storage";
import Flashcard from "../components/FlashCard";
import { pageStyles as s } from "../utils/pageStyles"; // Unser Style-Alias

interface StudyProps {
    set: CardSet;
    onFinish: () => void;
}

const Study: React.FC<StudyProps> = ({ set, onFinish }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResults] = useState({ correct: 0, wrong: 0 });
    
    const [studyCards] = useState(() => 
        [...set.cards].sort((a, b) => (b.score || 0) - (a.score || 0) || Math.random() - 0.5)
    );

    const handleCardResult = (correct: boolean) => {
        const currentCard = studyCards[currentIndex];
        const oldScore = currentCard.score || 0;
        const newScore = correct ? Math.max(0, oldScore - 1) : oldScore + 1;

        StorageService.updateCardScore(set.id, currentCard.id, newScore);

        const newResults = correct 
            ? { ...results, correct: results.correct + 1 }
            : { ...results, wrong: results.wrong + 1 };
        
        setResults(newResults);

        if (currentIndex < studyCards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setTimeout(() => {
                alert(`Lernen beendet!\n✅ Richtig: ${newResults.correct}\n❌ Falsch: ${newResults.wrong}`);
                onFinish();
            }, 500);
        }
    };

    const progress = (currentIndex / studyCards.length) * 100;

    return (
        <div className="h-full flex flex-col items-center">
            {/* Fortschrittsbalken & Info */}
            <div className="w-full max-w-[320px] mb-8 space-y-4">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className={s.subtitle + " uppercase font-bold text-[10px] tracking-tight"}>
                            Fortschritt
                        </span>
                        <span className="text-lg font-bold text-slate-700">
                            {currentIndex + 1} <span className="text-slate-300">/</span> {studyCards.length}
                        </span>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <span className={s.statusText('green')}>Richtig</span>
                            <span className="font-bold text-green-600">{results.correct}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className={s.statusText('red')}>Falsch</span>
                            <span className="font-bold text-red-600">{results.wrong}</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div 
                        className="h-full bg-indigo-500 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(79,70,229,0.4)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Die Karteikarte */}
            <Flashcard 
                key={studyCards[currentIndex].id} 
                card={studyCards[currentIndex]} 
                onResult={handleCardResult} 
            />

            {/* Hilfe-Text unten */}
            <p className="mt-auto mb-10 text-slate-400 text-[11px] text-center px-10 leading-relaxed">
                Wische nach <span className="text-green-500 font-bold">rechts</span> für gewusst, <br />
                nach <span className="text-red-500 font-bold">links</span> für nicht gewusst.
            </p>
        </div>
    );
};

export default Study;
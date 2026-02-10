import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Card } from '../types';

interface FlashcardProps {
    card: Card;
    onResult: (correct: boolean) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onResult }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Motion Values für flüssige Animationen
    const x = useMotionValue(0);
    
    // Berechnete Werte basierend auf der Drag-Position
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0]);
    
    // Dynamische Hintergrundfarbe beim Swipen (Overlay-Effekt)
    const overlayGreen = useTransform(x, [0, 150], [0, 0.1]);
    const overlayRed = useTransform(x, [-150, 0], [0.1, 0]);

    const handleDragEnd = (_: any, info: any) => {
        // Schwellenwert für Erfolg/Fehler (100px)
        if (info.offset.x > 100) {
            onResult(true);
        } else if (info.offset.x < -100) {
            onResult(false);
        }
    };

    return (
        <div className="relative w-full h-[450px] flex items-center justify-center overflow-visible">
            {/* Swipe-Indikatoren (✓ / ✗) */}
            <motion.div 
                style={{ opacity: useTransform(x, [50, 120], [0, 1]) }}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-6xl text-green-500 font-bold pointer-events-none z-10"
            >
                ✓
            </motion.div>
            <motion.div 
                style={{ opacity: useTransform(x, [-120, -50], [1, 0]) }}
                className="absolute left-10 top-1/2 -translate-y-1/2 text-6xl text-red-500 font-bold pointer-events-none z-10"
            >
                ✗
            </motion.div>

            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ x, rotate, opacity }}
                onDragEnd={handleDragEnd}
                whileTap={{ scale: 0.95 }}
                className="relative w-full max-w-[320px] h-[400px] cursor-grab active:cursor-grabbing"
            >
                <AnimatePresence mode="wait">
                    {!isFlipped ? (
                        <motion.div
                            key="front"
                            initial={{ rotateY: -90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: 90, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            onClick={() => setIsFlipped(true)}
                            className="card-face card-front flex-col"
                        >
                            {/* Dynamisches Farb-Overlay beim Swipen */}
                            <motion.div className="absolute inset-0 bg-green-500 rounded-[30px]" style={{ opacity: overlayGreen }} />
                            <motion.div className="absolute inset-0 bg-red-500 rounded-[30px]" style={{ opacity: overlayRed }} />

                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4 z-20">Frage</span>
                            <h2 className="text-2xl font-semibold text-slate-800 z-20 px-2 break-words leading-tight">
                                {card.question}
                            </h2>
                            <p className="mt-8 text-slate-400 text-sm italic z-20">Zum Umdrehen tippen</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="back"
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -90, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            onClick={() => setIsFlipped(false)}
                            className="card-face card-back flex-col"
                        >
                            <motion.div className="absolute inset-0 bg-green-500 rounded-[30px]" style={{ opacity: overlayGreen }} />
                            <motion.div className="absolute inset-0 bg-red-500 rounded-[30px]" style={{ opacity: overlayRed }} />

                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4 z-20">Antwort</span>
                            <p className="text-xl font-medium text-slate-700 z-20 px-2 overflow-y-auto max-h-48">
                                {card.answer}
                            </p>
                            <div className="mt-12 flex space-x-6 text-[10px] font-bold uppercase tracking-wider text-slate-400 z-20">
                                <span className="flex items-center gap-1">← Falsch</span>
                                <span className="flex items-center gap-1">Richtig →</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Flashcard;

/**
 * Frontend: Karteikarten-Komponente mit Swipe & Flip
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Card } from '../types';

interface FlashcardProps {
    card: Card;
    onResult: (correct: boolean) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onResult }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Swipe Logic
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const colorCorrect = useTransform(x, [0, 100], ['#f8fafc', '#22c55e']);
    const colorWrong = useTransform(x, [-100, 0], ['#ef4444', '#f8fafc']);

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x > 100) {
            onResult(true);
        } else if (info.offset.x < -100) {
            onResult(false);
        }
    };

    return (
        <div className="relative overflow-hidden w-full h-[450px] flex items-center justify-center perspective-1000">
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ x, rotate, opacity }}
                onDragEnd={handleDragEnd}
                whileTap={{ scale: 0.98 }}
                className="relative w-72 h-96 cursor-grab active:cursor-grabbing"
            >
                <AnimatePresence mode="wait">
                    {!isFlipped ? (
                        <motion.div
                            key="front"
                            initial={{ rotateY: 90 }}
                            animate={{ rotateY: 0 }}
                            exit={{ rotateY: -90 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsFlipped(true)}
                            className="absolute inset-0 bg-white shadow-xl rounded-2xl border-2 border-slate-200 flex flex-col items-center justify-center p-6 text-center"
                        >
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">Frage</span>
                            <h2 className="text-2xl font-semibold text-slate-800">{card.question}</h2>
                            <p className="mt-8 text-slate-400 text-sm italic">Zum Umdrehen tippen</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="back"
                            initial={{ rotateY: 90 }}
                            animate={{ rotateY: 0 }}
                            exit={{ rotateY: -90 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsFlipped(false)}
                            className="absolute inset-0 bg-indigo-50 shadow-xl rounded-2xl border-2 border-indigo-200 flex flex-col items-center justify-center p-6 text-center"
                        >
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">Antwort</span>
                            <p className="text-xl font-medium text-slate-800">{card.answer}</p>
                            <div className="mt-12 flex space-x-4 text-xs font-medium uppercase text-slate-400">
                                <span>← Falsch</span>
                                <span>Richtig →</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Swipe Indicators */}
                <motion.div style={{ opacity: useTransform(x, [0, 80], [0, 1]) }} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full text-green-500 font-bold pointer-events-none"
>✓</motion.div>
                <motion.div style={{ opacity: useTransform(x, [-80, 0], [1, 0]) }} className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-full text-red-500 font-bold pointer-events-none">✗</motion.div>
            </motion.div>
        </div>
    );
};

export default Flashcard;

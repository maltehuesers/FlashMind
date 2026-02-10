import React from 'react';
import { Book, ArrowLeft } from 'lucide-react';
import { View } from '../../types';

interface HeaderProps {
    view: View;
    onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, onBack }) => {
    return (
        <header className="safe-header flex items-center justify-between px-6 border-b border-slate-100 sticky top-0 bg-white z-50 h-16 shrink-0">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                    <Book className="text-white w-5 h-5" />
                </div>
                <h1 className="text-lg font-bold text-slate-800">FlashMind</h1>
            </div>
            
            {view !== 'home' && (
                <button 
                    onClick={onBack} 
                    className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                    aria-label="Zurück"
                >
                    <ArrowLeft className="w-6 h-6 text-slate-600" />
                </button>
            )}
        </header>
    );
};

export default Header;
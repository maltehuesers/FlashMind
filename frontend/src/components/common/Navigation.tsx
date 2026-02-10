import React from 'react';
import { Book, Globe } from 'lucide-react';
import { View } from '../../types';

interface NavigationProps {
    currentView: View;
    setView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
    if (currentView === 'study') return null;

    return (
        <nav className="h-20 w-full bg-slate-50 border-t border-slate-100 flex items-center justify-around px-6 shrink-0 z-50 pb-safe">
            <button
                onClick={() => setView('home')}
                className={`flex flex-col items-center space-y-1 transition-colors ${
                    currentView === 'home' || currentView === 'edit' ? 'text-indigo-600' : 'text-slate-400'
                }`}
            >
                <Book size={24} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Meine Sets</span>
            </button>

            <button
                onClick={() => setView('discover')}
                className={`flex flex-col items-center space-y-1 transition-colors ${
                    currentView === 'discover' ? 'text-indigo-600' : 'text-slate-400'
                }`}
            >
                <Globe size={24} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Entdecken</span>
            </button>
        </nav>
    );
};

export default Navigation;
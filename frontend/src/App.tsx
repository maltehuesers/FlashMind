import React, { useState, useEffect } from 'react';
import { CardSet, View } from "./types";
import { StatusBar } from '@capacitor/status-bar';

import Home from './pages/Home';
import Study from './pages/Study';
import Edit from './pages/Edit';
import Discover from './pages/Discover';
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [activeSet, setActiveSet] = useState<CardSet | null>(null);

    useEffect(() => {
        StatusBar.hide().catch(() => console.log("Browser-Modus"));
    }, []);

    const navigateTo = (newView: View, set: CardSet | null = null) => {
        setActiveSet(set);
        setView(newView);
    };

    return (
        <div className="h-screen w-full flex flex-col bg-white overflow-hidden safe-area-top">
            <Header view={view} onBack={() => setView('home')} />
            
            <main className="flex-1 overflow-y-auto p-6">
                {view === 'home' && <Home onEdit={(set) => navigateTo('edit', set)} onStudy={(set) => navigateTo('study', set)} />}
                {view === 'study' && activeSet && <Study set={activeSet} onFinish={() => setView('home')} />}
                {view === 'edit' && activeSet && <Edit set={activeSet} onSave={() => setView('home')} />}
                {view === 'discover' && <Discover />}
            </main>

            <Navigation currentView={view} setView={setView} />
        </div>
    );
};

export default App;
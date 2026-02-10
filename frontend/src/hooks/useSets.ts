import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';
import { ApiService } from '../services/api';
import { CardSet } from '../types';
import { generateId } from '../utils/id';

export const useSets = () => {
    const [sets, setSets] = useState<CardSet[]>([]);

    const refreshSets = useCallback(() => {
        const data = StorageService.getSets();
        setSets(data);
    }, []);

    useEffect(() => {
        refreshSets();
    }, [refreshSets]);

    const upsertSet = (set: CardSet) => {
        StorageService.upsertSet(set);
        refreshSets();
    };

    const createNewSet = (callback?: (newSet: CardSet) => void) => {
        const newSet: CardSet = {
            id: generateId(),
            title: 'Neues Set',
            description: '',
            cards: [{ id: generateId(), question: '', answer: '' }],
            createdAt: Date.now()
        };
        StorageService.upsertSet(newSet);
        refreshSets();
        if (callback) callback(newSet);
    };

    const deleteSet = (id: string) => {
        if (window.confirm('Möchtest du dieses Set wirklich löschen?')) {
            StorageService.deleteSet(id);
            ApiService.deleteSet(id).catch(() => {
                console.log("Hinweis: Set nur lokal gelöscht.");
            });
            refreshSets();
        }
    };

    return { 
        sets, 
        refreshSets, 
        createNewSet, 
        upsertSet, 
        deleteSet 
    };
};
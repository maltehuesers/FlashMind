import { CardSet } from '../types';

const STORAGE_KEY = 'flashmind_local_sets';

export const StorageService = {
    getSets: (): CardSet[] => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (!data) return [];
            
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error("StorageService: Fehler beim Laden", e);
            return [];
        }
    },

    saveSets: (sets: CardSet[]): void => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
        } catch (e) {
            console.error("StorageService: Fehler beim Speichern", e);
        }
    },

    upsertSet: (updatedSet: CardSet): void => {
        const sets = StorageService.getSets();
        const index = sets.findIndex(s => String(s.id) === String(updatedSet.id));

        if (index !== -1) {
            sets[index] = { ...updatedSet };
        } else {
            sets.push(updatedSet);
        }

        StorageService.saveSets(sets);
    },

    updateCardScore: (setId: string, cardId: string, newScore: number) => {
        const sets = StorageService.getSets();
        const setIndex = sets.findIndex(s => String(s.id) === String(setId));
        
        if (setIndex !== -1) {
            const cardIndex = sets[setIndex].cards.findIndex(c => String(c.id) === String(cardId));
            if (cardIndex !== -1) {
                sets[setIndex].cards[cardIndex].score = newScore;
                StorageService.saveSets(sets);
            }
        }
    },

    deleteSet: (id: string): CardSet[] => {
        const sets = StorageService.getSets();
        const filtered = sets.filter(s => String(s.id) !== String(id));
        StorageService.saveSets(filtered);
        return filtered;
    }
};
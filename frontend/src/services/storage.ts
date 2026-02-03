
    /**
     * Frontend: Lokale Speicherung (Offline-Verfügbarkeit)
     */
import { CardSet } from '../types';

const STORAGE_KEY = 'flashmind_local_sets';

export const StorageService = {
    getSets: (): CardSet[] => {
        try {
        const data = localStorage.getItem(STORAGE_KEY);
        const parsed = data ? JSON.parse(data) : [];
        // Sicherstellen, dass wir immer ein Array zurückgeben
        return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
        console.error("Fehler beim Laden aus dem LocalStorage", e);
        return [];
        }
    },

    saveSets: (sets: CardSet[]) => {
        try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
        } catch (e) {
        console.error("Fehler beim Speichern in den LocalStorage", e);
        }
    },

    /**
     * Speichert ein Set oder aktualisiert es, falls es bereits existiert (Upsert)
     */
    upsertSet: (set: CardSet) => {
        const sets = StorageService.getSets();
        const index = sets.findIndex(s => String(s.id) === String(set.id));
        if (index !== -1) {
        sets[index] = set;
        } else {
        sets.push(set);
        }
        StorageService.saveSets(sets);
    },

    /**
     * Löscht ein Set und gibt die neue Liste zurück
     */
    deleteSet: (id: string): CardSet[] => {
        const sets = StorageService.getSets();
        const filtered = sets.filter(s => String(s.id) !== String(id));
        StorageService.saveSets(filtered);
        return filtered;
    }
};
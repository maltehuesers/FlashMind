    /**
     * Frontend: Schnittstelle zum Backend (Datenbank)
     */
import { CardSet } from "../types";
import { API_URL } from "../config";


if (!`${API_URL}`) {
    throw new Error("API_URL ist nicht gesetzt. Bitte .env prüfen.");
}

export const ApiService = {
    /**
     * Lädt ein Set auf den Server hoch
     */
    uploadSet: async (set: CardSet): Promise<void> => {
        try {
        const response = await fetch(`${API_URL}/sets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(set),
        });
        if (!response.ok) throw new Error("Upload fehlgeschlagen");
        } catch (error) {
        console.error("API Error:", error);
        throw error;
        }
    },

    /**
     * Löscht ein Set vom Server
     */
    deleteSet: async (id: string): Promise<void> => {
        try {
        const response = await fetch(`${API_URL}/sets/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Löschen auf Server fehlgeschlagen");
        } catch (error) {
        console.error("API Delete Error:", error);
        }
    },

    /**
     * Holt alle öffentlich geteilten Sets
     */
    fetchPublicSets: async (): Promise<CardSet[]> => {
        try {
        const response = await fetch(`${API_URL}/sets`);
        if (!response.ok) return [];
        return await response.json();
        } catch (error) {
        console.error("API Error:", error);
        return [];
        }
    },
};

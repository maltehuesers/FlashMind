/**
 * Frontend: Typ-Definitionen
 */
export interface Card {
    id: string;
    question: string;
    answer: string;
    score?: number;
}

export interface CardSet {
    id: string;
    title: string;
    description: string;
    cards: Card[];
    createdAt: number;
}

export type View = "home" | "study" | "edit" | "discover";
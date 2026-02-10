export const generateId = (): string => {
    return typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Date.now().toString() + Math.random().toString(36).substring(2);
};
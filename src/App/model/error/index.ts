class GUIError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export { GUIError };
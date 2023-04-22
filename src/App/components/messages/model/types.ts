export interface IFileListFunctions {
    addFiles: (files: File[]) => void;
    clear: () => void;
    files: File[];
}

export interface FileWithID extends File {
    id: number;
}
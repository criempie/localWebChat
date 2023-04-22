export interface IFileListFunctions {
    addFiles: (files: File[]) => void;
}

export interface FileWithID extends File {
    id: number;
}
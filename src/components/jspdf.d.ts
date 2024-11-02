declare module 'jspdf' {
    export default class jsPDF {
        constructor(orientation?: string, unit?: string, format?: string);
        addPage(): void;
        save(filename: string): void;
        text(text: string, x: number, y: number): void;
        // Add more methods as needed
    }
}

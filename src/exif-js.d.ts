declare module 'exif-js' {
    export function getData(image: string | ArrayBuffer, callback: (this: any) => void): void;
    export function getAllTags(image: any): any;
    export function getTag(image: any, tag: string): any;
    export function readFromBinaryFile(file: any): any;
  }
  
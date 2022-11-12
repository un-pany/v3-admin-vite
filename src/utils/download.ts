import { saveAs } from 'file-saver';

export const getFileName = (url: string) => url.split('/').pop()?.split('?')[0];

export const getFileExtension = (url: string) => url.split('/').pop()?.split('?')[0].split('.').pop() || '';

export const saveFile = (url: string, name: string) => {
  saveAs(url, name);
};

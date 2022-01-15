import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';

export const getMostRecentFile = (dir, numbersFiles) => {
  const files = _orderRecentFiles(dir);
  const uploadsToFile = [];
  for (let i = 0; i < numbersFiles; i++) {
    uploadsToFile.push(files[i].file);
  }

  return uploadsToFile.reverse();
};

const _orderRecentFiles = dir =>
  readdirSync(dir)
    .filter(file => lstatSync(join(dir, file)).isFile())
    .map(file => ({ file, mtime: lstatSync(join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

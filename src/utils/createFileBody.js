import { createReadStream } from 'fs';
import { join } from 'path';

export const createFileBody = array => {
  const files = [];
  for (let i = 0; i < array.length; i++) {
    const path = join(`${__dirname}/../uploads/${array[i].originalName}`);
    files.push({
      filename: array[i].fileName,
      content: createReadStream(path),
    });
  }

  return files;
};

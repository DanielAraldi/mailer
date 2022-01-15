import { join } from 'path';
import { writeFileSync } from 'fs';
import { v4 as uuid } from 'uuid';

export const constructFile = files => {
  files.map(({ fileName, data }) => {
    const hash = uuid();
    const pathFile = join(`${__dirname}/../uploads/${hash}-${fileName}`);

    writeFileSync(pathFile, data, { encoding: 'base64' }, err => {
      if (err) throw console.log(err);
      return;
    });
  });

  return files.map(({ fileName }) => {
    return { fileName };
  });
};

import { addToObject, constructFile, getMostRecentFile } from './index';
import { join } from 'path';

export const constructFileArray = array => {
  const fileArray = [];
  const numbersFiles = array.length;
  const way = join(`${__dirname}/../uploads`);
  const fileData = constructFile(array);
  const mostRecentFiles = getMostRecentFile(way, numbersFiles);
  for (let i = 0; i < mostRecentFiles.length; i++) {
    fileArray.push(
      addToObject(fileData[i], 'originalName', mostRecentFiles[i])
    );
  }

  return fileArray;
};

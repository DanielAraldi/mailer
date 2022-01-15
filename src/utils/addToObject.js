export const addToObject = (object, prop, value) => {
  if (prop !== 'originalName' && value !== '') {
    object[prop] = value;
  } else if (
    prop === 'originalName' &&
    !object.hasOwnProperty('originalName')
  ) {
    object[prop] = value;
  } else if (prop === 'originalName' && value !== '') {
    object[prop].push(value);
  } else if (value === '') delete object[prop];

  return object;
};

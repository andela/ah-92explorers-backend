export const sanitize = (object) => {
  const articleHolder = [];
  const objectStr = Object.prototype.toString.call(object);
  if (objectStr === '[object Array]' && objectStr) {
    object.forEach((element) => {
      articleHolder.push(
        Object.keys(element).reduce((obj, key) => {
          if (key !== '_highlightResult' && key !== 'objectID') {
            obj[key] = element[key];
          }
          return obj;
        }, {})
      );
    });
  }
  return articleHolder;
};

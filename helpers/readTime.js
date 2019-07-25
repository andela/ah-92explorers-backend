const WORDS_PER_MINUTE = 275;
const wordCount = (strings) => {
  const pattern = '\\w+';
  const reg = new RegExp(pattern, 'g');
  const len = strings.match(reg) || [];
  return len.length;
};
export const readTime = (strings, wordPerMinute = WORDS_PER_MINUTE) => {
  const wordCounts = wordCount(strings);
  const time = wordCounts / wordPerMinute;
  return {
    counts: wordCounts,
    time
  };
};
export const stringifyTime = (time) => {
  if (time < 0.5) {
    return 'less than a minute';
  } if (time >= 0.5 && time < 1.5) {
    return '1 minute';
  }
  return `${Math.ceil(time)} minutes`;
};
const scriptTags = (script) => {
  const pattern = '<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>';
  const reg = new RegExp(pattern, 'gi');
  return script.replace(reg, '');
};
const trimWhiteSpaces = string => string.replace(/^\s+/, '').replace(/\s+$/, '');
export const accReadTime = (strings) => {
  const cleanString = scriptTags(trimWhiteSpaces(strings));
  const { counts, time } = readTime(cleanString);
  return {
    readTime: stringifyTime(time),
    counts
  };
};

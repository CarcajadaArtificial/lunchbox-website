export function generateRandomWord(length: number): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}

export function generateGibberish(words: number): string {
  const parts: string[] = [];
  for (let i = 0; i < words; i++) {
    const len = Math.floor(Math.random() * 7) + 2;
    parts.push(generateRandomWord(len));
  }
  return parts.join(" ");
}

export function transformSentence(str: string): string {
  if (str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1) + ".";
}

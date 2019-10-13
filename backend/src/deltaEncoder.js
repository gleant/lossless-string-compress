/**
 * Compresses given string using delta encoding.
 * Throws Illegal argument error if stringToCompress argument is not a string.
 * @param {string} stringToCompress String to compress
 */
module.exports.compress = function compress(stringToCompress) {
  if (!stringToCompress || typeof stringToCompress !== "string") {
    throw new Error("Illegal argument");
  }

  return stringToCompress
    .trim()
    .split("\n")
    .reduce(
      (prev, current) => {
        const sharedCharCount = countSharedChars(prev.prevWord, current);
        return {
          prevWord: current,
          compressedString: `${
            prev.compressedString
          }${sharedCharCount} ${current.substring(sharedCharCount)}\n`,
        };
      },
      {
        prevWord: "",
        compressedString: "",
      },
    ).compressedString;
};

/**
 * Counts how many characters two word shares from start of the strings.
 * @param {string} word1 Word where to compare
 * @param {string} word2 Word which to compare
 */
function countSharedChars(word1, word2) {
  const sharedCharCount = word1
    .split("")
    .findIndex((char, index) => char !== word2[index]);
  return sharedCharCount !== -1 ? sharedCharCount : word1.length;
}

/**
 * Decompresses delta encoded string to back original string.
 * Throws illegal argument error if stringToDecompress is not delta encoded string.
 * @param {string} stringToDecompress String to decompress
 */
module.exports.decompress = function decompress(stringToDecompress) {
  if (!stringToDecompress || typeof stringToDecompress !== "string") {
    throw new Error("Illegal argument");
  }

  return stringToDecompress
    .trim()
    .split("\n")
    .reduce(
      (prev, current) => {
        const originalWord = getOriginalWord(prev.prevWord, current);
        return {
          prevWord: originalWord,
          originalString: `${prev.originalString}${originalWord}\n`,
        };
      },
      {
        prevWord: "",
        originalString: "",
      },
    ).originalString;
};

/**
 * Constructs an original word from compressed word and previous word in original string.
 * @param {string} prevWord Previous word in original string
 * @param {string} compressedWord Word to decompress
 */
function getOriginalWord(prevWord, compressedWord) {
  const [charsInPrevWordString, wordSuffix] = compressedWord.split(" ");
  const charsInPrevWord = parseInt(charsInPrevWordString, 10);
  if (Number.isNaN(charsInPrevWord)) {
    throw new Error("Illegal argument");
  }
  return `${prevWord.substring(0, charsInPrevWord)}${wordSuffix || ""}`;
}

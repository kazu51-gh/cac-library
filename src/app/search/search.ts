import { books } from "@/books";
import { Book } from "@/types/book";

export type BookList = Array<Book>;
export type Vector = Array<number>;

export default function searchBooks(input: string, fuzzy: boolean = false) : BookList {
  let result: Set<Book>;
  const keywords = splitByWhitespace(input.toUpperCase()).filter(x => !isBlank(x));

  if (fuzzy) {
    const bookToSimilarity = new Map<Book, number>();
    for (const keyword of keywords) {
      books.forEach(book => {
        const simirality = maxSimilarityOfNGram(keyword, book.name.toUpperCase());
        if (simirality > 0.8) {
          bookToSimilarity.set(book, simirality);
        }
      });
    }

    result = new Set<Book>();
    const sorted = [...bookToSimilarity].sort((a ,b) => b[1] - a[1]);
    console.log(sorted);
    sorted.forEach(e => result.add(e[0]));
  } else {
    result = new Set<Book>(books);
    for (const keyword of keywords) {
      books
      .filter(book => book.name.toUpperCase().includes(keyword))
      .forEach(book => result.delete(book));
    }
  }

  return Array.from(result);
}

/**
 * Check the given string is blank or not. a blank string means empty string or it only includes whitespaces.
 * @param input 
 * @returns Returns true if the given input is blank. Otherwise, retrurn false.
 */
function isBlank(input: string): boolean {
  if (!input) {
    return true;
  }
  return input.trim().length == 0;
}

function splitByWhitespace(input: string): Array<string> {
  const result = new Array<string>();

  let buffer = "";
  let quotes = 0;
  for (const c of input) {
    if (c === "\"") {
      quotes++;
      if (quotes %2 == 0) {
        result.push(buffer);
        buffer = "";
        continue;
      }
    }
    if (c === " ") {
      if (quotes % 2 == 0) {
        result.push(buffer);
        buffer = "";
        continue;
      }
    }
    buffer += c;
  }
  result.push(buffer);
  return result;
}

function maxSimilarityOfNGram(str1: string, str2: string): number {
  const [longStr, shortStr] = str1.length > str2.length ? [str1, str2] : [str2, str1];

  let result = Number.MIN_VALUE;
  for (let i = 0; i < longStr.length + shortStr.length; i++) {
    const subString = longStr.substring(i, i + shortStr.length);
    const cosine = consineSimilarity(shortStr, subString);
    if (cosine > result) {
      result = cosine;
    }
  }

  return result;
}

function dot(vec1: Vector, vec2: Vector): number {
  if (vec1.length != vec2.length) {
    console.error("Cannot calculate dot because given two vectors's length is not the same");
    return 0;
  }

  let result = 0;
  for (let i = 0; i < vec1.length; i++) {
    result += vec1[i] * vec2[i];
  }

  return result;
}

function length(vec: Vector): number {
  const ss = vec.map(x => x * x).reduce((acc, x) => acc + x, 0); // Sum of Square
  return Math.sqrt(ss);
}

function consineSimilarity(str1: string, str2: string): number {
  const chars = new Set<string>((str1 + str2).split("").filter(c => !isBlank(c)));
  const vec1 = Array.from(chars).map(c => str1.includes(c) ? 1 : 0);
  const vec2 = Array.from(chars).map(c => str2.includes(c) ? 1 : 0);

  const cosine = dot(vec1, vec2) / (length(vec1) * length(vec2));
  return Math.abs(cosine);
}
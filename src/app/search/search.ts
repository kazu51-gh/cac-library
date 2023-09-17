import { books } from "@/books";
import { Book } from "@/types/book";

export type BookList = Array<Book>;
export type Vector = Array<number>;

export default function searchBooks(input: string, fuzzy: boolean = false) : BookList {
  const result = new Set<Book>(books);

  if (fuzzy) {
    // const keywords = splitByCharacterType(input.toUpperCase());
    const keywords = input.toUpperCase().split(" ").filter(x => !isBlank(x));
    for (const keyword of keywords) {
      books.filter(book => consineSimirality(keyword, book.name.toUpperCase()) < 0.2)
      .forEach(book => result.delete(book));
    }
  } else {
    const keywords = input.toUpperCase().split(" ").filter(x => !isBlank(x));
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

function splitByCharacterType(input: string): Array<string> {
  const result = new Array<string>();
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

function consineSimirality(str1: string, str2: string): number {
  const chars = new Set<string>((str1 + str2).split("").filter(c => !isBlank(c)));
  const vec1 = Array.from(chars).map(c => str1.includes(c) ? 1 : 0);
  const vec2 = Array.from(chars).map(c => str2.includes(c) ? 1 : 0);

  const cosine = dot(vec1, vec2) / (length(vec1) * length(vec2));
  return Math.abs(cosine);
}
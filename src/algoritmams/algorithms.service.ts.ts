import { Injectable } from '@nestjs/common';

@Injectable()
export class AlgorithmsService {
  reverseAlphabet(input: string): string {
    const letters = input.match(/[A-Z]/g) || [];
    const reversedLetters = letters.reverse().join('');
    const numbers = input.match(/\d+/g) || [];
    const result = `${reversedLetters}${numbers.join('')}`;
    return result;
  }

  longest(sentence: string): { word: string; length: number } {
    const words = sentence.split(' ');
    let longestWord = '';

    for (const word of words) {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    }

    const result = { word: longestWord, length: longestWord.length };
    return result;
  }

  countOccurrences(input: string[], query: string[]): number[] {
    const result = query.map((q) => input.filter((item) => item === q).length);
    return result;
  }

  diagonalDifference(matrix: number[][]): number {
    const n = matrix.length;
    let primaryDiagonal = 0;
    let secondaryDiagonal = 0;

    for (let i = 0; i < n; i++) {
      primaryDiagonal += matrix[i][i];
      secondaryDiagonal += matrix[i][n - 1 - i];
    }

    const result = primaryDiagonal - secondaryDiagonal;
    return result;
  }
}

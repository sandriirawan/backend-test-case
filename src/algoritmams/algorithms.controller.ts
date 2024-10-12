import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { AlgorithmsService } from './algorithms.service.ts';

@ApiTags('algorithms')
@Controller('algorithms')
export class AlgorithmsController {
  constructor(private readonly algorithmsService: AlgorithmsService) {}

  @Get('reverse-alphabet')
  @ApiQuery({
    name: 'input',
    required: true,
    description: 'Input string to reverse',
    example: 'NEGIE1',
  })
  reverseAlphabet(@Query('input') input: string): string {
    return this.algorithmsService.reverseAlphabet(input);
  }

  @Get('longest-word')
  @ApiQuery({
    name: 'sentence',
    required: true,
    description: 'Sentence to find the longest word',
    example: 'Saya sangat senang mengerjakan soal algoritma',
  })
  longest(@Query('sentence') sentence: string): {
    word: string;
    length: number;
  } {
    return this.algorithmsService.longest(sentence);
  }

  @Get('count-occurrences')
  @ApiQuery({
    name: 'input',
    required: true,
    isArray: true,
    description: 'Input array of strings',
    example: ['xc', 'dz', 'bbb', 'dz'],
  })
  @ApiQuery({
    name: 'query',
    required: true,
    isArray: true,
    description: 'Array of queries to count',
    example: ['bbb', 'ac', 'dz'],
  })
  countOccurrences(
    @Query('input') input: string[],
    @Query('query') query: string[],
  ): number[] {
    return this.algorithmsService.countOccurrences(input, query);
  }

  @Get('diagonal-difference')
  diagonalDifference(): number {
    const matrix = [
      [1, 2, 0],
      [4, 5, 6],
      [7, 8, 9],
    ];
    return this.algorithmsService.diagonalDifference(matrix);
  }
}

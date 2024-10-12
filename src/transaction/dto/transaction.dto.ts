import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class BorrowBooksDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  memberId: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  bookIds: string[];
}

export class ReturnBooksDto {
  @IsNotEmpty()
  @ApiProperty()
  memberId: string;

  @IsArray()
  @ApiProperty()
  @IsNotEmpty({ each: true })
  bookIds: string[];
}

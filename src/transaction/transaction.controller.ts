import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { BorrowBooksDto, ReturnBooksDto } from './dto/transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('borrow')
  @ApiResponse({ status: 201, description: 'Books borrowed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async borrowBooks(@Body() borrowBooksDto: BorrowBooksDto): Promise<any> {
    try {
      return await this.transactionService.borrowBooks(borrowBooksDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Post('return')
  @ApiResponse({ status: 200, description: 'Books returned successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async returnBooks(@Body() returnBooksDto: ReturnBooksDto): Promise<any> {
    try {
      return await this.transactionService.returnBooks(returnBooksDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get('members')
  @ApiResponse({ status: 200, description: 'Retrieved all members.' })
  async getAllMembers(): Promise<any> {
    return await this.transactionService.getAllMembers();
  }
}

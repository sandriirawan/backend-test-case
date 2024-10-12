import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  Res,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Search for a book by title',
  })
  async findAll(@Query('title') title?: string) {
    return this.bookService.findAll(title);
  }
  @Get(':book_id')
  async findOne(@Param('book_id') book_id: string) {
    return this.bookService.findOne(book_id);
  }

  @Put(':book_id')
  async update(
    @Param('book_id') book_id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(book_id, updateBookDto);
  }

  @Delete(':book_id')
  async delete(@Param('book_id') book_id: string) {
    return this.bookService.delete(book_id);
  }
}

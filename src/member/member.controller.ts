import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateMemberDto } from './dto/update-member.dto';

@ApiTags('members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Search for a member name',
  })
  async findAll(@Query('name') name?: string) {
    return this.memberService.findAll(name);
  }
  @Get(':member_id')
  async findOne(@Param('member_id') member_id: string) {
    return this.memberService.findOne(member_id);
  }

  @Put(':member_id')
  async update(
    @Param('member_id') member_id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(member_id, updateMemberDto);
  }

  @Delete(':member_id')
  async delete(@Param('member_id') member_id: string) {
    return this.memberService.delete(member_id);
  }
}

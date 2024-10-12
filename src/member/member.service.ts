import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Member } from './entity/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async findAll(name?: string): Promise<Member[]> {
    if (name) {
      return this.memberRepository.find({
        where: { name: ILike(`%${name}%`) },
      });
    }
    return this.memberRepository.find();
  }
  async findOne(member_id: string): Promise<Member> {
    return this.memberRepository.findOne({ where: { member_id } });
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const book = this.memberRepository.create(createMemberDto);
    return await this.memberRepository.save(book);
  }

  async update(
    member_id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    await this.memberRepository.update(member_id, updateMemberDto);
    return this.memberRepository.findOne({ where: { member_id } });
  }

  async delete(member_id: string): Promise<void> {
    await this.memberRepository.delete(member_id);
  }
}

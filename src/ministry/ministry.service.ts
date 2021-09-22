import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMinistryDto } from './dto/create-ministry.dto';
import { UpdateMinistryDto } from './dto/update-ministry.dto';
import { Ministry } from './entities/ministry.entity';

@Injectable()
export class MinistryService {
  constructor(
    @InjectRepository(Ministry) private readonly repo: Repository<Ministry>,
  ) {}

  async create(createMinistryDto: CreateMinistryDto): Promise<Ministry> {
    return await this.repo.save(createMinistryDto);
  }

  async findAll(): Promise<Ministry[]> {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const ministry = await this.repo.findOne(id);
    if (!ministry) {
      throw new BadRequestException('This ministry not exist');
    }
    return ministry;
  }

  async update(id: number, updateMinistryDto: UpdateMinistryDto) {
    const ministry = await this.repo.findOne(id);
    if (!ministry) {
      throw new BadRequestException('This ministry not exist');
    }
    return await this.repo.save({ ...ministry, ...updateMinistryDto });
  }

  async remove(id: number) {
    const ministry = await this.repo.findOne(id);
    if (!ministry) {
      throw new BadRequestException('This ministery not exist');
    }
    return await this.repo.remove(ministry);
  }
}

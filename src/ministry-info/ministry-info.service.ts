import { Injectable } from '@nestjs/common';
import { CreateMinistryInfoDto } from './dto/create-ministry-info.dto';
import { UpdateMinistryInfoDto } from './dto/update-ministry-info.dto';

@Injectable()
export class MinistryInfoService {
  create(createMinistryInfoDto: CreateMinistryInfoDto) {
    return 'This action adds a new ministryInfo';
  }

  findAll() {
    return `This action returns all ministryInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ministryInfo`;
  }

  update(id: number, updateMinistryInfoDto: UpdateMinistryInfoDto) {
    return `This action updates a #${id} ministryInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ministryInfo`;
  }
}

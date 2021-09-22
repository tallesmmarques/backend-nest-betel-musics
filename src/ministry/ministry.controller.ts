import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { MinistryService } from './ministry.service';
import { CreateMinistryDto } from './dto/create-ministry.dto';
import { UpdateMinistryDto } from './dto/update-ministry.dto';

@Controller('ministry')
export class MinistryController {
  constructor(private readonly ministryService: MinistryService) {}

  @Post()
  async create(@Body() createMinistryDto: CreateMinistryDto) {
    try {
      return await this.ministryService.create(createMinistryDto);
    } catch (err) {
      switch (err.code) {
        case '23502':
          throw new BadRequestException('Missing attributes');
          break;
        case '23505':
          throw new ConflictException('This ministry already exists');
          break;

        default:
          throw new BadRequestException();
          break;
      }
      console.log(err);
    }
  }

  @Get()
  async findAll() {
    return await this.ministryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ministryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMinistryDto: UpdateMinistryDto,
  ) {
    return this.ministryService.update(+id, updateMinistryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ministryService.remove(+id);
  }
}

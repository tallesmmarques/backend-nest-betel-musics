import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinistryInfoService } from './ministry-info.service';
import { CreateMinistryInfoDto } from './dto/create-ministry-info.dto';
import { UpdateMinistryInfoDto } from './dto/update-ministry-info.dto';

@Controller('ministry-info')
export class MinistryInfoController {
  constructor(private readonly ministryInfoService: MinistryInfoService) {}

  @Post()
  create(@Body() createMinistryInfoDto: CreateMinistryInfoDto) {
    return this.ministryInfoService.create(createMinistryInfoDto);
  }

  @Get()
  findAll() {
    return this.ministryInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ministryInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinistryInfoDto: UpdateMinistryInfoDto) {
    return this.ministryInfoService.update(+id, updateMinistryInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ministryInfoService.remove(+id);
  }
}

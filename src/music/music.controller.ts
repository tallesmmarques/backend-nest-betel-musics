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
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  async create(@Body() createMusicDto: CreateMusicDto) {
    try {
      return await this.musicService.create(createMusicDto);
    } catch (err) {
      switch (err.code) {
        case '23502':
          throw new BadRequestException('Missing attributes');
          break;
        case '23505':
          throw new ConflictException('This music already exists');
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
    return await this.musicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.musicService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return await this.musicService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicService.remove(+id);
  }
}

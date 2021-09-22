import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MinistryInfo } from 'src/ministry-info/entities/ministry-info.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './entities/music.entity';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music) private readonly repo: Repository<Music>,
  ) {}

  async create(createMusicDto: CreateMusicDto) {
    return await this.repo.save(createMusicDto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const music = await this.repo.findOne(id);
    if (!music) {
      throw new BadRequestException('This music not exist');
    }
    return music;
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    const music = await this.repo.findOne(id);
    if (!music) {
      throw new BadRequestException('This music not exist');
    }

    const ChangeMinistriesInfo = updateMusicDto.ministriesInfo.map(
      (newInfo) => {
        const equalInfo = music.ministriesInfo.find(
          (info) => info.ministry === newInfo.ministry,
        );
        if (equalInfo) {
          return {
            id: equalInfo.id,
            ministry: newInfo.ministry,
            tone: newInfo.tone,
            lastPlayed: newInfo.lastPlayed,
            timesPlayed: newInfo.timesPlayed,
          };
        } else {
          return newInfo;
        }
      },
    );

    const noChangeMinistriesInfo = music.ministriesInfo.filter((info) => {
      // filtro deve passar apenas infos com ministry não inclusos em update
      const findEqual = updateMusicDto.ministriesInfo.find(
        (newInfo) => newInfo.ministry === info.ministry,
      );
      if (findEqual) {
        return false;
      }
      return true;
    });
    const ministriesInfo = ChangeMinistriesInfo.concat(noChangeMinistriesInfo);

    return await this.repo.save({
      ...music,
      ...updateMusicDto,
      ministriesInfo,
    });
  }

  async remove(id: number) {
    const music = await this.repo.findOne(id);
    if (!music) {
      throw new BadRequestException('This music not exist');
    }
    return await this.repo.remove(music);
  }
}

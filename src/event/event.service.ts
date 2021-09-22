import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicService } from 'src/music/music.service';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { SignEventDto } from './dto/sign-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly repo: Repository<Event>,
    private readonly musicService: MusicService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    return await this.repo.save(createEventDto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const event = await this.repo.findOne(id);
    if (!event) {
      throw new BadRequestException('This event not exist');
    }
    return event;
  }

  async signPlayed(id: number, signEventDto: SignEventDto) {
    const event = await this.repo.findOne(id);
    if (!event) {
      throw new BadRequestException('This event not exist');
    }

    if (event.played) {
      throw new BadRequestException('This event has already been played');
    }

    if (
      signEventDto.exception?.reduce((p, c) => {
        return p || c.id === undefined;
      }, false)
    ) {
      throw new BadRequestException('Missing ids into except musics');
    }

    event.musics.forEach((music) => {
      if (
        !signEventDto.exception?.find(
          (exceptMusic) => exceptMusic.id === music.id,
        )
      ) {
        const info = music.ministriesInfo.find(
          (info) => info.ministry === event.ministry,
        );
        const lastPlayed = event.date;
        info.lastPlayed = lastPlayed;
        const timesPlayed = info.timesPlayed + 1;
        info.timesPlayed = timesPlayed;

        this.musicService.update(music.id, {
          ministriesInfo: [
            {
              ministry: info.ministry,
              lastPlayed,
              timesPlayed,
            },
          ],
        });
      }
    });
    event.played = true;

    return await this.repo.save(event);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.repo.findOne(id);
    if (!event) {
      throw new BadRequestException('This event not exist');
    }

    if (
      updateEventDto.musics?.reduce((p, c) => {
        return p || c.id === undefined;
      }, false)
    ) {
      throw new BadRequestException('Missing ids into musics');
    }

    return await this.repo.save({
      ...event,
      ...updateEventDto,
    });
  }

  async remove(id: number) {
    const event = await this.repo.findOne(id);
    if (!event) {
      throw new BadRequestException('This event not exist');
    }
    return await this.repo.remove(event);
  }
}

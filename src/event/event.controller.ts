import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { SignEventDto } from './dto/sign-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      return await this.eventService.create(createEventDto);
    } catch (err) {
      switch (err.code) {
        case '23502':
          throw new BadRequestException('Missing attributes');
          break;
        case '23505':
          throw new ConflictException('This event already exists');
          break;

        default:
          throw new BadRequestException();
          break;
      }
    }
  }

  @Get()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(+id);
  }

  @Patch('played/:id')
  async signPlayed(
    @Param('id') id: string,
    @Body() signEventDto: SignEventDto,
  ) {
    return await this.eventService.signPlayed(+id, signEventDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}

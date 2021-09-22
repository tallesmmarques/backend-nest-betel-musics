import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  title: string;
  ministry: string;
  date: Date;
  musics: [
    {
      id: number;
    },
  ];
  played: boolean;
}

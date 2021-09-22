import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicDto } from './create-music.dto';

export class UpdateMusicDto extends PartialType(CreateMusicDto) {
  name?: string;
  author?: string;
  gender?: string;
  ministriesInfo?: [
    {
      ministry: string;
      tone?: string;
      lastPlayed?: Date;
      timesPlayed?: number;
    },
  ];
  linkCifra?: string;
  linkYoutube?: string;
}

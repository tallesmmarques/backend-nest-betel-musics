export class CreateMusicDto {
  name: string;
  author: string;
  gender: string;
  ministriesInfo?: [
    {
      ministry: string;
      tone?: string;
    },
  ];
  linkCifra?: string;
  linkYoutube?: string;
}

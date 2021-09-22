export class CreateEventDto {
  title: string;
  ministry: string;
  date: Date;
  musics: [
    {
      id: number;
    },
  ];
}

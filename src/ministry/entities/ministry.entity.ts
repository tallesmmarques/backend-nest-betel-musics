import { Event } from 'src/event/entities/event.entity';
import { MinistryInfo } from 'src/ministry-info/entities/ministry-info.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ministry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @OneToMany(() => MinistryInfo, (ministryInfo) => ministryInfo.ministry)
  ministriesInfo: MinistryInfo[];

  @OneToMany(() => Event, (event) => event.ministry)
  events: Event[];
}

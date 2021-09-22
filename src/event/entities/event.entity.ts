import { Ministry } from 'src/ministry/entities/ministry.entity';
import { Music } from 'src/music/entities/music.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @ManyToOne(() => Ministry, (ministry) => ministry.events)
  ministry: Ministry;

  @ManyToMany(() => Music, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinTable()
  musics: Music[];

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: false })
  played: boolean;
}

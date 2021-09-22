import { Music } from 'src/music/entities/music.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 50 })
  ministry: string;

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

import { Ministry } from 'src/ministry/entities/ministry.entity';
import { Music } from 'src/music/entities/music.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MinistryInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ministry, (ministry) => ministry.ministriesInfo)
  ministry: Ministry;

  @ManyToOne(() => Music, (music) => music.ministriesInfo, {
    onDelete: 'CASCADE',
  })
  music: Music;

  @Column({ length: 5 })
  tone: string;

  @Column({ type: 'date', nullable: true })
  lastPlayed: Date;

  @Column({ default: 0 })
  timesPlayed: number;
}

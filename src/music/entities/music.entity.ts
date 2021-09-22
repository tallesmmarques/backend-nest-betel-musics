import { MinistryInfo } from 'src/ministry-info/entities/ministry-info.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  author: string;

  @Column({ length: 50 })
  gender: string;

  @OneToMany(() => MinistryInfo, (ministryInfo) => ministryInfo.music, {
    cascade: true,
    eager: true,
  })
  ministriesInfo: MinistryInfo[];

  @Column({ type: 'text', nullable: true })
  linkCifra: string;

  @Column({ type: 'text', nullable: true })
  linkYoutube: string;
}

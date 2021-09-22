import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { MusicModule } from './music/music.module';
import { MinistryInfoModule } from './ministry-info/ministry-info.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MusicModule,
    MinistryInfoModule,
    EventModule,
  ],
})
export class AppModule {}

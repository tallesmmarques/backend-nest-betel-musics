import { Module } from '@nestjs/common';
import { MinistryService } from './ministry.service';
import { MinistryController } from './ministry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ministry } from './entities/ministry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ministry])],
  controllers: [MinistryController],
  providers: [MinistryService],
})
export class MinistryModule {}

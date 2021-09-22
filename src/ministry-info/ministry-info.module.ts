import { Module } from '@nestjs/common';
import { MinistryInfoService } from './ministry-info.service';
import { MinistryInfoController } from './ministry-info.controller';

@Module({
  controllers: [MinistryInfoController],
  providers: [MinistryInfoService]
})
export class MinistryInfoModule {}

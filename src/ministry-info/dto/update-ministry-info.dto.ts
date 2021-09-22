import { PartialType } from '@nestjs/mapped-types';
import { CreateMinistryInfoDto } from './create-ministry-info.dto';

export class UpdateMinistryInfoDto extends PartialType(CreateMinistryInfoDto) {}

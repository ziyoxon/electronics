import { PartialType } from '@nestjs/swagger';
import { CreateBackedDetailDto } from './create-backed_detail.dto';

export class UpdateBackedDetailDto extends PartialType(CreateBackedDetailDto) {}

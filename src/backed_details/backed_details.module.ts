import { Module } from '@nestjs/common';
import { BackedDetailsService } from './backed_details.service';
import { BackedDetailsController } from './backed_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BackedDetail } from './model/backed_model.entity';

@Module({
  imports:[SequelizeModule.forFeature([BackedDetail])],
  controllers: [BackedDetailsController],
  providers: [BackedDetailsService],
})
export class BackedDetailsModule {}

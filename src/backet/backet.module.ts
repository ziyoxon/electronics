import { Module } from '@nestjs/common';
import { BacketService } from './backet.service';
import { BacketController } from './backet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Backet } from './models/backet.model';

@Module({
  imports:[SequelizeModule.forFeature([Backet])],
  controllers: [BacketController],
  providers: [BacketService],
})
export class BacketModule {}

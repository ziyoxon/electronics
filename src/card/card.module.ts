import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardService } from './card.service';
import { Card } from './model/card.model';

@Module({
  imports:[SequelizeModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}

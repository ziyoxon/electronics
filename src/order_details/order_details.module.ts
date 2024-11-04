import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderDetail } from './models/order_detail.model';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports:[SequelizeModule.forFeature([OrderDetail]),
OrdersModule],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}

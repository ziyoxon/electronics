import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Order } from "../../orders/models/order.model";

interface IOrderDetailAttr {
  description: string;
  quantity: number;
  total_price: number;
}

@Table({ tableName: "order_detail" })
export class OrderDetail extends Model<OrderDetail, IOrderDetailAttr> {
  @ApiProperty({
    example: 1,
    description: "Buyurtma detallari uchun noyob ID (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Buyurtma tavsifi",
    description: "Buyurtma detallari tavsifi",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 5,
    description: "Mahsulotning buyurtma miqdori",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ApiProperty({
    example: 50000,
    description: "Jami narx (quantity * narx)",
  })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total_price: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;
}

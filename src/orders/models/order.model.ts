import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Backet } from "../../backet/models/backet.model";
import { Delivery } from "../../delivery/model/delivery.model";
import { Payment } from "../../payment/models/payment.models";

interface IOrderAttr {
  price: number;
  delivery_type: string;
  order_given_date: string;
}

@Table({ tableName: "order" })
export class Order extends Model<Order, IOrderAttr> {
  @ApiProperty({
    example: 1,
    description: "Buyurtmaning noyob IDsi (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "2",
    description: "Buyurtma miqdori",
  })
  @ApiProperty({
    example: "100000",
    description: "Buyurtma narxi",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: "Express",
    description: "Yetkazib berish turi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  delivery_type: string;

  @ApiProperty({
    example: "2024-11-03",
    description: "Buyurtma berilgan sana",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  order_given_date: string;

  @ApiProperty({
    example: "2024-11-03",
    description: "Buyurtma yaratilgan sana",
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: Date;

  @ApiProperty({
    example: "2024-11-03",
    description: "Buyurtma so'ngi yangilangan sana",
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;

  @ForeignKey(() => Backet)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  backet_id: number;

  @BelongsTo(() => Backet)
  backet: Backet;

  @HasMany(() => Delivery)
  backetDetail: Delivery[];

  @HasMany(() => Payment)
  payment: Payment[];
}

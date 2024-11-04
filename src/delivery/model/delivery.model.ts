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

interface IDeliveryAttr {
  address: string;
  phone_number: string;
  delivery_date: string;
  delivery_time: string;
  delivery_status: string;
}

@Table({ tableName: "delivery" })
export class Delivery extends Model<Delivery, IDeliveryAttr> {
  @ApiProperty({
    example: 1,
    description: "Yetkazib berishning noyob IDsi (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "123 Main St, Tashkent",
    description: "Yetkazib berish manzili",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Yetkazib berish uchun telefon raqami",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({
    example: "2024-11-01",
    description: "Yetkazib berish sanasi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  delivery_date: string;

  @ApiProperty({
    example: "14:00",
    description: "Yetkazib berish vaqti",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  delivery_time: string;

  @ApiProperty({
    example: "Pending",
    description: "Yetkazib berish holati",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  delivery_status: string;

  

  @ForeignKey(() => Order) 
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;
}

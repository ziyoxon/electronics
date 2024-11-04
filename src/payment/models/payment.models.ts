import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "../../orders/models/order.model";
import { Backet } from "../../backet/models/backet.model";
import { Card } from "../../card/model/card.model";

interface IPaymentAttr {
  is_paid: boolean;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentAttr> {
  @ApiProperty({
    example: 1,
    description: "To'lovning noyob IDsi (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: true,
    description: "To'lov amalga oshirilganmi",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_paid: boolean;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Card)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  card_id: number;

  @BelongsTo(() => Card)
  card: Card;
}

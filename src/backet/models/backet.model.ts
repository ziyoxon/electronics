import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, HasMany, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "../../product/model/product.entity"; // Agar sizda mahsulotlar bo'lsa, ularga bog'lanish
import { User } from "../../user/models/user.model";
import { Status } from "../../status/models/status.model";
import { BackedDetail } from "../../backed_details/model/backed_model.entity";
import { Order } from "../../orders/models/order.model";

interface IBacketAttr {
  total_price: number;
}

@Table({ tableName: "backets" })
export class Backet extends Model<Backet, IBacketAttr> {
  @ApiProperty({
    example: 1,
    description: "Savatchaning noyob IDsi (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 100.0,
    description: "Savatchadagi umumiy narx",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_price: number;

  @ApiProperty({
    example: "2024-11-01T12:00:00Z",
    description: "Savatcha yaratilgan sanasi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  // @ForeignKey(() => Status)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: true,
  // })
  // status_id: number;

  // @BelongsTo(() => Status)
  // status: Status;

  @HasMany(() => BackedDetail)
  backetDetail: BackedDetail[];

  @HasMany(() => Order)
  order: Order[];
}

import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  ForeignKey,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { Product } from "../../product/model/product.entity";
import { Discount } from "../../discount/models/discount.model";


@Table({ tableName: "user_discount" })
export class UserDiscount extends Model<UserDiscount> {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discountId: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Discount)
  discount: Discount;
}

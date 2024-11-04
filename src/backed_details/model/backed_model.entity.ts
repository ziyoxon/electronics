import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Product } from "../../product/model/product.entity"; // Mahsulotlar bilan bog'lanish kerak bo'lsa
import { Backet } from "../../backet/models/backet.model"; // Agar savatcha bilan bog'lanish kerak bo'lsa

// DTO interfeysi
interface IBacketDetailAttr {
  quantity: number;
  description: string;
}

@Table({ tableName: "backet_details" })
export class BackedDetail extends Model<BackedDetail, IBacketDetailAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Backet)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  backetId: number;

  @BelongsTo(() => Backet)
  backet: Backet;

  
}

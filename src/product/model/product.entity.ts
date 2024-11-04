import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { BackedDetail } from "../../backed_details/model/backed_model.entity";
import { Brand } from "../../brand/models/brand.model";
import { UserDiscount } from "../../user_discount/models/user_discount.models";

interface IProductAttr {
  brand: string; 
  seria: string; 
  color: string; 
  price: number;
  discount: number;
  info: string; 
}

@Table({ tableName: "product" })
export class Product extends Model<Product, IProductAttr> {
  @ApiProperty({
    example: 1,
    description: "Mahsulotning noyob IDsi (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "BrandName",
    description: "Mahsulot brendi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand: string;

  @ApiProperty({
    example: "SeriaName",
    description: "Mahsulot seriyasi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  seria: string;

  @ApiProperty({
    example: "Qizil",
    description: "Mahsulot rangi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @ApiProperty({
    example: 100,
    description: "Mahsulot narxi",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: 10,
    description: "Mahsulot uchun chegirma",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  discount: number;

  @ApiProperty({
    example: "Bu namunali mahsulot.",
    description: "Mahsulot haqida batafsil ma'lumot",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  info: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @HasMany(() => BackedDetail)
  backedDetail: BackedDetail[];

  @HasMany(() => UserDiscount)
  userDiscount: UserDiscount[];

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  brand_id: number;

  @BelongsTo(() => Brand)
  brands: Brand;
}

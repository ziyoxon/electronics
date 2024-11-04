import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  HasMany
} from "sequelize-typescript";
import { Categoria } from "../../categoria/model/categoria.model";
import { Product } from "../../product/model/product.entity";

interface IBrandAttr {
  name: string;
  description: string;
  logo_url: string;
}

@Table({ tableName: "brand" })
export class Brand extends Model<Brand, IBrandAttr> {
  @ApiProperty({
    example: 1,
    description: "Brendning noyob IDsi (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Nike",
    description: "Brend nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: "Sport brendi haqida ma'lumot",
    description: "Brendning tavsifi",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: "logo.png",
    description: "Brend logotipi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo_url: string;

  @ApiProperty({
    example: "2022-01-01",
    description: "Brendning tugash sanasi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: Date;

  @ApiProperty({
    example: "2022-01-01",
    description: "Brendning so'ngi tugash sanasi",
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;

  @ForeignKey(() => Categoria)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  categoria_id: number;

  @BelongsTo(() => Categoria)
  status: Categoria;

  @HasMany(() => Product)
  product: Product[];
}

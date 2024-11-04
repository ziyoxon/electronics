import { ApiProperty } from "@nestjs/swagger";
import { HasMany, Column, DataType, Model, Table, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Brand } from "../../brand/models/brand.model";

interface ICategoriaAttr {
  nome: string; 
  image: string;
}

@Table({ tableName: "categorias" })
export class Categoria extends Model<Categoria, ICategoriaAttr> {
  @ApiProperty({
    example: 1,
    description: "Kategoriyaning noyob IDsi (autoIncrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Elektronika",
    description: "Kategoriya nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: "image.png",
    description: "Kategoriya rasmi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @HasMany(() => Brand)
  backets: Brand[];
}

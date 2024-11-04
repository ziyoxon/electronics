import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
interface IDiscount {
  code: number;
  present: string;
  from_date: number;
  to_date: number;
}

@Table({ tableName: "discount" })
export class Discount extends Model<Discount, IDiscount> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  code: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  present: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  from_date: number;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  to_date: number;
}

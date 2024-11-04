import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Backet } from "../../backet/models/backet.model";
interface IStatusAttr {
  quantity: number;
  description: string;
}

@Table({ tableName: "status" })
export class Status extends Model<Status, IStatusAttr> {
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
  quantity: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  // @HasMany(() => Backet)
  // backets: Backet[];
}

import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Backet } from "../../backet/models/backet.model";
import { Card } from "../../card/model/card.model";

interface IUserAttr {
  full_name: string;
  login: string;
  email: string;
  hashed_password: string;
  is_active: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: "user" })
export class User extends Model<User, IUserAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @HasOne(() => Backet)
  backets: Backet[];

  @HasMany(() => Card)
  card: Card[];
}

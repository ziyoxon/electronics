import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "otp" })
export class Otp extends Model<Otp> {
  @Column({
    type: DataType.UUID, 
    defaultValue: DataType.UUIDV4, 
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  otp: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.DATE,
  })
  expiration_time: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified: boolean;
}

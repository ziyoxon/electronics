// card.models.ts
import { Column, Model, Table,ForeignKey, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Payment } from "../../payment/models/payment.models";

export interface ICardAttr {
  card_number: string;
  given_date: string;
  expiration_date: string; 
}

@Table({ tableName: "card" })
export class Card extends Model<Card, ICardAttr> {
  @Column({
    allowNull: false,
    type: "varchar",
  })
  card_number: string;

  @Column({
    allowNull: false,
    type: "date",
  })
  given_date: string;

  @Column({
    allowNull: false,
    type: "date",
  })
  expiration_date: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Payment)
  payment: Payment[];
}

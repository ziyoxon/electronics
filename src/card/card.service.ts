import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Card } from "./model/card.model";

@Injectable()
export class CardService {
  constructor(@InjectModel(Card) private cardModel: typeof Card) {}

  async create(createCardDto: CreateCardDto) {
    const card = await this.cardModel.create(createCardDto);
    return card;
  }

  async findAll() {
    return await this.cardModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const card = await this.cardModel.findByPk(id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const [updated] = await this.cardModel.update(updateCardDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.cardModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return { message: `Card with ID ${id} has been removed` };
  }
}
